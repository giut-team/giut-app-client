import { S } from "./Toast.styles";

type ToastProps = {
  message: string;
  open: boolean;
};

export function Toast({ message, open }: ToastProps) {
  if (!open) return null;

  return <S.Toast role="status">{message}</S.Toast>;
}
