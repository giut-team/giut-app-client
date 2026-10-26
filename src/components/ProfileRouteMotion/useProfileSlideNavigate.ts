import { parsePath, useLocation, useNavigate, type NavigateOptions } from "react-router-dom";
import { getProfileSlideController } from "./profileSlideController";

export function useProfileSlideNavigate() {
  const navigate = useNavigate();
  const location = useLocation();
  return (to: string, options: NavigateOptions = {}) => getProfileSlideController().begin(
    location.pathname,
    parsePath(to).pathname ?? location.pathname,
    () => { void navigate(to, { ...options, viewTransition: false }); },
  );
}
