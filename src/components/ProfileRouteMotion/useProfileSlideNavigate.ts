import { parsePath, useLocation, useNavigate, type NavigateOptions } from "react-router-dom";
import { profileSlideDirection, supportsProfileViewTransition } from "./profileMotionRouting";

export function useProfileSlideNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  return (to: string, options: NavigateOptions = {}) => navigate(to, {
    ...options,
    viewTransition: profileSlideDirection(location.pathname, parsePath(to).pathname ?? location.pathname) !== null
      && supportsProfileViewTransition(),
  });
}
