import { useEffect, useState, type ReactNode } from "react";
import { S, type OverlayPlacement } from "./OverlayShell.styles";

type OverlayShellProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  minHeight?: string;
  placement?: OverlayPlacement;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

export function OverlayShell({
  open,
  onClose,
  children,
  minHeight,
  placement = "bottom",
  ariaLabel = "오버레이",
  ariaLabelledBy,
}: OverlayShellProps) {
  const [isRendered, setIsRendered] = useState(open);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (open) {
        setIsRendered(true);
        setIsClosing(false);
      } else if (isRendered) {
        setIsClosing(true);
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [isRendered, open]);

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
        $minHeight={minHeight}
        $placement={placement}
        aria-label={ariaLabelledBy ? undefined : ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-modal="true"
        data-state={isClosing ? "closing" : "opened"}
        onAnimationEnd={(event) => {
          if (event.target !== event.currentTarget || !isClosing) return;
          setIsRendered(false);
          setIsClosing(false);
        }}
        role="dialog"
      >
        {children}
      </S.Wrapper>
    </S.Layer>
  );
}
