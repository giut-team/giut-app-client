import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomSheet } from "../../../components/BottomSheet/BottomSheet";
import { Modal } from "../../../components/Modal/Modal";
import { PageHeader } from "../../../components/PageHeader";
import { Toast } from "../../../components/Toast/Toast";
import { Icon } from "../../../components/icons";
import idInviteIcon from "../../../assets/team-invite/id-invite.svg";
import messageSendIcon from "../../../assets/team-invite/message-send.svg";
import { S } from "./OwnerTeamDetailPage.styles";

const positions = [
  { name: "백엔드 개발자", info: "지원 3건 대기 중", open: true },
  { name: "데이터 엔지니어", info: "지원 2건 대기 중", open: true },
  { name: "기획", info: "모집이 마감되었어요", open: false },
];

const members = [
  {
    initial: "서",
    name: "이서연",
    role: "팀장 · 기획",
    school: "경영학부 3학년",
    specialty: "서비스 기획 · 프로덕트 매니저",
    tone: "green" as const,
  },
  {
    initial: "민",
    name: "김민재",
    role: "개발",
    school: "컴퓨터과학부 3학년",
    specialty: "프론트엔드 개발 · 풀스택 개발자",
    tone: "blue" as const,
  },
  {
    initial: "지",
    name: "박지윤",
    role: "디자인",
    school: "디자인학과 2학년",
    specialty: "프로덕트 디자인 · BI/BX 디자이너",
    tone: "purple" as const,
  },
];

const teamCapacity = 5;

type ActionMenuState = "closed" | "opening";

const getInviteExpiry = () => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  return `${String(expiryDate.getMonth() + 1).padStart(2, "0")}.${String(
    expiryDate.getDate(),
  ).padStart(2, "0")}까지`;
};

