import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { getSharedProfile, getSharedProfileTarget, getSharedProfileErrorMessage } from "../../api/profileShares";
import { PageHeader } from "../../components/PageHeader";
import { Button } from "../../components/Button";
import { Icon } from "../../components/icons";
import { tokens } from "../../design-system/tokens.generated";
import { S } from "./GiutHubProfilePage.styles";
import { getProfileHeadingStatusColor } from "./profileStatus";
import { useAuth } from "../../contexts/AuthContext";
import { SharedProfileLoginPrompt } from "./SharedProfileLoginPrompt";
import { saveSharedProfileReturn } from "../Login/loginReturn";

const ErrorArea = styled.div`
  display: flex;
  padding: 24px 22px;
`;
const ErrorState = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 32px 20px;
  border-radius: 20px;
  background: ${tokens.color.neutral[50]};
  text-align: center;
  word-break: keep-all;
  overflow-wrap: anywhere;
`;
const ErrorIcon = styled(S.EmptyIcon)`
  width: 52px;
  height: 52px;
  border-radius: 16px;
`;
const RetryButton = styled(Button)`
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  background-color: #1c4ea3;
  font-size: 14px;

  &:hover:not(:disabled) {
    background-color: #1c4ea3;
  }
`;

export function SharedProfilePage() {
  const navigate = useNavigate();
  const { token = "" } = useParams();
  const { isAuthenticated, isLoading: isAuthLoading, profile: currentUser } = useAuth();
  const [dismissedLoginToken, setDismissedLoginToken] = useState("");
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
  const target = useQuery({
    queryKey: ["shared-profile-target", token, currentUser?.userId],
    queryFn: ({ signal }) => getSharedProfileTarget(token, signal),
    enabled: isAuthenticated && !isAuthLoading && !!profile && !isError,
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });
  const targetStatus = axios.isAxiosError(target.error) ? target.error.response?.status : undefined;
  const needsLogin = !isAuthenticated || targetStatus === 401;
  const login = () => {
    saveSharedProfileReturn(token);
    navigate("/login");
  };

  if (isAuthenticated && !isAuthLoading && !isError && !target.isError && !target.isFetching
    && Number.isSafeInteger(target.data?.userId) && target.data!.userId > 0) {
    return <Navigate replace to={`/giut-hub/${target.data!.userId}`} />;
  }

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate("/home")} title="공유 프로필" />
        {!token || isError ? (
          <ErrorArea>
            <ErrorState role="alert">
              <ErrorIcon aria-hidden="true">
                <Icon name="warning" size={28} weight="regular" />
              </ErrorIcon>
              <S.EmptyCopy>
                <S.EmptyTitle>{token ? "프로필을 불러오지 못했어요" : "공유 링크를 확인해 주세요"}</S.EmptyTitle>
                <S.EmptyDescription>
                  {token ? getSharedProfileErrorMessage(error) : "전달받은 링크가 올바른지 다시 확인해 주세요."}
                </S.EmptyDescription>
              </S.EmptyCopy>
              {token && (
                <RetryButton disabled={isFetching} onClick={() => void refetch()} type="button">
                  {isFetching ? "불러오는 중…" : "다시 불러오기"}
                </RetryButton>
              )}
            </ErrorState>
          </ErrorArea>
        ) : isPending ? (
          <S.EmptyState role="status">공유 프로필을 불러오고 있어요.</S.EmptyState>
        ) : profile ? (
          <>
            <S.ProfileSection>
              <S.Avatar $tone="blue">
                {profile.profileImageUrl ? <img alt={`${profile.nickname} 프로필`} referrerPolicy="no-referrer" src={profile.profileImageUrl} /> : profile.nickname.slice(0, 1)}
              </S.Avatar>
              <S.ProfileInfo>
                <S.ProfileHeading>
                  <S.NameRow>
                    <S.Name>{profile.nickname}{profile.universityVerified && <Icon name="check" size={23} weight="bold" />}</S.Name>
                    <S.Status $color={getProfileHeadingStatusColor(profile.activityStatus)}>{profile.activityStatusName}</S.Status>
                  </S.NameRow>
                  <S.ProfileDetails>
                    <S.DetailRow><span>학과/학년</span><strong>{profile.departmentName} / {profile.grade}학년</strong></S.DetailRow>
                    <S.DetailRow><span>분야/역할</span><strong>{profile.primaryRoles.map(({ name }) => name).join(" / ") || "미등록"}</strong></S.DetailRow>
                  </S.ProfileDetails>
                </S.ProfileHeading>
              </S.ProfileInfo>
            </S.ProfileSection>
            <S.IntroductionSection>
              <S.FieldLabel>자기소개</S.FieldLabel>
              <S.Introduction>{profile.bio || "아직 자기소개가 없어요."}</S.Introduction>
            </S.IntroductionSection>
            <S.SkillList aria-label="보유 기술">
              {(profile.skills ?? []).filter(({ type }) => type === "SKILL").map((skill, index) => <S.Skill $index={index} key={skill.id}>{skill.name}</S.Skill>)}
            </S.SkillList>
            {isAuthenticated && !isAuthLoading && !needsLogin && (
              <ErrorArea>
                {target.isError ? (
                  <ErrorState role="alert">
                    <S.EmptyCopy>
                      <S.EmptyTitle>{targetStatus === 403 ? "인증 상태를 확인해 주세요" : "상세 프로필을 열지 못했어요"}</S.EmptyTitle>
                      <S.EmptyDescription>{targetStatus === 403
                        ? "학교 인증 또는 계정 이용 권한을 확인해 주세요."
                        : "공유 링크나 프로필 공개 상태가 변경되었을 수 있어요."}</S.EmptyDescription>
                    </S.EmptyCopy>
                    <RetryButton disabled={target.isFetching} onClick={() => {
                      if (targetStatus === 403) navigate("/student-verification");
                      else void target.refetch();
                    }} type="button">{targetStatus === 403 ? "인증 상태 확인" : "다시 불러오기"}</RetryButton>
                  </ErrorState>
                ) : <S.EmptyDescription role="status">상세 프로필로 연결하고 있어요.</S.EmptyDescription>}
              </ErrorArea>
            )}
          </>
        ) : null}
      </S.Content>
      <SharedProfileLoginPrompt
        open={!isAuthLoading && !!profile && !isError && needsLogin && dismissedLoginToken !== token}
        onClose={() => setDismissedLoginToken(token)}
        onLogin={login}
      />
    </S.Page>
  );
}
