export type ProfileSlideDirection = "forward" | "back";

export function profileSlideDirection(from: string, to: string): ProfileSlideDirection | null {
  for (const base of ["/giut-hub", "/giut-hub-preview"]) {
    const isDetail = (path: string) => new RegExp(`^${base}/[1-9]\\d*/?$`).test(path);
    const isList = (path: string) => path === base || path === `${base}/`;
    if (isList(from) && isDetail(to)) return "forward";
    if (isDetail(from) && isList(to)) return "back";
  }
  return null;
}

export function supportsProfileViewTransition(): boolean {
  return typeof document.startViewTransition === "function"
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function profileScrollKey(location: { pathname: string; search: string; key: string }): string {
  return location.key;
}
