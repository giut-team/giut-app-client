import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { getSharedProfile, getSharedProfileErrorMessage } from "../../api/profileShares";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/Button";
import { Icon } from "../../components/icons";
import { S } from "./GiutHubProfilePage.styles";

const DetailRow = styled(S.DetailRow)`
  strong { white-space: normal; overflow-wrap: anywhere; }
`;
const ErrorState = styled(S.EmptyState)`
  display: grid;
  gap: 16px;
  justify-items: center;
  p { margin: 0; }
`;

export function SharedProfilePage() {
  const navigate = useNavigate();
  const { token = "" } = useParams();
  const { data: profile, isPending, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["shared-profile", token],
    queryFn: ({ signal }) => getSharedProfile(token, signal),
    enabled: !!token,
    retry: false,
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: "always",
    refetchInterval: 60_000,
  });

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate("/home")} title="공유 프로필" />
        {!token || isError ? (
          <ErrorState role="alert">
            <p>{!token ? "공유 링크를 확인해 주세요." : getSharedProfileErrorMessage(error)}</p>
            <Button disabled={isFetching} onClick={() => void refetch()} type="button">{isFetching ? "불러오는 중…" : "다시 불러오기"}</Button>
          </ErrorState>
        ) : isPending ? (
          <S.EmptyState role="status">공유 프로필을 불러오고 있어요.</S.EmptyState>
        ) : profile ? (
          <>
            <S.ProfileSection>
              <S.Avatar $tone="blue">
                {profile.profileImageUrl ? <img alt={`${profile.nickname} 프로필`} referrerPolicy="no-referrer" src={profile.profileImageUrl} /> : profile.nickname.slice(0, 1)}
              </S.Avatar>
              <S.ProfileInfo>
                <S.Name>{profile.nickname}{profile.universityVerified && <Icon name="check" size={23} weight="bold" />}</S.Name>
                <DetailRow><span>학과/학년</span><strong>{profile.departmentName} / {profile.grade}학년</strong></DetailRow>
                <DetailRow><span>분야/역할</span><strong>{profile.primaryRoles.map(({ name }) => name).join(" / ") || "미등록"}</strong></DetailRow>
                <S.Status>{profile.activityStatusName}</S.Status>
              </S.ProfileInfo>
            </S.ProfileSection>
            <S.IntroductionSection>
              <S.FieldLabel>자기소개</S.FieldLabel>
              <S.Introduction>{profile.bio || "아직 자기소개가 없어요."}</S.Introduction>
            </S.IntroductionSection>
            <S.SkillList aria-label="보유 기술">
              {(profile.skills ?? []).filter(({ type }) => type === "SKILL").map((skill, index) => <S.Skill $index={index} key={skill.id}>{skill.name}</S.Skill>)}
            </S.SkillList>
          </>
        ) : null}
      </S.Content>
    </S.Page>
  );
}
