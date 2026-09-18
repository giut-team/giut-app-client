import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { PageHeader } from "../../../components/PageHeader";
import { S } from "./ApplicationReviewTeamDetailPage.styles";

const members = [
  {
    initial: "서",
    name: "이수연",
    role: "팀장 · 기획",
    specialty: "서비스 기획 · 프로젝트 매니저",
    school: "경영학부 3학년",
    tone: "green" as const,
  },
  {
    initial: "김",
    name: "김민재",
    role: "개발",
    specialty: "프론트엔드 개발",
    school: "컴퓨터과학부 3학년",
    tone: "blue" as const,
  },
  {
    initial: "지",
    name: "박지윤",
    role: "디자인",
    specialty: "프로덕트 디자인 · BI/BX 디자인",
    school: "디자인학과 2학년",
    tone: "purple" as const,
  },
];

const currentMember = {
  initial: "김",
  name: "김현진",
  role: "백엔드 개발 · 나",
  specialty: "백엔드 개발",
  school: "서울시립대 컴퓨터과학부 3학년",
  tone: "blue" as const,
};

export function ApplicationReviewTeamDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAccepted = location.pathname.endsWith("/joined-data-seoul");

  return (
    <S.Page>
      <S.Content>
        <PageHeader onBack={() => navigate(-1)} title="팀 상세" />

        <S.Hero>
          <S.BadgeRow>
            <S.StatusBadges>
              {isAccepted ? (
                <S.JoinedBadge>내 팀</S.JoinedBadge>
              ) : (
                <>
                  <S.OpenBadge>모집 중</S.OpenBadge>
                  <S.ReviewBadge>지원 검토 중</S.ReviewBadge>
                </>
              )}
            </S.StatusBadges>
            <S.CountBadge>{isAccepted ? "4/5명" : "3/5명"}</S.CountBadge>
          </S.BadgeRow>
          <S.HeroTitleRow>
            <S.TeamName>데이터로 서울을</S.TeamName>
          </S.HeroTitleRow>
          <S.ContestName>2026 서울시 데이터 활용 공모전</S.ContestName>
          <S.ProgressTrack aria-label="팀원 모집 진행률">
            <S.ProgressValue $value={isAccepted ? 80 : 60} />
          </S.ProgressTrack>
          <S.Remaining>
            {isAccepted ? "내가 합류해서 4/5명 · 1자리 남았어요" : "2자리 남았어요"}
          </S.Remaining>
        </S.Hero>

        <S.Section>
          <S.IntroductionTitle>팀 소개</S.IntroductionTitle>
          <S.Introduction>
            서울시 열린데이터로 생활 문제를 푸는 팀입니다. 주 1회 오프라인 회의,
            나머지는 노션·디스코드로 소통해요.
          </S.Introduction>
        </S.Section>

        <S.ApplicationSection>
          <S.ApplicationCard $accepted={isAccepted}>
            <S.ApplicationCardHeader>
              {isAccepted ? (
                <S.AcceptedBadge>수락됨</S.AcceptedBadge>
              ) : (
                <S.ReviewBadge>지원 검토 중</S.ReviewBadge>
              )}
              <time>09.08 지원</time>
            </S.ApplicationCardHeader>
            <S.ApplicationTitle>
              {isAccepted ? "백엔드 개발자로 합류했어요" : "이미 지원한 팀이에요"}
            </S.ApplicationTitle>
            <S.ApplicationDescription>
              {isAccepted
                ? "이제 이 팀은 마이페이지 · 내 팀에서 바로 볼 수 있어요."
                : "팀장이 검토하는 중이에요. 결과가 나오면 알림으로 알려드릴게요. 결과 전까지 같은 팀에 다시 지원할 수 없어요."}
            </S.ApplicationDescription>
            <S.Timeline aria-label="지원 진행 상태">
              <S.TimelineStep $state="complete">
                <S.TimelineDot $complete>
                  <Icon name="check" size={12} weight="bold" />
                </S.TimelineDot>
                <span>지원 완료</span>
              </S.TimelineStep>
              <S.TimelineLine $state="complete" />
              <S.TimelineStep $state="complete">
                <S.TimelineDot $complete>
                  <Icon name="check" size={12} weight="bold" />
                </S.TimelineDot>
                <span>팀장 검토</span>
              </S.TimelineStep>
              <S.TimelineLine $state={isAccepted ? "complete" : "pending"} />
              <S.TimelineStep $state={isAccepted ? "complete" : "pending"}>
                <S.TimelineDot $complete={isAccepted}>
                  {isAccepted && <Icon name="check" size={12} weight="bold" />}
                </S.TimelineDot>
                <span>결과 발표</span>
              </S.TimelineStep>
            </S.Timeline>
            <S.ApplicationPosition $accepted={isAccepted}>
              <span>{isAccepted ? "내 역할" : "지원 포지션"}</span>
              <strong>백엔드 개발자</strong>
            </S.ApplicationPosition>
          </S.ApplicationCard>
        </S.ApplicationSection>

        <S.Section>
          <S.PositionSectionTitle>포지션별 모집 현황</S.PositionSectionTitle>
          <S.PositionList>
            <S.PositionCard $applied={false}>
              <div>
                <strong>기획</strong>
              </div>
              <S.ClosedBadge>마감</S.ClosedBadge>
            </S.PositionCard>
            <S.PositionCard $applied>
              <div>
                <strong>개발</strong>
                <span>백엔드 개발자 1명 · 데이터 엔지니어 1명</span>
              </div>
              <S.AppliedBadge>{isAccepted ? "내 포지션" : "내가 지원"}</S.AppliedBadge>
            </S.PositionCard>
            <S.PositionCard $applied={false}>
              <div>
                <strong>디자인</strong>
              </div>
              <S.ClosedBadge>마감</S.ClosedBadge>
            </S.PositionCard>
          </S.PositionList>
        </S.Section>

        <S.Section>
          <S.InfoGrid>
            <S.InfoItem>
              <dt>활동 방식</dt>
              <dd>온라인 + 오프라인</dd>
            </S.InfoItem>
            <S.InfoItem>
              <dt>모집 마감</dt>
              <dd>06.20 (목)</dd>
            </S.InfoItem>
            <S.InfoItem>
              <dt>주간 회의</dt>
              <dd>주 1회</dd>
            </S.InfoItem>
          </S.InfoGrid>
        </S.Section>

        <S.Section $last>
          <S.SectionTitle>
            {isAccepted ? "팀원 4명 · 나 포함" : "팀원 3명"}
          </S.SectionTitle>
          <S.MemberList>
            {(isAccepted ? [...members, currentMember] : members).map((member) => (
              <S.Member key={member.name}>
                <S.MemberAvatar $tone={member.tone}>{member.initial}</S.MemberAvatar>
                <S.MemberContent>
                  <S.MemberHeading>
                    <S.MemberName>{member.name}</S.MemberName>
                    <S.MemberRole>{member.role}</S.MemberRole>
                  </S.MemberHeading>
                  <S.MemberSpecialty>{member.specialty}</S.MemberSpecialty>
                  <S.MemberSchool>{member.school}</S.MemberSchool>
                </S.MemberContent>
              </S.Member>
            ))}
          </S.MemberList>
        </S.Section>
      </S.Content>

      <S.ActionBar>
        <S.ChatButton aria-label="팀장에게 문의하기" type="button">
          <Icon name="chat" size={20} weight="regular" />
        </S.ChatButton>
        {isAccepted ? (
          <S.AcceptedViewApplicationButton
            onClick={() => navigate("/my-team/my-application")}
            type="button"
          >
            내 지원서 보기
          </S.AcceptedViewApplicationButton>
        ) : (
          <S.ApplicationActions>
            <S.ViewApplicationButton
              onClick={() => navigate("/my-team/my-application/pending")}
              type="button"
            >
              내 지원서 보기
            </S.ViewApplicationButton>
            <S.CancelApplicationButton type="button">지원 취소하기</S.CancelApplicationButton>
          </S.ApplicationActions>
        )}
      </S.ActionBar>
    </S.Page>
  );
}
