import { Global, css } from "@emotion/react";
import { PROFILE_SCREEN_MOTION_MS, PROFILE_SCREEN_ENTER_EASING } from "../../styles/motion";

export function ProfileRouteMotionStyles() {
  return <Global styles={css`
    /* viewport 스냅샷을 앱 프레임 안에서만 움직인다. 긴 페이지도 세로로 압축하지 않는다. */
    html[data-profile-slide]::view-transition-group(root) {
      animation:none;
      overflow:hidden;
      background:#F9F8FF;
      clip-path:inset(0 max(0px, calc((100vw - var(--app-content-width)) / 2)));
    }
    html[data-profile-slide]::view-transition-old(root),
    html[data-profile-slide]::view-transition-new(root) {
      mix-blend-mode:normal;
      opacity:1;
      animation-duration:${PROFILE_SCREEN_MOTION_MS}ms;
      animation-timing-function:${PROFILE_SCREEN_ENTER_EASING};
      animation-fill-mode:both;
    }
    html[data-profile-slide="forward"]::view-transition-old(root) { animation-name:giut-old-forward; }
    html[data-profile-slide="forward"]::view-transition-new(root) { animation-name:giut-new-forward; }
    html[data-profile-slide="back"]::view-transition-old(root) { animation-name:giut-old-back; }
    html[data-profile-slide="back"]::view-transition-new(root) { animation-name:giut-new-back; }
    html[data-profile-slide]::view-transition-new(root) { z-index:1; }
    @keyframes giut-old-forward { from { transform:translateX(0); } to { transform:translateX(calc(-1 * min(100vw, var(--app-content-width)))); } }
    @keyframes giut-new-forward { from { transform:translateX(min(100vw, var(--app-content-width))); } to { transform:translateX(0); } }
    @keyframes giut-old-back { from { transform:translateX(0); } to { transform:translateX(min(100vw, var(--app-content-width))); } }
    @keyframes giut-new-back { from { transform:translateX(calc(-1 * min(100vw, var(--app-content-width)))); } to { transform:translateX(0); } }

    /* Native API가 없는 기기는 입장 모션으로 대체. transform containing block을
       만들지 않아 기존 fixed 하단 메뉴/시트가 긴 본문 밑으로 밀리지 않는다. */
    [data-profile-route-frame] { position:relative; min-width:0; }
    html[data-profile-slide] #root { overflow-x:clip; }
    [data-profile-fallback] { animation-duration:${PROFILE_SCREEN_MOTION_MS}ms; animation-timing-function:${PROFILE_SCREEN_ENTER_EASING}; animation-fill-mode:both; }
    [data-profile-fallback="forward"] { animation-name:giut-fallback-forward; }
    [data-profile-fallback="back"] { animation-name:giut-fallback-back; }
    @keyframes giut-fallback-forward { from { left:100%; } to { left:0; } }
    @keyframes giut-fallback-back { from { left:-100%; } to { left:0; } }
    @media(prefers-reduced-motion:reduce) {
      ::view-transition-group(root),
      ::view-transition-old(root),
      ::view-transition-new(root),
      [data-profile-fallback] { animation:none !important; }
    }
  `} />;
}
