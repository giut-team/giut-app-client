import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { getProfileSlideController } from "./profileSlideController";

// 라우터 layout 대신 허브 페이지 자체에서만 사용한다.
export function ProfileRouteMotion({ children }: { children?: ReactNode }) {
  const { pathname, search, key } = useLocation();
  const frame = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!frame.current) return;
    return getProfileSlideController().register({ pathname, search, key, element: frame.current });
  }, [pathname, search, key]);
  return <div data-profile-route-frame ref={frame}>{children}</div>;
}
