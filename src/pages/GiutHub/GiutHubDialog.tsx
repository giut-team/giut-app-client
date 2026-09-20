import { useId, type ReactNode } from "react";
import { OverlayShell } from "../../components/OverlayShell/OverlayShell";
import { S } from "./GiutHubDialog.styles";

type GiutHubDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  icon?: ReactNode;
  tone?: "default" | "danger";
  children: ReactNode;
};

/** 기웃허브의 공유·신고·차단처럼 상세한 내용을 담는 중앙 다이얼로그입니다. */
export function GiutHubDialog({
  open,
  onClose,
  title,
  description,
  icon,
  tone = "default",
  children,
}: GiutHubDialogProps) {
  const titleId = useId();

  return (
    <OverlayShell ariaLabelledBy={titleId} onClose={onClose} open={open} placement="center">
      <S.Content>
        {icon && <S.Icon $tone={tone}>{icon}</S.Icon>}
        <S.Title id={titleId}>{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
        {children}
      </S.Content>
    </OverlayShell>
  );
}
