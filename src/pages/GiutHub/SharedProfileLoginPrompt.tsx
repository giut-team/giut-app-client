import { useEffect, useId, useRef } from "react";
import styled from "@emotion/styled";
import { Button } from "../../components/Button";
import { Icon } from "../../components/icons";
import { tokens } from "../../design-system/tokens.generated";

const Dialog = styled.dialog`
  width: min(360px, calc(100% - 40px), calc(var(--app-content-width) - 40px));
  margin: auto;
  padding: 28px 24px;
  border: 0;
  border-radius: 24px;
  background: ${tokens.color.neutral[50]};
  color: ${tokens.color.neutral[900]};
  text-align: center;
  font: inherit;
  word-break: keep-all;
  overflow-wrap: anywhere;
  &[open] { display: flex; flex-direction: column; align-items: center; gap: 20px; }
  &::backdrop { background: rgb(16 21 34 / 40%); }
`;
const IconBox = styled.div`
  display: flex; align-items: center; justify-content: center;
  width: 52px; height: 52px; border-radius: 16px;
  background: ${tokens.color.primary[100]}; color: #1c4ea3;
`;
const Copy = styled.div`
  display: flex; flex-direction: column; gap: 8px;
  h2 { margin: 0; font-size: 18px; font-weight: 800; line-height: 1.5; }
  p { margin: 0; font-size: 14px; line-height: 1.6; color: ${tokens.color.neutral[700]}; }
`;
const Actions = styled.div`
  display: flex; flex-direction: column; gap: 8px; width: 100%;
  > button { min-height: 44px; font-size: 14px; }
  > button:first-of-type { background-color: #1c4ea3; }
`;

export function SharedProfileLoginPrompt({ open, onClose, onLogin }: {
  open: boolean; onClose: () => void; onLogin: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  if (!open) return null;
  return (
    <Dialog ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}
      onCancel={event => { event.preventDefault(); onClose(); }}>
      <IconBox aria-hidden="true"><Icon name="lock" size={28} /></IconBox>
      <Copy>
        <h2 id={titleId}>로그인하고 함께해 보세요</h2>
        <p id={descriptionId}>로그인하면 메시지를 보내고 관심 프로필로 저장할 수 있어요.</p>
      </Copy>
      <Actions>
        <Button onClick={onLogin} autoFocus>로그인하기</Button>
        <Button onClick={onClose} tone="secondary">프로필만 보기</Button>
      </Actions>
    </Dialog>
  );
}
