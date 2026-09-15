import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { S } from "./ContestDetailPage.styles";

type DetailTab = "overview" | "guide";

const recruitTeams = [
  {
    id: "data-seoul",
    title: "데이터로 서울을",
    leader: "이수현 팀장 · 온라인 + 오프라인",
    members: "3/5명",
    positions: ["백엔드 모집", "프론트엔드 마감", "기획 마감"],
  },
  {
    id: "syrup-data-lab",
    title: "시립대 데이터랩",
    leader: "최유진 팀장 · 온라인",
    members: "2/4명",
    positions: ["기획 모집", "디자인 모집"],
  },
  {
    id: "blending-3",
    title: "열린데이터 3기",
    leader: "박지윤 팀장 · 오프라인",
    members: "4/5명",
    positions: ["마케팅 모집"],
  },
];

export function ContestDetailPage() {
  const navigate = useNavigate();
  const { contestId = "seoul-data" } = useParams();
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [isSaved, setIsSaved] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const handleShare = async () => {
    const shareData = {
      title: "2026 서울시 데이터 활용 공모전",
      text: "2026 서울시 데이터 활용 공모전을 확인해 보세요.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard?.writeText(window.location.href);
      setShareMessage("링크를 복사했어요.");
      window.setTimeout(() => setShareMessage(""), 1800);
    } catch {
      // 공유 시트를 닫은 경우에는 별도의 피드백을 표시하지 않습니다.
    }
  };

  return (
    <S.Page>
      <S.Content>
        <S.Header>
          <S.HeaderButton
            aria-label="뒤로 가기"
            onClick={() => navigate(-1)}
            type="button"
          >
            <Icon name="arrow-left" size={20} weight="regular" />
          </S.HeaderButton>
          <S.HeaderActions>
            <S.HeaderButton
              aria-label={isSaved ? "찜 취소하기" : "공모전 찜하기"}
              aria-pressed={isSaved}
              onClick={() => setIsSaved((current) => !current)}
              type="button"
            >
              <Icon
                name="bookmark"
                size={18}
                weight={isSaved ? "fill" : "regular"}
              />
            </S.HeaderButton>
            <S.HeaderButton
              aria-label="공유하기"
              onClick={handleShare}
              type="button"
            >
              <Icon name="share" size={18} weight="regular" />
            </S.HeaderButton>
          </S.HeaderActions>
        </S.Header>

        <S.Hero>
          <S.HeroTags>
            <S.Category>IT/과학</S.Category>
            <S.Verified>
              <Icon name="check" size={8} weight="bold" />
              인증마크
            </S.Verified>
          </S.HeroTags>
          <S.HeroTitle>
            2026 서울시
            <br />
            데이터 활용 공모전
          </S.HeroTitle>
          <S.Host>주최 · 서울특별시</S.Host>
          <S.HeroStats>
            <span>
              <Icon name="eye" size={11} weight="regular" />
              41,852
            </span>
            <span>
              <Icon name="bookmark" size={11} weight="regular" />
              128
            </span>
          </S.HeroStats>
          <S.DDay>D-15</S.DDay>
        </S.Hero>

        <S.InfoSection>
          <S.InfoList>
            <S.InfoRow>
              <span>접수 기간</span>
              <strong>2026.09.01 (화) - 09.30 (수)</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>참가 대상</span>
              <strong>서울 소재 대학 재/휴학생</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>시상 규모</span>
              <strong>총 상금 3,000만원</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>수집 경로</span>
              <strong>서울시립대 공지 RSS · 자동</strong>
            </S.InfoRow>
            <S.InfoRow>
              <span>원문</span>
              <S.SourceLink
                href="https://contest.seoul.go.kr"
                rel="noreferrer"
                target="_blank"
              >
                contest.seoul.go.kr ↗
              </S.SourceLink>
            </S.InfoRow>
          </S.InfoList>
          <S.Notice>
            서울시립대 공지사항 RSS에서 자동 수집된 공고입니다. 필수 항목이 모두
            채워져 인증마크가 부여되었습니다.
          </S.Notice>
        </S.InfoSection>

        <S.TabList aria-label="공모전 상세 탭" role="tablist">
          <S.TabButton
            $active={activeTab === "overview"}
            aria-selected={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            role="tab"
            type="button"
          >
            개요
          </S.TabButton>
          <S.TabButton
            $active={activeTab === "guide"}
            aria-selected={activeTab === "guide"}
            onClick={() => setActiveTab("guide")}
            role="tab"
            type="button"
          >
            상세 안내
          </S.TabButton>
        </S.TabList>

        <S.TabContent role="tabpanel">
          {activeTab === "overview" ? (
            <S.Description>
              서울시가 보유한 공공데이터를 활용해 시민 생활 문제를 해결하는
              서비스·분석 아이디어를 제안하는 공모전입니다. 데이터 분석, 서비스
              기획, 개발이 모두 필요해 3~5인 팀 단위 참가를 권장합니다.
            </S.Description>
          ) : (
            <S.Description>
              1차 서면 심사 후 2차 발표 심사가 진행됩니다. 제출물은 기획서(PDF
              10p 이내)와 시연 영상(3분 이내)이며, 수상팀은 서울시 실증 사업
              참여 기회를 제공받습니다. 자세한 내용은 원문 링크를 확인하세요.
            </S.Description>
          )}
        </S.TabContent>

        <S.TeamsHeader>
          <S.SectionHeader>
            <S.SectionTitle>
              모집 중인 팀 <S.TeamTotal>{recruitTeams.length}</S.TeamTotal>
            </S.SectionTitle>
            <S.ViewAll onClick={() => navigate("teams")} type="button">
              전체 보기 ›
            </S.ViewAll>
          </S.SectionHeader>
        </S.TeamsHeader>
        <S.TeamsSection>
          <S.TeamList>
            {recruitTeams.map((team) => (
              <S.TeamCard key={team.id}>
                <S.TeamTitleRow>
                  <S.TeamTitle>{team.title}</S.TeamTitle>
                  <S.TeamCount>{team.members}</S.TeamCount>
                </S.TeamTitleRow>
                <S.TeamMeta>{team.leader}</S.TeamMeta>
                <S.PositionList>
                  {team.positions.map((position, index) => (
                    <S.PositionBadge $open={index === 0} key={position}>
                      {position}
                    </S.PositionBadge>
                  ))}
                </S.PositionList>
              </S.TeamCard>
            ))}
          </S.TeamList>
        </S.TeamsSection>
      </S.Content>

      <S.ActionBar>
        <S.ApplyButton
          onClick={() =>
            window.location.assign(`/contests/${contestId}/teams/create?from=detail`)
          }
          type="button"
        >
          팀 구성하기
        </S.ApplyButton>
      </S.ActionBar>
      {shareMessage && (
        <S.ShareToast role="status">{shareMessage}</S.ShareToast>
      )}
    </S.Page>
  );
}
