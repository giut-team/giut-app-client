import { useEffect, useState, type ReactNode } from "react";
import { S, type OverlayPlacement } from "./OverlayShell.styles";

type OverlayState = "opening" | "opened" | "closing";

type OverlayShellProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  minHeight?: string;
  placement?: OverlayPlacement;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  dragOffset?: number;
  isDragging?: boolean;
};

export function OverlayShell({
  open,
  onClose,
  children,
  minHeight,
  placement = "bottom",
  ariaLabel = "오버레이",
  ariaLabelledBy,
  dragOffset = 0,
  isDragging = false,
}: OverlayShellProps) {
  const [isRendered, setIsRendered] = useState(open);
  const [overlayState, setOverlayState] = useState<OverlayState>(
    open ? "opening" : "opened",
  );

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (open) {
        setIsRendered(true);
        setOverlayState("opening");
      } else {
        setOverlayState("closing");
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, open]);

  if (!isRendered) return null;

  return (
    <S.Layer $placement={placement}>
      <S.Backdrop aria-label="닫기" onClick={onClose} type="button" />
      <S.Wrapper
        $dragOffset={dragOffset}
        $isDragging={isDragging}
        $minHeight={minHeight}
        $placement={placement}
        aria-label={ariaLabelledBy ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-modal="true"
        data-state={overlayState}
        onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget) return;

          if (overlayState === "opening") {
            setOverlayState("opened");
            return;
          }

          if (overlayState === "closing") {
            setIsRendered(false);
          }
        }}
        role="dialog"
      >
        {children}
      </S.Wrapper>
    </S.Layer>
  );
}
