import { ProfileRouteMotion } from "../../components/ProfileRouteMotion/ProfileRouteMotion";
import { Circle, Trophy } from "@phosphor-icons/react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { Icon } from "../../components/icons";
import { useProfileSlideNavigate } from "../../components/ProfileRouteMotion/useProfileSlideNavigate";
import { ImageWithFallback } from "../GiutHub/ImageWithFallback";
import { getProfileStatusColor } from "../GiutHub/profileStatus";
import { PreviewProfileActions } from "./PreviewProfileActions";
import { usePreviewProfile } from "./usePreviewProfile";
import { PreviewProfileLoadState } from "./PreviewProfileLoadState";
import { detailStatus, orderedPortfolios, PREVIEW_PATH, profileFacts, skillNames } from "./profilePreview";
import { S } from "./ProfilePreview.styles";

export function GiutHubPreviewProfilePage() {
  return <ProfileRouteMotion><GiutHubPreviewProfilePageContent /></ProfileRouteMotion>;
}

function GiutHubPreviewProfilePageContent() {
  const { profileNumber } = useParams();
  const userId = Number(profileNumber);
  const query = usePreviewProfile(userId);
  const slideNavigate = useProfileSlideNavigate();
  const location = useLocation();
  const previous = location.state?.returnTo;
  const returnTo = typeof previous === "string" && (previous === PREVIEW_PATH || previous.startsWith(`${PREVIEW_PATH}?`)) ? previous : PREVIEW_PATH;
  if (!Number.isSafeInteger(userId) || userId <= 0) return <Navigate replace to={PREVIEW_PATH} />;
  if (query.authLoading || !query.data || query.isError || !query.isAuthenticated) return <PreviewProfileLoadState query={query} onBack={() => { void slideNavigate(returnTo); }} />;
  const detail = query.data;
  const profile = detail.profile;
  const portfolios = orderedPortfolios(profile.portfolioItems ?? []);
  const skills = skillNames(profile.tags);

  return <S.Page>
    <PreviewProfileActions key={`${query.queryScope}:${query.data.profile.userId}`} detail={detail} onBack={() => { void slideNavigate(returnTo); }} />
    <S.DetailMain>
      <S.Biography>{profile.bio.trim() || "아직 소개를 준비하고 있어요."}</S.Biography>
      <S.Identity>
        <S.Avatar $large><ImageWithFallback src={profile.profileImageUrl} alt={`${detail.nickname} 프로필 사진`} /></S.Avatar>
        <S.IdentityCopy>
          <S.NameRow><S.Name>{detail.nickname}</S.Name><S.Status $color={getProfileStatusColor(detailStatus(profile.activityStatusName))}><Circle size={8} weight="fill" aria-hidden="true" />{profile.activityStatusName}</S.Status></S.NameRow>
          <S.Facts>{profileFacts(profile)}</S.Facts>
          {profile.roles?.length > 0 && <S.Facts>{profile.roles.map(role => role.name).join(" · ")}</S.Facts>}
          <S.Skills>{skills.join(" · ") || "스킬 소개 전"}</S.Skills>
        </S.IdentityCopy>
      </S.Identity>
      <S.Section aria-labelledby="preview-work-title">
        <S.SectionTitle id="preview-work-title">만들어 온 것</S.SectionTitle>
        {portfolios.length ? portfolios.map(item => <S.Portfolio key={item.id} to={`${PREVIEW_PATH}/${userId}/portfolio/${item.id}`} state={{ returnTo }}>
          <S.PortfolioImage><ImageWithFallback src={item.imageUrl} alt={`${item.title} 프로젝트 이미지`} /></S.PortfolioImage>
          <S.PortfolioCopy><h3>{item.title}</h3>{item.caption && <p>{item.caption}</p>}</S.PortfolioCopy>
        </S.Portfolio>) : <S.Empty><Icon name="folder" size={27} /><strong>아직 공개한 작업물이 없어요</strong><p>{detail.nickname}님의 프로젝트가 공개되면 이곳에서 볼 수 있어요.</p></S.Empty>}
      </S.Section>
      <S.Section aria-labelledby="preview-activity-title">
        <S.SectionTitle id="preview-activity-title">주요 활동</S.SectionTitle>
        {profile.activityHistories?.length ? <S.Activities>{profile.activityHistories.map(activity => <S.Activity key={activity.id}>
          {activity.category === "AWARD" ? <Trophy size={24} aria-hidden="true" /> : <Icon name="calendar" size={24} />}
          <S.PortfolioCopy><h3>{activity.title}</h3>{activity.organization && <p>{activity.organization}</p>}<p>{[activity.startMonth, activity.endMonth].filter(Boolean).join(" – ")}</p></S.PortfolioCopy>
        </S.Activity>)}</S.Activities> : <S.Empty><Icon name="calendar" size={27} /><strong>아직 등록된 활동이 없어요</strong><p>공모전과 대외활동 경험이 등록되면 확인할 수 있어요.</p></S.Empty>}
      </S.Section>
    </S.DetailMain>
  </S.Page>;
}
