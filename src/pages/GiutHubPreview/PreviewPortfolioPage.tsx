import { useEffect } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { MarkdownContent } from "../../components/MarkdownContent";
import { ImageWithFallback } from "../GiutHub/ImageWithFallback";
import { PREVIEW_PATH, skillNames } from "./profilePreview";
import { PreviewHeader } from "./PreviewProfileActions";
import { usePreviewProfile } from "./usePreviewProfile";
import { PreviewProfileLoadState } from "./PreviewProfileLoadState";
import { S } from "./ProfilePreview.styles";

export function PreviewPortfolioPage() {
  const { profileNumber, portfolioId } = useParams();
  const userId = Number(profileNumber);
  const itemId = Number(portfolioId);
  const query = usePreviewProfile(userId);
  const navigate = useNavigate();
  const location = useLocation();
  const onBack = () => navigate(`${PREVIEW_PATH}/${userId}`, { state: location.state });
  useEffect(() => { window.scrollTo(0, 0); }, [userId, itemId]);
  if (!Number.isSafeInteger(userId) || userId <= 0) return <Navigate replace to={PREVIEW_PATH} />;
  if (query.authLoading || !query.data || query.isError || !query.isAuthenticated) return <PreviewProfileLoadState query={query} onBack={onBack} />;
  const item = query.data.profile.portfolioItems?.find(portfolio => portfolio.id === itemId);
  return <S.Page>
    <PreviewHeader onBack={onBack} />
    <S.DetailMain $noDock>
      {item ? <>
        <S.Intro><S.Description>{query.data.nickname}님의 프로젝트</S.Description><S.Heading>{item.title}</S.Heading>{item.caption && <S.Description>{item.caption}</S.Description>}</S.Intro>
        <S.PortfolioImage><ImageWithFallback src={item.imageUrl} alt={`${item.title} 프로젝트 이미지`} /></S.PortfolioImage>
        <S.Facts>{[item.projectStartDate, item.projectEndDate].filter(Boolean).join(" – ")}</S.Facts>
        {!!item.roles?.length && <S.Skills>{item.roles.map(role => role.name).join(" · ")}</S.Skills>}
        {!!skillNames(item.skillTags).length && <S.Skills>{skillNames(item.skillTags).join(" · ")}</S.Skills>}
        {item.markdownContent && <S.Markdown><MarkdownContent content={item.markdownContent} /></S.Markdown>}
      </> : <S.Empty><strong>지금은 볼 수 없는 작업물이에요</strong><p>공개 설정이 바뀌었거나 삭제되었을 수 있어요.</p><S.Reset type="button" onClick={onBack}>프로필로 돌아가기</S.Reset></S.Empty>}
    </S.DetailMain>
  </S.Page>;
}
