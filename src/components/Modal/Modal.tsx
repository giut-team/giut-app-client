import { LockKey } from "@phosphor-icons/react";
import { useId, type ReactNode } from "react";
import { OverlayShell } from "../OverlayShell/OverlayShell";
import { S } from "./Modal.styles";

type ModalAction = {
  label: string;
  onClick: () => void;
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  children?: ReactNode;
};

export function Modal({
  open,
  onClose,
  title,
  description,
  icon = <LockKey aria-hidden="true" size={22} weight="bold" />,
  primaryAction,
  secondaryAction,
  children,
}: ModalProps) {
  const titleId = useId();

  return (
    <OverlayShell
      ariaLabelledBy={titleId}
      onClose={onClose}
      open={open}
      placement="center"
    >
      <S.Content>
        <S.Icon>{icon}</S.Icon>
        <S.Title id={titleId}>{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
        {children}
        {(primaryAction || secondaryAction) && ( // 주버튼 또는 보조버튼이 존재할 때만 Actions 렌더링
          <S.Actions>
            {primaryAction && (
              <S.PrimaryButton onClick={primaryAction.onClick} type="button">
                {primaryAction.label}
              </S.PrimaryButton>
            )}
            {secondaryAction && (
              <S.SecondaryButton
                onClick={secondaryAction.onClick}
                type="button"
              >
                {secondaryAction.label}
              </S.SecondaryButton>
            )}
          </S.Actions>
        )}
      </S.Content>
    </OverlayShell>
  );
}
