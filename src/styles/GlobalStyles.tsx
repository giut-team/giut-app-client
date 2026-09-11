import { Global, css } from "@emotion/react";
import "@sun-typeface/suit/fonts/variable/woff2/SUIT-Variable.css";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
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
          min-height: 100svh;
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
