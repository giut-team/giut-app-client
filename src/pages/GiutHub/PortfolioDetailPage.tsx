import { useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MarkdownContent } from "../../components/MarkdownContent";
import { PageHeader } from "../../components/PageHeader";
import { Icon } from "../../components/icons";
import { giutHubProfiles } from "./GiutHubPage";
import { GiutHubDialog } from "./GiutHubDialog";
import {
  detailsByProfileId,
  getSkillIcon,
  TeamProposalBottomSheet,
} from "./GiutHubProfilePage";
import { S } from "./PortfolioDetailPage.styles";

function PortfolioShareModal({
  open,
  portfolioTitle,
  profileName,
  detailRole,
  onClose,
}: {
  open: boolean;
  portfolioTitle: string;
  profileName: string;
  detailRole: string;
  onClose: () => void;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const portfolioLink = `giut.kr/p/${portfolioTitle.replaceAll(" ", "-").toLowerCase()}`;

  const copyPortfolioLink = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href);
    } finally {
      setIsCopied(true);
    }
  };

  const openNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${portfolioTitle} 포트폴리오`,
          text: `${portfolioTitle} 포트폴리오를 확인해 보세요.`,
          url: window.location.href,
        });
      } else {
        await copyPortfolioLink();
      }
    } catch {
      // 사용자가 기기 공유 창을 닫아도 현재 모달은 유지합니다.
    }
  };

  return (
    <GiutHubDialog
      description={`'${portfolioTitle}' 페이지 링크를 공유해요.`}
      onClose={onClose}
      open={open}
      title="포트폴리오 공유"
    >
      <S.SharePreview>
        <S.SharePreviewThumbnail />
        <span>
          <strong>{portfolioTitle}</strong>
          <small>
            {profileName} · {detailRole}
          </small>
        </span>
      </S.SharePreview>
      <S.ShareLinkBox>
        <code>{portfolioLink}</code>
        <S.CopyButton onClick={copyPortfolioLink} type="button">
          {isCopied ? "복사됨" : "복사"}
        </S.CopyButton>
      </S.ShareLinkBox>
      <S.ShareChannelList aria-label="공유 방식 선택">
        <S.ShareChannel onClick={openNativeShare} type="button">
          <S.KakaoMark>
            <Icon name="chat" size={22} weight="fill" />
          </S.KakaoMark>
          <span>카카오톡</span>
        </S.ShareChannel>
        <S.ShareChannel onClick={copyPortfolioLink} type="button">
          <S.ShareChannelIcon>
            <Icon name="link" size={23} weight="bold" />
          </S.ShareChannelIcon>
          <span>링크 공유</span>
        </S.ShareChannel>
        <S.ShareChannel onClick={openNativeShare} type="button">
          <S.ShareChannelIcon>
            <Icon name="share" size={23} weight="bold" />
          </S.ShareChannelIcon>
          <span>기타</span>
        </S.ShareChannel>
      </S.ShareChannelList>
      <S.ShareCloseButton onClick={onClose} type="button">
        닫기
      </S.ShareCloseButton>
    </GiutHubDialog>
  );
}

export function PortfolioDetailPage() {
  const navigate = useNavigate();
  const [isProposalSheetOpen, setIsProposalSheetOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const { profileNumber, portfolioNumber } = useParams();
  const profile = giutHubProfiles.find(
    (item) => item.profileNumber === Number(profileNumber),
  );
  const portfolio =
    profile && detailsByProfileId[profile.id]?.portfolios[Number(portfolioNumber) - 1];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goBack = () => {
    if (isLeaving) return;

    setIsLeaving(true);
    window.setTimeout(() => navigate(-1), 220);
  };

  const handleSwipeStart = (event: PointerEvent<HTMLDivElement>) => {
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const handleSwipeEnd = (event: PointerEvent<HTMLDivElement>) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || start.x > 36) return;

    const horizontalDistance = event.clientX - start.x;
    const verticalDistance = Math.abs(event.clientY - start.y);
    if (horizontalDistance > 88 && horizontalDistance > verticalDistance) goBack();
  };

  if (!profile || !portfolio) return <Navigate replace to="/giut-hub" />;

  return (
    <S.Page $isLeaving={isLeaving}>
      <S.Content onPointerDown={handleSwipeStart} onPointerUp={handleSwipeEnd}>
        <PageHeader
          centerTitle
          onBack={goBack}
          rightContent={
            <S.ShareButton
              aria-label="공유하기"
              onClick={() => setIsShareModalOpen(true)}
              type="button"
            >
              <Icon name="share" size={25} weight="regular" />
            </S.ShareButton>
          }
          title="포트폴리오"
        />
        <S.HeroImage>
          <img alt={`${portfolio.title} 대표 이미지`} src={portfolio.image} />
        </S.HeroImage>
        <S.Body>
          <S.Author>
            <S.Avatar $tone={profile.avatarTone}>
              {profile.avatarSrc ? (
                <img alt="" src={profile.avatarSrc} />
              ) : (
                profile.avatarFallback
              )}
            </S.Avatar>
            <span>
              <strong>{profile.name}</strong>
              <small>
                {profile.detailRole} / {profile.role}
              </small>
            </span>
          </S.Author>
          <S.Title>{portfolio.title}</S.Title>
          <S.Meta>2026.03 - 2026.06&nbsp;&nbsp;·&nbsp;&nbsp;4인 팀</S.Meta>
          <S.Markdown>
            <MarkdownContent content={portfolio.markdown} />
          </S.Markdown>
          <S.StackTitle>기술 스택</S.StackTitle>
          <S.StackList>
            {detailsByProfileId[profile.id].skills.slice(0, 3).map((skill, index) => (
              <S.Stack $index={index} key={skill}>
                {getSkillIcon(skill) && <img alt="" src={getSkillIcon(skill)} />}
                {skill}
              </S.Stack>
            ))}
          </S.StackList>
        </S.Body>
      </S.Content>
      <S.ProposalBar>
        <S.ProposalButton onClick={() => setIsProposalSheetOpen(true)} type="button">
          <Icon name="users" size={23} weight="regular" />
          {profile.name}에게 팀 제안하기
        </S.ProposalButton>
      </S.ProposalBar>
      <TeamProposalBottomSheet
        onClose={() => setIsProposalSheetOpen(false)}
        open={isProposalSheetOpen}
        profileName={profile.name}
      />
      <PortfolioShareModal
        detailRole={profile.detailRole}
        onClose={() => setIsShareModalOpen(false)}
        open={isShareModalOpen}
        portfolioTitle={portfolio.title}
        profileName={profile.name}
      />
    </S.Page>
  );
}