export function OwnerTeamDetailPage() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(true);
  const [isCloseSheetOpen, setIsCloseSheetOpen] = useState(false);
  const [isInviteSheetOpen, setIsInviteSheetOpen] = useState(false);
  const [isCloseAcknowledged, setIsCloseAcknowledged] = useState(true);
  const [actionMenuState, setActionMenuState] =
    useState<ActionMenuState>("closed");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isTeamFull = members.length >= teamCapacity;
  const isRecruitmentOpen = isRecruiting && !isTeamFull;
  const isRecruitmentClosed = !isRecruitmentOpen;

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(""), 3200);
  };
  const isActionMenuOpen = actionMenuState === "opening";
  const toggleActionMenu = () => {
    setActionMenuState((current) =>
      current === "closed" ? "opening" : "closed",
    );
  };
  const inviteLink = "https://giut.app/t/seoul-data/QK7F2";
  const inviteExpiry = getInviteExpiry();
  const copyInviteLink = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(inviteLink);
      showToast("초대 링크를 복사했습니다.");
    } catch {
      showToast("초대 링크를 복사해 주세요.");
    }
  };
  const shareInviteLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "데이터로 서울을 팀 초대",
          text: "데이터로 서울을 팀에 함께해요!",
          url: inviteLink,
        });
        return;
      }

      await copyInviteLink();
    } catch {
      // 공유 시트를 닫은 경우에는 별도 안내를 표시하지 않습니다.
    }
  };

  return (
    <S.Page>
      <S.Content>
        <PageHeader
          onBack={() => navigate(-1)}
          rightContent={
            isRecruitmentOpen ? (
              <S.HeaderActions>
                <S.MoreButton
                  aria-expanded={isActionMenuOpen}
                  aria-haspopup="menu"
                  aria-label="팀 관리 메뉴"
                  onClick={toggleActionMenu}
                  type="button"
                >
                  <Icon name="more" size={20} weight="bold" />
                </S.MoreButton>
                {actionMenuState !== "closed" && (
                  <S.ActionMenu $state={actionMenuState} role="menu">
                    <S.ActionMenuButton
                      $index={0}
                      $state={actionMenuState}
                      onClick={() => {
                        setActionMenuState("closed");
                        navigate("/contests/seoul-data/teams/my-data-seoul/edit");
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <Icon name="edit" size={14} weight="bold" />팀 수정하기
                    </S.ActionMenuButton>
                    <S.ActionMenuButton
                      $danger
                      $index={1}
                      $state={actionMenuState}
                      onClick={() => {
                        setActionMenuState("closed");
                        setIsDeleteModalOpen(true);
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <Icon name="trash" size={14} weight="bold" />팀 삭제하기
                    </S.ActionMenuButton>
                  </S.ActionMenu>
                )}
              </S.HeaderActions>
            ) : undefined
          }
          title="팀 상세"
        />

        <S.Hero>
          <S.HeroTopline>
            <S.OwnerBadge $closed={isRecruitmentClosed}>
              {isRecruitmentClosed ? "모집 마감" : "내가 만든 팀"}
            </S.OwnerBadge>
            <S.CountBadge $closed={isRecruitmentClosed}>
              {members.length}/{teamCapacity}명
            </S.CountBadge>
          </S.HeroTopline>
          <S.TeamTitle>데이터로 서울을</S.TeamTitle>
          <S.ContestName>2026 서울시 데이터 활용 공모전</S.ContestName>
          <S.ProgressTrack aria-label="팀원 모집 진행률">
            <S.ProgressValue $closed={isRecruitmentClosed} />
          </S.ProgressTrack>
          <S.HeroMeta>
            {isRecruitmentClosed
              ? isTeamFull
                ? "모든 자리가 찼어요 · 새 지원 3건"
                : "모집이 마감되었어요"
              : `${teamCapacity - members.length}자리 남았어요 · 새 지원 3건`}
          </S.HeroMeta>
        </S.Hero>

        <S.Section>
          <S.SectionTitle>포지션별 모집 현황</S.SectionTitle>
          <S.PositionList>
            {positions.map((position) => (
              <S.PositionCard
                $open={position.open && isRecruitmentOpen}
                key={position.name}
              >
                <div>
                  <S.PositionName $open={position.open && isRecruitmentOpen}>
                    {position.name}
                  </S.PositionName>
                  {!isRecruitmentClosed && (
                    <S.PositionInfo>{position.info}</S.PositionInfo>
                  )}
                </div>
                <S.PositionStatus $open={position.open && isRecruitmentOpen}>
                  {position.open && isRecruitmentOpen ? "모집 중" : "마감"}
                </S.PositionStatus>
              </S.PositionCard>
            ))}
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

        <S.Section>
          <S.SectionTitle>팀 소개</S.SectionTitle>
          <S.Introduction>
            서울시 열린데이터로 생활 문제를 푸는 팀입니다. 주 1회 오프라인
            회의와 온라인 소통으로 함께해요.
          </S.Introduction>
        </S.Section>

        <S.Section $last>
          <S.SectionTitle>팀원 3명</S.SectionTitle>
          <S.MemberList>
            {members.map((member) => (
              <S.Member key={member.name}>
                <S.Avatar $tone={member.tone}>{member.initial}</S.Avatar>
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
        {isRecruitmentClosed ? (
          <S.ClosedAction>
            <S.ChatButton aria-label="팀에 문의하기" type="button">
              <Icon name="chat" size={19} weight="regular" />
            </S.ChatButton>
            <S.ClosedRecruitmentButton disabled type="button">
              모집이 마감된 팀이에요
            </S.ClosedRecruitmentButton>
          </S.ClosedAction>
        ) : (
          <>
            <S.ApplicationsButton
              onClick={() => navigate("/my-team/applications")}
              type="button"
            >
              받은 지원 3건 보기 <S.NewBadge>NEW</S.NewBadge>
            </S.ApplicationsButton>
            <S.SecondaryActions>
              <S.SecondaryButton
                onClick={() => setIsInviteSheetOpen(true)}
                type="button"
              >
                팀원 초대하기
              </S.SecondaryButton>
              <S.SecondaryButton
                onClick={() => setIsCloseSheetOpen(true)}
                type="button"
              >
                모집 마감하기
              </S.SecondaryButton>
            </S.SecondaryActions>
          </>
        )}
      </S.ActionBar>
      <BottomSheet
        footer={
          <S.SheetActions>
            <S.SheetButton
              onClick={() => setIsCloseSheetOpen(false)}
              type="button"
            >
              취소
            </S.SheetButton>
            <S.SheetButton
              $primary
              disabled={!isCloseAcknowledged}
              onClick={() => {
                setIsRecruiting(false);
                setIsCloseSheetOpen(false);
                showToast("모집을 마감했어요.");
              }}
              type="button"
            >
              모집 마감하기
            </S.SheetButton>
          </S.SheetActions>
        }
        footerVariant="action"
        minHeight="410px"
        onClose={() => setIsCloseSheetOpen(false)}
        open={isCloseSheetOpen}
        showHeaderDivider={false}
        variant="compact"
      >
        <S.SheetIcon $tone="warning">
          <Icon name="warning" size={19} weight="fill" />
        </S.SheetIcon>
        <S.SheetTitle>모집을 마감할까요?</S.SheetTitle>
        <S.SheetDescription>
          마감하면 공모전 팀 목록에서 내려가고 새 지원을 받지 않아요. 대기 중인
          지원은 자동으로 거절됩니다.
        </S.SheetDescription>
        <S.Summary>
          <S.SummaryRow>
            <dt>현재 팀 인원</dt>
            <dd>3 / 5명</dd>
          </S.SummaryRow>
          <S.SummaryRow>
            <dt>대기 중인 지원</dt>
            <S.Pending>3건 저장됨</S.Pending>
          </S.SummaryRow>
          <S.SummaryRow>
            <dt>남는 자리</dt>
            <dd>2자리 → 마감</dd>
          </S.SummaryRow>
        </S.Summary>
        <S.Acknowledgement>
          <input
            checked={isCloseAcknowledged}
            onChange={(event) => setIsCloseAcknowledged(event.target.checked)}
            type="checkbox"
          />
          대기 중인 지원자에게 개별 알림을 보낼게요
        </S.Acknowledgement>
      </BottomSheet>
      <BottomSheet
        footer={
          <S.SheetCloseButton
            onClick={() => setIsInviteSheetOpen(false)}
            type="button"
          >
            닫기
          </S.SheetCloseButton>
        }
        footerVariant="action"
        minHeight="402px"
        onClose={() => setIsInviteSheetOpen(false)}
        open={isInviteSheetOpen}
        showHeaderDivider={false}
        variant="compact"
      >
        <S.SheetIcon $tone="primary">
          <Icon name="user-plus" size={19} weight="bold" />
        </S.SheetIcon>
        <S.SheetTitle>팀원 초대하기</S.SheetTitle>
        <S.SheetDescription>
          링크를 받은 사람은 지원서를 쓰지 않고 바로 합류해요. 남은 자리 2개까지
          초대할 수 있어요.
        </S.SheetDescription>
        <S.InviteLinkCard>
          <S.InviteLinkLabel>초대 링크</S.InviteLinkLabel>
          <S.InviteLinkRow>
            <S.InviteLink>giut.app/t/seoul-data/QK7F2</S.InviteLink>
            <S.CopyButton
              onClick={() => {
                setIsInviteSheetOpen(false);
                void copyInviteLink();
              }}
              type="button"
            >
              복사
            </S.CopyButton>
          </S.InviteLinkRow>
          <S.InviteExpiry>
            유효 기간 <strong>7일 · {inviteExpiry}</strong>
          </S.InviteExpiry>
        </S.InviteLinkCard>
        <S.InviteOptions>
          <S.InviteOption onClick={() => void shareInviteLink()} type="button">
            <S.InviteOptionIcon $tone="white">
              <S.InviteOptionImage alt="" src={messageSendIcon} />
            </S.InviteOptionIcon>
            <S.InviteOptionCopy>
              <strong>메시지로 보내기</strong>
              <small>카카오톡 · 문자</small>
            </S.InviteOptionCopy>
            <S.InviteCaret>
              <Icon name="caret-right" size={13} weight="bold" />
            </S.InviteCaret>
          </S.InviteOption>
          <S.InviteOption
            onClick={() => {
              setIsInviteSheetOpen(false);
              showToast("아이디로 초대 기능을 준비 중이에요.");
            }}
            type="button"
          >
            <S.InviteOptionIcon $tone="purple">
              <S.InviteOptionImage alt="" src={idInviteIcon} />
            </S.InviteOptionIcon>
            <S.InviteOptionCopy>
              <strong>아이디로 초대</strong>
              <small>이미 같이 하기로 한 팀원의 아이디로 추가해요</small>
            </S.InviteOptionCopy>
            <S.InviteCaret>
              <Icon name="caret-right" size={13} weight="bold" />
            </S.InviteCaret>
          </S.InviteOption>
        </S.InviteOptions>
      </BottomSheet>
      <Modal
        description="팀과 모집 정보가 삭제되며 되돌릴 수 없어요."
        icon={<Icon name="trash" size={22} weight="bold" />}
        onClose={() => setIsDeleteModalOpen(false)}
        open={isDeleteModalOpen}
        primaryAction={{
          label: "삭제하기",
          onClick: () => navigate("/contests/seoul-data", { replace: true }),
        }}
        secondaryAction={{
          label: "취소",
          onClick: () => setIsDeleteModalOpen(false),
        }}
        title="팀을 삭제할까요?"
      />
      <Toast message={toastMessage} open={Boolean(toastMessage)} />
    </S.Page>
  );
}
