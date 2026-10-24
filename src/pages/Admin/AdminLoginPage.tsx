import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/adminAuth";
import { S } from "./AdminLoginPage.styles";

function getLoginErrorMessage(error: unknown) {
  if (error instanceof Error && error.message === "관리자 권한이 없는 계정입니다.") {
    return error.message;
  }

  if (axios.isAxiosError(error)) {
    if (error.response?.status === 400 || error.response?.status === 401) {
      return "이메일 또는 비밀번호를 확인해 주세요.";
    }
    if (error.response?.status === 403) {
      return "관리자 권한이 없는 계정입니다.";
    }
  }

  return "로그인하지 못했습니다. 잠시 후 다시 시도해 주세요.";
}

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: () => navigate("/admin/profile-reports", { replace: true }),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ email: email.trim(), password });
  };

  return (
    <S.Page data-admin-page>
      <S.Content>
        <S.Title>관리자 로그인</S.Title>
        <S.Card onSubmit={handleSubmit}>
          <S.Field>
            이메일
            <S.Input
              autoComplete="username"
              inputMode="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@service.com"
              required
              type="email"
              value={email}
            />
          </S.Field>
          <S.Field>
            비밀번호
            <S.Input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              required
              type="password"
              value={password}
            />
          </S.Field>
          {loginMutation.isError && (
            <S.Status $error role="alert">
              {getLoginErrorMessage(loginMutation.error)}
            </S.Status>
          )}
          {loginMutation.isSuccess && (
            <S.Status role="status">관리자 로그인이 완료되었습니다.</S.Status>
          )}
          <S.SubmitButton disabled={loginMutation.isPending} type="submit">
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </S.SubmitButton>
        </S.Card>
      </S.Content>
    </S.Page>
  );
}
