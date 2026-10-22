import axios from "axios";
import { Icon } from "../../components/icons";
import { S } from "./GiutHubPage.styles";

type GiutHubLoadErrorProps = {
  error: unknown;
  isRetrying: boolean;
  onRetry: () => void;
  onLogin: () => void;
  onCheckProfile: () => void;
};

export function GiutHubLoadError({ error, isRetrying, onRetry, onLogin, onCheckProfile }: GiutHubLoadErrorProps) {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  const needsLogin = status === 401;
  const needsPermission = status === 403;
  const connectionFailed = axios.isAxiosError(error) && !error.response;
  const title = needsLogin ? "로그인이 필요해요"
    : needsPermission ? "이용 권한을 확인해 주세요"
    : connectionFailed ? "연결을 확인해 주세요"
    : "팀원 목록을 불러오지 못했어요";
  const description = needsLogin ? "로그인 후 함께할 팀원을 찾아볼 수 있어요."
    : needsPermission ? "현재 계정의 인증 또는 이용 권한을 확인해 주세요."
    : connectionFailed ? "팀원 목록에 연결하지 못했어요.\n인터넷 연결을 확인한 뒤 다시 시도해 주세요."
    : "잠시 목록을 불러오는 데 문제가 생겼어요.\n조금 뒤 다시 시도해 주세요.";
  const action = needsLogin ? onLogin : needsPermission ? onCheckProfile : onRetry;
  const actionLabel = needsLogin ? "로그인하기" : needsPermission ? "내 프로필 확인" : "다시 불러오기";

  return (
    <S.LoadError role="alert" aria-busy={isRetrying}>
      <S.LoadErrorIcon aria-hidden="true">
        <Icon name={needsLogin || needsPermission ? "lock" : "warning"} size={28} weight="regular" />
      </S.LoadErrorIcon>
      <S.LoadErrorCopy>
        <S.LoadErrorTitle>{title}</S.LoadErrorTitle>
        <S.LoadErrorDescription>{description}</S.LoadErrorDescription>
      </S.LoadErrorCopy>
      <S.LoadErrorButton disabled={isRetrying} onClick={action} type="button">
        {isRetrying ? "불러오는 중…" : actionLabel}
      </S.LoadErrorButton>
    </S.LoadError>
  );
}
