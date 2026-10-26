import { PROFILE_SCREEN_MOTION_MS } from "../../styles/motion";
import { profileScrollKey, profileSlideDirection, type ProfileSlideDirection } from "./profileMotionRouting";
import { PROFILE_ROUTE_MOTION_CSS } from "./ProfileRouteMotion.styles";

type Screen = { pathname: string; search: string; key: string; element: HTMLElement };
type Slide = {
  target: string;
  direction: ProfileSlideDirection;
  native: boolean;
  cancelled: boolean;
  style: HTMLStyleElement;
  transition?: ViewTransition;
  commit?: () => void;
  timer?: number;
  detach?: () => void;
};

// BrowserRouter는 그대로 두고, 허브 화면이 마운트될 때까지 update callback을 기다린다.
// 이전/다음 React 화면을 동시에 복제하거나 Router의 history 함수를 교체하지 않는다.
export function createProfileSlideController(win: Window, doc: Document) {
  const positions = new Map<string, number>();
  let screen: Screen | null = null;
  let active: Slide | null = null;
  let replayingPop = false;
  let previousScrollRestoration: ScrollRestoration | undefined;
  const reduced = () => win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const remember = (value: Screen) => {
    const key = profileScrollKey(value);
    positions.delete(key);
    positions.set(key, win.scrollY);
    if (positions.size > 50) positions.delete(positions.keys().next().value!);
  };
  function clear(slide: Slide) {
    win.clearTimeout(slide.timer);
    slide.detach?.();
    slide.style.remove();
    if (active === slide) {
      delete doc.documentElement.dataset.profileSlide;
      active = null;
    }
  }
  function cancel() {
    if (!active) return;
    const slide = active;
    slide.cancelled = true;
    slide.commit?.();
    slide.transition?.skipTransition();
    clear(slide);
  }
  function begin(from: string, target: string, update: () => void) {
    const direction = profileSlideDirection(from, target);
    cancel();
    if (screen) remember(screen);
    if (!direction || reduced()) { update(); return; }
    const style = doc.createElement("style");
    style.textContent = PROFILE_ROUTE_MOTION_CSS;
    doc.head.appendChild(style);
    const slide: Slide = { target, direction, native: typeof doc.startViewTransition === "function", cancelled: false, style };
    active = slide;
    doc.documentElement.dataset.profileSlide = direction;
    if (!slide.native) {
      slide.timer = win.setTimeout(() => clear(slide), PROFILE_SCREEN_MOTION_MS * 2 + 120);
      update();
      return;
    }
    let updated = false;
    const commit = () => {
      if (slide.cancelled) return;
      updated = true;
      return new Promise<void>(resolve => {
        slide.commit = resolve;
        // guard/리다이렉트 등으로 목적 화면이 나타나지 않아도 화면을 잠그지 않는다.
        slide.timer = win.setTimeout(() => {
          slide.transition?.skipTransition();
          resolve();
        }, 1200);
        update();
      });
    };
    try {
      slide.transition = doc.startViewTransition(commit);
      void slide.transition.finished.then(() => clear(slide), () => clear(slide));
    } catch {
      clear(slide);
      if (!updated) update();
    }
  }
  function register(value: Screen) {
    if (previousScrollRestoration === undefined) {
      previousScrollRestoration = win.history.scrollRestoration;
      win.history.scrollRestoration = "manual";
    }
    screen = value;
    win.scrollTo(0, positions.get(profileScrollKey(value)) ?? 0);
    const slide = active;
    if (slide?.target === value.pathname) {
      if (!slide.native) {
        value.element.dataset.profileFallback = slide.direction;
        const onEnd = (event: AnimationEvent) => {
          if (event.target === value.element && event.animationName === `giut-fallback-${slide.direction}`) clear(slide);
        };
        value.element.addEventListener("animationend", onEnd);
        slide.detach = () => {
          value.element.removeEventListener("animationend", onEnd);
          delete value.element.dataset.profileFallback;
        };
      } else {
        win.clearTimeout(slide.timer);
        slide.commit?.();
      }
    }
    const onPop = (event: PopStateEvent) => {
      if (replayingPop || !profileSlideDirection(value.pathname, win.location.pathname)) return;
      if (reduced() || typeof doc.startViewTransition !== "function") {
        // 원래 popstate는 그대로 전달하고 새 화면 진입 효과만 준비한다.
        begin(value.pathname, win.location.pathname, () => {});
        return;
      }
      // 허브 왕복만 이전 화면 캡처 뒤 BrowserRouter에 같은 popstate를 한 번 전달한다.
      event.stopImmediatePropagation();
      begin(value.pathname, win.location.pathname, () => {
        replayingPop = true;
        try { win.dispatchEvent(new PopStateEvent("popstate", { state: event.state })); }
        finally { replayingPop = false; }
      });
    };
    win.addEventListener("popstate", onPop, true);
    return () => {
      win.removeEventListener("popstate", onPop, true);
      if (screen === value) {
        // 이동 시작 때 저장한 출발 위치를 DOM 교체 후의 scrollY로 덮어쓰지 않는다.
        if (!active || active.target === value.pathname) remember(value);
        screen = null;
      }
      // 같은 commit의 다음 허브가 등록될 기회를 준 후, 다른 화면 이탈이면 정리한다.
      queueMicrotask(() => {
        if (screen) return;
        cancel();
        if (previousScrollRestoration !== undefined) {
          win.history.scrollRestoration = previousScrollRestoration;
          previousScrollRestoration = undefined;
        }
      });
    };
  }
  return { begin, register };
}

let controller: ReturnType<typeof createProfileSlideController> | undefined;
export function getProfileSlideController() {
  return controller ??= createProfileSlideController(window, document);
}
