import { useId, type ReactNode } from "react";
import { OverlayShell } from "../OverlayShell/OverlayShell";
import { S } from "./BottomSheet.styles";

export type BottomSheetOption<T extends string> = {
  value: T;
  label: string;
};

type BottomSheetProps = {
  open: boolean;
  title?: string;
  eyebrow?: string;
  showCloseButton?: boolean;
  minHeight?: string;
  onClose: () => void;
  children: ReactNode;
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

  return (
    <OverlayShell
      ariaLabel="바텀 시트"
      ariaLabelledBy={title ? titleId : undefined}
      minHeight={minHeight}
      onClose={onClose}
      open={open}
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
