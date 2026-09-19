import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { MarkdownContent } from "../../components/MarkdownContent";
import { PageHeader } from "../../components/PageHeader";
import { Icon } from "../../components/icons";
import { giutHubProfiles } from "./GiutHubPage";
import { detailsByProfileId, getSkillIcon, TeamProposalBottomSheet } from "./GiutHubProfilePage";
import { S } from "./PortfolioDetailPage.styles";

export function PortfolioDetailPage() {
  const navigate = useNavigate();
  const [isProposalSheetOpen, setIsProposalSheetOpen] = useState(false);
  const { profileNumber, portfolioNumber } = useParams();
  const profile = giutHubProfiles.find((item) => item.profileNumber === Number(profileNumber));
  const portfolio = profile && detailsByProfileId[profile.id]?.portfolios[Number(portfolioNumber) - 1];

  if (!profile || !portfolio) return <Navigate replace to="/giut-hub" />;

  return (
    <S.Page>
      <S.Content>
        <PageHeader
          centerTitle
          onBack={() => navigate(-1)}
          rightContent={<S.ShareButton aria-label="공유하기" type="button"><Icon name="share" size={25} weight="regular" /></S.ShareButton>}
          title="포트폴리오"
        />
        <S.HeroImage><img alt={`${portfolio.title} 대표 이미지`} src={portfolio.image} /></S.HeroImage>
        <S.Body>
          <S.Author>
            <S.Avatar $tone={profile.avatarTone}>{profile.avatarSrc ? <img alt="" src={profile.avatarSrc} /> : profile.avatarFallback}</S.Avatar>
            <span><strong>{profile.name}</strong><small>{profile.detailRole} / {profile.role}</small></span>
          </S.Author>
          <S.Title>{portfolio.title}</S.Title>
          <S.Meta>2026.03 - 2026.06&nbsp;&nbsp;·&nbsp;&nbsp;4인 팀</S.Meta>
          <S.Markdown><MarkdownContent content={portfolio.markdown} /></S.Markdown>
          <S.StackTitle>기술 스택</S.StackTitle>
          <S.StackList>{detailsByProfileId[profile.id].skills.slice(0, 3).map((skill, index) => <S.Stack $index={index} key={skill}>{getSkillIcon(skill) && <img alt="" src={getSkillIcon(skill)} />}{skill}</S.Stack>)}</S.StackList>
        </S.Body>
      </S.Content>
      <S.ProposalBar><S.ProposalButton onClick={() => setIsProposalSheetOpen(true)} type="button"><Icon name="users" size={23} weight="regular" />{profile.name}에게 팀 제안하기</S.ProposalButton></S.ProposalBar>
      <TeamProposalBottomSheet onClose={() => setIsProposalSheetOpen(false)} open={isProposalSheetOpen} profileName={profile.name} />
    </S.Page>
  );
}
