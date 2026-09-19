import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { Modal } from "../../../components/Modal/Modal";
import { PageHeader } from "../../../components/PageHeader";
import { S } from "./TeamDetailPage.styles";

const members = [
  {
    initials: "이",
    name: "이서연",
    role: "팀장 · 기획",
    specialty: "서비스 기획 · 프로젝트 매니저",
    school: "경영학부 3학년",
    tone: "green" as const,
  },
  {
    initials: "김",
    name: "김민재",
    role: "개발",
    specialty: "프론트엔드 개발",
    school: "컴퓨터과학부 3학년",
    tone: "blue" as const,
  },
  {
    initials: "지",
    name: "박지윤",
    role: "디자인",
    specialty: "프로덕트 디자인 · BI/BX 디자인",
    school: "디자인학과 2학년",
    tone: "purple" as const,
  },
];

export function TeamDetailPage() {
  const navigate = useNavigate();
  const { contestId = "seoul-data", teamId = "data-seoul" } = useParams();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <S.Page>
      <S.Content>
        <PageHeader
          onBack={() => navigate(-1)}
          rightContent={
            <S.BookmarkButton
              aria-label={isBookmarked ? "팀 찜 해제" : "팀 찜하기"}
              aria-pressed={isBookmarked}
              onClick={() => setIsBookmarked((current) => !current)}
              type="button"
            >
              <Icon
                name="bookmark"
                size={20}
                weight={isBookmarked ? "fill" : "regular"}
              />
            </S.BookmarkButton>
          }
          title="팀 상세"
        />

        <S.Hero>
          <S.TitleRow>
            <S.TeamTitle>데이터로 서울을</S.TeamTitle>
            <S.CountBadge>3/5명</S.CountBadge>
          </S.TitleRow>
          <S.ContestName>2026 서울시 데이터 활용 공모전</S.ContestName>
          <S.ProgressTrack aria-label="팀원 모집 진행률">
            <S.ProgressValue $value={60} />
          </S.ProgressTrack>
          <S.Remaining>2자리 남았어요</S.Remaining>
        </S.Hero>

        <S.Section>
          <S.SectionTitle>팀 소개</S.SectionTitle>
          <S.Introduction>
            서울의 열린데이터로 생활 문제를 푸는 팀입니다. 주 1회 오프라인 회의,
            나머지는 노션·디스코드로 소통해요.
          </S.Introduction>
        </S.Section>

        <S.Section>
          <S.SectionTitle>포지션별 모집 현황</S.SectionTitle>
          <S.RecruitmentCard>
            <div>
              <S.RecruitmentRole>개발</S.RecruitmentRole>
              <S.RecruitmentMeta>
                백엔드 개발자 · 데이터 엔지니어 · 2명 모집
              </S.RecruitmentMeta>
            </div>
            <S.RecruitingBadge>모집 중</S.RecruitingBadge>
          </S.RecruitmentCard>
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
          <S.SectionTitle>팀원 3명</S.SectionTitle>
          <S.MemberList>
            {members.map((member) => (
              <S.Member key={member.name}>
                <S.Avatar $tone={member.tone}>{member.initials}</S.Avatar>
                <div>
                  <S.MemberHeading>
                    <S.MemberName>{member.name}</S.MemberName>
                    <S.RoleBadge>{member.role}</S.RoleBadge>
                  </S.MemberHeading>
                  <S.MemberRole>{member.specialty}</S.MemberRole>
                  <S.MemberSchool>{member.school}</S.MemberSchool>
                </div>
              </S.Member>
            ))}
          </S.MemberList>
        </S.Section>
      </S.Content>

      <S.ActionBar>
        <S.ChatButton aria-label="팀장에게 문의하기" type="button">
          <Icon name="chat" size={19} weight="regular" />
        </S.ChatButton>
        <S.ApplyButton onClick={() => setIsApplyModalOpen(true)} type="button">
          팀 지원하기
        </S.ApplyButton>
      </S.ActionBar>
      <Modal
        emphasizeDescription
        emphasizeSecondaryAction
        icon={<Icon name="check" size={22} weight="bold" />}
        onClose={() => setIsApplyModalOpen(false)}
        open={isApplyModalOpen}
        primaryAction={{
          label: "지원하기",
          onClick: () =>
            navigate(`/contests/${contestId}/teams/${teamId}/apply`),
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsApplyModalOpen(false),
        }}
        title="이 팀에 지원하시겠습니까?"
      />
    </S.Page>
  );
}
