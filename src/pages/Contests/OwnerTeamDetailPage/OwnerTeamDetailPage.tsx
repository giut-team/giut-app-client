import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../../components/PageHeader";
import { Toast } from "../../../components/Toast/Toast";
import { S } from "./OwnerTeamDetailPage.styles";

const positions = [
  { name: "백엔드 개발자", info: "지원 3건 대기 중", open: true },
  { name: "데이터 엔지니어", info: "지원 2건 대기 중", open: true },
  { name: "기획", info: "이서연(팀장) 확정", open: false },
];

const members = [
  { initial: "서", name: "이서연 팀장", tone: "green" as const },
  { initial: "민", name: "김민재", tone: "blue" as const },
  { initial: "지", name: "박지윤", tone: "purple" as const },
];

export function OwnerTeamDetailPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(true);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 1800);
  };

  return (
    <S.Page>
      <S.Content>
        <PageHeader
          onBack={() => navigate(-1)}
          rightContent={
            <S.EditButton
              onClick={() => showToast("팀 정보 수정 기능을 준비 중이에요.")}
              type="button"
            >
              수정
            </S.EditButton>
          }
          title="팀 상세"
        />

        <S.Hero>
          <S.HeroTopline>
            <S.OwnerBadge>내가 만든 팀</S.OwnerBadge>
            <S.CountBadge>3/5명</S.CountBadge>
          </S.HeroTopline>
          <S.TeamTitle>데이터로 서울을</S.TeamTitle>
          <S.ContestName>2024 서울시 데이터 활용 공모전</S.ContestName>
          <S.ProgressTrack aria-label="팀원 모집 진행률">
            <S.ProgressValue />
          </S.ProgressTrack>
          <S.HeroMeta>2자리 남았어요 · 새 지원 3건</S.HeroMeta>
        </S.Hero>

        <S.Section>
          <S.SectionTitle>포지션별 모집 현황</S.SectionTitle>
          <S.PositionList>
            {positions.map((position) => (
              <S.PositionCard $open={position.open && isRecruiting} key={position.name}>
                <div>
                  <S.PositionName $open={position.open && isRecruiting}>
                    {position.name}
                  </S.PositionName>
                  <S.PositionInfo>{position.info}</S.PositionInfo>
                </div>
                <S.PositionStatus $open={position.open && isRecruiting}>
                  {position.open && isRecruiting ? "모집 중" : "마감"}
                </S.PositionStatus>
              </S.PositionCard>
            ))}
          </S.PositionList>
        </S.Section>

        <S.Section>
          <S.SectionTitle>팀원 3명</S.SectionTitle>
          <S.MemberList>
            {members.map((member) => (
              <S.MemberChip key={member.name}>
                <S.Avatar $tone={member.tone}>{member.initial}</S.Avatar>
                {member.name}
              </S.MemberChip>
            ))}
          </S.MemberList>
        </S.Section>
      </S.Content>

      <S.ActionBar>
        <S.ApplicationsButton
          onClick={() => navigate("/my-team/applications")}
          type="button"
        >
          받은 지원 3건 보기 <S.NewBadge>NEW</S.NewBadge>
        </S.ApplicationsButton>
        <S.SecondaryActions>
          <S.SecondaryButton
            onClick={() => showToast("팀원 초대 링크를 준비 중이에요.")}
            type="button"
          >
            팀원 초대하기
          </S.SecondaryButton>
          <S.SecondaryButton
            onClick={() => {
              setIsRecruiting((current) => !current);
              showToast(isRecruiting ? "모집을 마감했어요." : "모집을 다시 열었어요.");
            }}
            type="button"
          >
            {isRecruiting ? "모집 마감하기" : "모집 다시 열기"}
          </S.SecondaryButton>
        </S.SecondaryActions>
      </S.ActionBar>
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
