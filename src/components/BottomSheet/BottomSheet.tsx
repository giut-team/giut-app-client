import { useEffect, useId, type ReactNode } from "react";
import { S } from "./BottomSheet.styles";

export type BottomSheetOption<T extends string> = {
  value: T;
  label: string;
};

type BottomSheetProps = {
  open: boolean;
  title?: string;
  eyebrow?: string;
  showCloseButton?: boolean; //닫기 버튼 표시 여부
  minHeight?: string;
  onClose: () => void;
  children: ReactNode; // 바텀시트에 들어갈 실제 내용
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

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // 바텀시트가 열리면 뒤쪽 스크롤을 막음

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <S.Layer>
      <S.Backdrop aria-label="닫기" onClick={onClose} type="button" />
      <S.Wrapper
        $minHeight={minHeight}
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        role="dialog"
      >
        <S.InnerPadding>
          <S.HandleWrapper>
            <S.Handle />
          </S.HandleWrapper>
          {(title || eyebrow || showCloseButton) && (
            <S.Header>
              <div>
                {eyebrow && <S.Eyebrow>{eyebrow}</S.Eyebrow>}
                {title && <S.Title id={titleId}>{title}</S.Title>}
              </div>
              {showCloseButton && (
                <S.CloseButton
                  aria-label="닫기"
                  onClick={onClose}
                  type="button"
                >
                  x
                </S.CloseButton>
              )}
            </S.Header>
          )}
          <S.Content>{children}</S.Content>
          {footer && <S.Footer>{footer}</S.Footer>}
        </S.InnerPadding>
      </S.Wrapper>
    </S.Layer>
  );
}

export function BottomSheetOptionList<T extends string>({
  // 정렬이나 필터처럼 여러 항목 중 하나를 고르는 UI 일때
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
