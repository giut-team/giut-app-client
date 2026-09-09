import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { OverlayShell } from "../OverlayShell/OverlayShell";
import { S } from "./BottomSheet.styles";

const DRAG_CLOSE_THRESHOLD = 120; // 바텀 시트를 120px 아래로 드래그하면 닫히도록 설정

export type BottomSheetOption<T extends string> = {
  value: T;
  label: string;
};

type BottomSheetProps = {
  open: boolean;
  title?: string;
  eyebrow?: string;
  showCloseButton?: boolean; // 닫기 버튼 표시 여부
  minHeight?: string;
  onClose: () => void;
  children: ReactNode; // 바텀 시트의 내용
  footer?: ReactNode;
};

type BottomSheetOptionListProps<T extends string> = {
  options: BottomSheetOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
};

export function BottomSheet({
  open,
  title,
  eyebrow,
  showCloseButton = false,
  minHeight,
  onClose,
  children,
  footer,
}: BottomSheetProps) {
  const titleId = useId();
  const dragStartY = useRef<number | null>(null); // 드래그를 시작한 시점의 y 좌표 저장
  const currentDragOffset = useRef(0); // 현재 얼마나 아래로 이동했는지 저장
  const isClosingByDrag = useRef(false); // 드래그로 닫히는 중인지 구분함
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      dragStartY.current = null;

      if (!open && isClosingByDrag.current) return;

      currentDragOffset.current = 0;
      setDragOffset(0);
      setIsDragging(false);

      if (open) isClosingByDrag.current = false;
    });

    return () => cancelAnimationFrame(frameId);
  }, [open]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    dragStartY.current = event.clientY;
    currentDragOffset.current = 0;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return;

    const nextOffset = Math.max(0, event.clientY - dragStartY.current); // 현재 포인터 위치에서 시작 위치를 빼서 이동 거리 계산
    // 바텀 시트가 위로 올라가지 않도록 하기 위해서 Math.max(0, ...)을 사용하여 음수 값이 되지 않도록 함
    currentDragOffset.current = nextOffset;
    setDragOffset(nextOffset);
  };

  // 그래그 중에 포인터가 캔슬되거나, 드래그가 끝났을 때 호출되는 함수
  const resetDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStartY.current = null;
    currentDragOffset.current = 0;
    isClosingByDrag.current = false;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const shouldClose = currentDragOffset.current >= DRAG_CLOSE_THRESHOLD;

    if (shouldClose) {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      dragStartY.current = null;
      isClosingByDrag.current = true;
      setIsDragging(false);
      onClose();
      return;
    }

    resetDrag(event); // 드래그가 끝났지만 닫히지 않은 경우, 드래그 상태를 초기화
  };

  return (
    <OverlayShell
      ariaLabel="바텀 시트"
      ariaLabelledBy={title ? titleId : undefined}
      minHeight={minHeight}
      onClose={onClose}
      open={open}
      dragOffset={dragOffset}
      isDragging={isDragging}
    >
      <S.InnerPadding>
        <S.HandleWrapper
          onPointerCancel={resetDrag}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <S.Handle />
        </S.HandleWrapper>
        {(title || eyebrow || showCloseButton) && (
          <S.Header>
            <div>
              {eyebrow && <S.Eyebrow>{eyebrow}</S.Eyebrow>}
              {title && <S.Title id={titleId}>{title}</S.Title>}
            </div>
            {showCloseButton && (
              <S.CloseButton aria-label="닫기" onClick={onClose} type="button">
                ×
              </S.CloseButton>
            )}
          </S.Header>
        )}
        <S.Content>{children}</S.Content>
        {footer && <S.Footer>{footer}</S.Footer>}
      </S.InnerPadding>
    </OverlayShell>
  );
}

export function BottomSheetOptionList<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = "선택 목록",
}: BottomSheetOptionListProps<T>) {
  return (
    <S.Options role="radiogroup" aria-label={ariaLabel}>
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <S.Option
            $first={index === 0}
            $selected={selected}
            aria-checked={selected}
            key={option.value}
            onClick={() => onChange(option.value)}
            role="radio"
            type="button"
          >
            <span>{option.label}</span>
            {selected && <S.Check aria-hidden="true">✓</S.Check>}
          </S.Option>
        );
      })}
    </S.Options>
  );
}
