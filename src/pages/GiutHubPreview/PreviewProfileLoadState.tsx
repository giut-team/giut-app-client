import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "../../components/icons";
import { PreviewHeader } from "./PreviewProfileActions";
import type { usePreviewProfile } from "./usePreviewProfile";
import { S } from "./ProfilePreview.styles";

export function PreviewProfileLoadState({ query, onBack }: { query: ReturnType<typeof usePreviewProfile>; onBack: () => void }) {
  const navigate = useNavigate();
  const status = axios.isAxiosError(query.error) ? query.error.response?.status : undefined;
  const loading = query.authLoading || (query.isAuthenticated && query.isPending);
  const needsLogin = !query.authLoading && (!query.isAuthenticated || status === 401);
  const needsPermission = status === 403;
  const missing = status === 404;
  return <S.Page>
    <PreviewHeader onBack={onBack} />
    <S.DetailMain><S.Empty role={loading ? "status" : "alert"} aria-busy={query.isFetching}>
      <Icon name={needsLogin || needsPermission ? "lock" : missing ? "user" : "warning"} size={30} />
      <strong>{loading ? "프로필을 불러오고 있어요" : needsLogin ? "로그인이 필요해요" : needsPermission ? "이용 권한을 확인해 주세요" : missing ? "지금은 볼 수 없는 프로필이에요" : "프로필에 연결하지 못했어요"}</strong>
      {!loading && <>
        <p>{needsLogin ? "로그인 후 소개와 작업물을 살펴볼 수 있어요." : needsPermission ? "학교 인증 또는 계정 이용 권한을 확인해 주세요." : missing ? "프로필이 비공개로 바뀌었거나 더 이상 제공되지 않을 수 있어요." : "연결 상태를 확인하고 다시 불러와 주세요."}</p>
        <S.Action $primary type="button" disabled={query.isFetching} onClick={() => {
          if (needsLogin) navigate("/login"); else if (needsPermission) navigate("/my-profile"); else if (missing) onBack(); else void query.refetch({ cancelRefetch: false });
        }}>{needsLogin ? "로그인하기" : needsPermission ? "내 프로필 확인" : missing ? "팀원 목록으로" : query.isFetching ? "불러오는 중…" : "다시 불러오기"}</S.Action>
      </>}
    </S.Empty></S.DetailMain>
  </S.Page>;
}
