import { useLayoutEffect, useRef } from "react";
import { Outlet, ScrollRestoration, useLocation, useViewTransitionState } from "react-router-dom";
import { PROFILE_SCREEN_MOTION_MS } from "../../styles/motion";
import { profileSlideDirection, profileScrollKey, supportsProfileViewTransition } from "./profileMotionRouting";
import { ProfileRouteMotionStyles } from "./ProfileRouteMotion.styles";

export function ProfileRouteMotion() {
  const location = useLocation();
  const isTransitioning = useViewTransitionState(location.pathname);
  const previousPath = useRef(location.pathname);
  const frame = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const direction = profileSlideDirection(previousPath.current, location.pathname);
    previousPath.current = location.pathname;
    if (!direction || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const element = frame.current;
    root.dataset.profileSlide = direction;
    const clear = () => {
      delete root.dataset.profileSlide;
      if (element) delete element.dataset.profileFallback;
    };
    // CSS animationend는 native snapshot이 제거되기 전에 발생한다.
    // Router가 ViewTransition.finished 뒤 상태를 바꿀 때까지 마지막 프레임을 유지한다.
    if (isTransitioning && supportsProfileViewTransition()) return clear;

    if (element) element.dataset.profileFallback = direction;
    const onEnd = (event: AnimationEvent) => {
      if (event.target === element && ["giut-fallback-forward", "giut-fallback-back"].includes(event.animationName)) clear();
    };
    document.addEventListener("animationend", onEnd);
    // fallback의 animationend가 누락돼도 임시 스타일을 남기지 않는다.
    const timer = window.setTimeout(clear, PROFILE_SCREEN_MOTION_MS * 2 + 120);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("animationend", onEnd);
      clear();
    };
  }, [location.key, location.pathname, isTransitioning]);

  return <>
    <ProfileRouteMotionStyles />
    <div data-profile-route-frame ref={frame}><Outlet /></div>
    <ScrollRestoration getKey={profileScrollKey} storageKey="giut-profile-scroll" />
  </>;
}
