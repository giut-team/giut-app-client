import { Global, css } from "@emotion/react";
import "@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.css";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          --app-safe-bottom: max(16px, env(safe-area-inset-bottom, 0px));
          font-family:
            "SUIT Variable",
            "SUIT",
            Pretendard,
            "Apple SD Gothic Neo",
            "Noto Sans KR",
            system-ui,
            sans-serif;
          color: #172032;
          background: #f6f7fa;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
        }

        * {
          box-sizing: border-box;
        }

        #root {
          position: relative;
          min-height: 100svh;
          padding-bottom: var(--app-safe-bottom);
        }

        #root::after {
          position: fixed;
          z-index: 30;
          bottom: 5px;
          left: 50%;
          display: ${import.meta.env.DEV ? "block" : "none"};
          width: 134px;
          height: 5px;
          border-radius: 999px;
          background: #101522;
          content: "";
          pointer-events: none;
          transform: translateX(-50%);
        }

        body {
          min-width: 320px;
          margin: 0;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }
      `}
    />
  );
}
