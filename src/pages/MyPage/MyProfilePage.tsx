import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { Modal } from "../../components/Modal/Modal";
import { useAuth } from "../../contexts/AuthContext";
import { detailsByProfileId, getSkillIcon } from "../GiutHub/GiutHubProfilePage";
import { giutHubProfiles } from "../GiutHub/GiutHubPage";
import { S } from "./MyProfilePage.styles";

type MyProfileTab = "portfolio" | "teams" | "scraps";
type ScrapFilter = "all" | "posts" | "teams";
type ProfilePreview = {
  department?: string;
  grade?: string;
  name?: string;
  roles?: string[];
  skills?: string[];
};

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const, badge: 2 },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

const portfolioPeriods = [
  "2026.03 - 2026.06 · 4인 팀",
  "2026.01 - 2026.02 · 3인 팀",
  "2025.09 - 2025.11 · 개인",
  "2025.07 - 2025.08 · 4인 팀",
];
const scrapPosts = [
  {
    category: "공모전",
    savedAt: "3일 전 저장",
    title: "서울시 데이터 활용 공모전",
    organization: "서울특별시",
    deadline: "D-15",
    tone: "green",
  },
  {
    category: "해커톤",
    savedAt: "5일 전 저장",
    title: "2026 대학생 해커톤",
    organization: "삼성전자",
    deadline: "D-5",
    tone: "blue",
  },
  {
    category: "공모전",
    savedAt: "1주 전 저장",
    title: "대학생 ESG 아이디어 챌린지",
    organization: "환경부",
    deadline: "D-8",
    tone: "purple",
  },
  {
    category: "대외활동",
    savedAt: "1주 전 저장",
    title: "청년 정책 서포터즈 6기",
    organization: "행정안전부",
    deadline: "D-10",
    tone: "pink",
  },
  {
    category: "경진대회",
    savedAt: "2주 전 저장",
    title: "대학생 마케팅 아이디어 대회",
    organization: "CJ제일제당",
    deadline: "D-21",
    tone: "orange",
  },
] as const;
const scrapTeams = [
  {
    title: "데이터로 서울을",
    detail: "백엔드 개발자 · 1자리 모집",
    status: "모집 중 · 어제 저장",
  },
  {
    title: "그린테크 스터디팀",
    detail: "데이터 분석 · 2자리 모집",
    status: "모집 중 · 3일 전 저장",
  },
  {
    title: "캠퍼스 앱 리디자인",
    detail: "UI 디자이너 · 1자리 모집",
    status: "모집 중 · 1주 전 저장",
  },
] as const;

export function MyProfilePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, universityVerified } = useAuth();
  const isUniversityUnverified = isAuthenticated && !universityVerified;
  const preview = location.state as ProfilePreview | null;
  const [activeTab, setActiveTab] = useState<MyProfileTab>("portfolio");
  const [scrapFilter, setScrapFilter] = useState<ScrapFilter>("all");
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const profile = giutHubProfiles.find((item) => item.id === "minjae");
  if (!profile) return null;

  const detail = detailsByProfileId[profile.id];
  const previewSkills = preview?.skills ?? detail.skills;
  const previewRole = preview?.roles?.length
    ? preview.roles.join(" / ")
    : `${profile.detailRole} / ${profile.role}`;

  return (
    <S.Page>
      <S.Content>
        <S.Header>
          <S.PageTitle>마이페이지</S.PageTitle>
          <S.SettingsButton aria-label="설정" type="button">
            <Icon name="settings" size={27} weight="bold" />
          </S.SettingsButton>
        </S.Header>
        <S.ProfileSection>
          <S.ProfilePhotoPlaceholder>
            {isUniversityUnverified ? (
              <S.LockedPhotoContent>
                <Icon name="lock" size={24} weight="regular" />
                <span>인증 후 표시</span>
              </S.LockedPhotoContent>
            ) : (
              <>
                <Icon name="image" size={38} weight="regular" />
                <span>프로필 사진</span>
                <small>
                  or <u>browse files</u>
                </small>
              </>
            )}
          </S.ProfilePhotoPlaceholder>
          <S.ProfileInfo>
            <S.Name>{preview?.name ?? profile.name}</S.Name>
            <S.DetailRow>
              <span>학과/학년</span>
              <strong>
                {isUniversityUnverified ? (
                  <S.LockedProfileValue>
                    <Icon name="lock" size={13} weight="regular" />
                    인증 후 표시
                  </S.LockedProfileValue>
                ) : (
                  <>
                    {preview?.department ?? "컴퓨터과학부"}{" "}
                    {preview?.grade ?? "3학년"}
                  </>
                )}
              </strong>
            </S.DetailRow>
            <S.DetailRow>
              <span>분야/역할</span>
              <strong>
                {isUniversityUnverified ? (
                  <S.LockedProfileValue>
                    <Icon name="lock" size={13} weight="regular" />
                    인증 후 표시
                  </S.LockedProfileValue>
                ) : (
                  previewRole
                )}
              </strong>
            </S.DetailRow>
          </S.ProfileInfo>
        </S.ProfileSection>
        <S.IntroductionSection>
            <S.FieldLabel>자기소개</S.FieldLabel>
            <S.Introduction>
              {isUniversityUnverified ? (
                <S.LockedProfileValue>
                  <Icon name="lock" size={13} weight="regular" />
                  인증 후 표시
                </S.LockedProfileValue>
              ) : (
                profile.introduction
              )}
            </S.Introduction>
        </S.IntroductionSection>
        <S.ProfileActions>
          <S.EditButton
            $locked={isUniversityUnverified}
            aria-label={
              isUniversityUnverified
                ? "프로필 편집, 학교 인증 필요"
                : "프로필 편집"
            }
            disabled={isUniversityUnverified}
            onClick={() => navigate("/my-profile/edit", { state: preview })}
            type="button"
          >
            <Icon
              name={isUniversityUnverified ? "lock" : "edit"}
              size={23}
              weight={isUniversityUnverified ? "regular" : "bold"}
            />
            프로필 편집
          </S.EditButton>
          <S.ShareButton
            $locked={isUniversityUnverified}
            aria-label={
              isUniversityUnverified
                ? "프로필 공유, 학교 인증 필요"
                : "프로필 공유"
            }
            disabled={isUniversityUnverified}
            type="button"
          >
            <Icon
              name={isUniversityUnverified ? "lock" : "share"}
              size={25}
              weight="regular"
            />
          </S.ShareButton>
        </S.ProfileActions>
        {isUniversityUnverified ? (
          <S.ProfileVerificationSection>
            <S.ProfileVerificationCard>
              <S.ProfileVerificationMeta>
                <S.ProfileVerificationBadge>인증 필요</S.ProfileVerificationBadge>
                <span>포털 로그인 1분</span>
              </S.ProfileVerificationMeta>
              <S.ProfileVerificationTitle>
                학교 인증을 하면 팀에 지원할 수 있어요
              </S.ProfileVerificationTitle>
              <S.ProfileVerificationDescription>
                인증하면 포트폴리오·내 팀·스크랩과 프로필 공유가 열리고, 같은
                학교 팀 추천을 받을 수 있어요.
              </S.ProfileVerificationDescription>
              <S.ProfileVerificationButton
                onClick={() => setIsVerificationModalOpen(true)}
                type="button"
              >
                학교 인증하기
              </S.ProfileVerificationButton>
            </S.ProfileVerificationCard>
          </S.ProfileVerificationSection>
        ) : (
          <>
            <S.Metrics aria-label="내 프로필 활동 정보">
              <S.Metric>
                <span>
                  협업 경험<strong>{profile.projectCount}회</strong>
                </span>
              </S.Metric>
              <S.Metric $primary>
                <span>
                  받은 제안<strong>3건</strong>
                </span>
              </S.Metric>
              <S.Metric>
                <span>
                  받은 추천<strong>{profile.recommendationCount}</strong>
                </span>
              </S.Metric>
            </S.Metrics>
            <S.SkillSection>
              <S.SkillList aria-label="보유 기술">
                {previewSkills.map((skill, index) => (
                  <S.Skill $index={index} key={skill}>
                    {getSkillIcon(skill) && <img alt="" src={getSkillIcon(skill)} />}
                    {skill}
                  </S.Skill>
                ))}
              </S.SkillList>
            </S.SkillSection>
          </>
        )}
        <S.TabList role="tablist">
          <S.Tab
            $active={activeTab === "portfolio"}
            aria-label={isUniversityUnverified ? "포트폴리오, 학교 인증 필요" : undefined}
            aria-selected={activeTab === "portfolio"}
            disabled={isUniversityUnverified}
            onClick={() => setActiveTab("portfolio")}
            role="tab"
            type="button"
          >
            포트폴리오 {!isUniversityUnverified && detail.portfolios.length}
            {isUniversityUnverified && (
              <Icon name="lock" size={13} weight="regular" />
            )}
          </S.Tab>
          <S.Tab
            $active={activeTab === "teams"}
            aria-label={isUniversityUnverified ? "내 팀, 학교 인증 필요" : undefined}
            aria-selected={activeTab === "teams"}
            disabled={isUniversityUnverified}
            onClick={() => setActiveTab("teams")}
            role="tab"
            type="button"
          >
            내 팀 {!isUniversityUnverified && 2}
            {isUniversityUnverified && (
              <Icon name="lock" size={13} weight="regular" />
            )}
          </S.Tab>
          <S.Tab
            $active={activeTab === "scraps"}
            aria-label={isUniversityUnverified ? "스크랩, 학교 인증 필요" : undefined}
            aria-selected={activeTab === "scraps"}
            disabled={isUniversityUnverified}
            onClick={() => setActiveTab("scraps")}
            role="tab"
            type="button"
          >
            스크랩 {!isUniversityUnverified && 8}
            {isUniversityUnverified && (
              <Icon name="lock" size={13} weight="regular" />
            )}
          </S.Tab>
        </S.TabList>
        {activeTab === "portfolio" && (
          <S.TabContent>
            {isUniversityUnverified ? (
              <S.LockedPortfolioCard>
                <S.LockedPortfolioIcon>
                  <Icon name="lock" size={23} weight="regular" />
                </S.LockedPortfolioIcon>
                <S.LockedPortfolioTitle>
                  인증하면 포트폴리오를 만들 수 있어요
                </S.LockedPortfolioTitle>
                <S.LockedPortfolioDescription>
                  활동 사진 6장과 한 줄 캡션으로 나를 소개하는 공간이에요.
                  <br />
                  학교 인증을 마치면 바로 열려요.
                </S.LockedPortfolioDescription>
              </S.LockedPortfolioCard>
            ) : (
              <>
                <S.PortfolioHeader>
                  <S.PortfolioExposure>프로필 노출<em>{detail.portfolios.length}</em><span>/ 6</span></S.PortfolioExposure>
                  <S.PortfolioHeaderButtons>
                    <S.portfolioManageButton onClick={() => navigate("/my-profile/potfoliomanage", { state: preview })}
                    type="button">관리</S.portfolioManageButton>
                    <S.portfolioAddButton onClick={() => navigate("/my-profile/portfolioadd", { state: preview })}
                    type="button">+ 추가</S.portfolioAddButton>
                  </S.PortfolioHeaderButtons>
                </S.PortfolioHeader>
                <S.FeaturedPortfolio
                  onClick={() => navigate(`/giut-hub/${profile.profileNumber}/portfolio/1`)}
                  type="button"
                >
                  <S.FeaturedImage>
                    <Icon name="image" size={18} weight="regular" />
                    <span>사진</span>
                    <small>
                      or <u>browse files</u>
                    </small>
                  </S.FeaturedImage>
                  <S.PortfolioCopy>
                    <S.RepresentativeLabel>대표 프로젝트</S.RepresentativeLabel>
                    <strong>{detail.portfolios[0].title}</strong>
                    <small>{portfolioPeriods[0]}</small>
                  </S.PortfolioCopy>
                  <Icon name="caret-right" size={23} weight="bold" />
                </S.FeaturedPortfolio>
                <S.PortfolioList>
                  {detail.portfolios.slice(1).map((item, index) => (
                    <S.PortfolioItem
                      key={item.title}
                      onClick={() =>
                        navigate(`/giut-hub/${profile.profileNumber}/portfolio/${index + 2}`)
                      }
                      type="button"
                    >
                      <S.ListDot />
                      <S.PortfolioCopy>
                        <strong>{item.title}</strong>
                        <small>{portfolioPeriods[index + 1]}</small>
                      </S.PortfolioCopy>
                      <Icon name="caret-right" size={22} weight="bold" />
                    </S.PortfolioItem>
                  ))}
                </S.PortfolioList>
              </>
            )}
          </S.TabContent>
        )}
        {activeTab === "teams" && (
          <S.TabContent>
            <S.SimpleList>
              <S.SimpleItem>
                <S.ListDot />
                <S.SimpleCopy>
                  <strong>데이터로 서울을</strong>
                  <small>팀장 · 3/5명 · 새 지원 3건</small>
                </S.SimpleCopy>
              </S.SimpleItem>
              <S.SimpleItem>
                <S.ListDot />
                <S.SimpleCopy>
                  <strong>ESG 캠페인 프로젝트</strong>
                  <small>팀원 · 4/4명 · 진행 중</small>
                </S.SimpleCopy>
              </S.SimpleItem>
            </S.SimpleList>
          </S.TabContent>
        )}
        {activeTab === "scraps" && (
          <S.ScrapContent>
            <S.ScrapFilterList aria-label="스크랩 분류">
              {(
                [
                  ["all", "전체 8"],
                  ["posts", "게시물 5"],
                  ["teams", "팀 3"],
                ] as const
              ).map(([value, label]) => (
                <S.ScrapFilterButton
                  $active={scrapFilter === value}
                  aria-pressed={scrapFilter === value}
                  key={value}
                  onClick={() => setScrapFilter(value)}
                  type="button"
                >
                  {label}
                </S.ScrapFilterButton>
              ))}
            </S.ScrapFilterList>
            {scrapFilter !== "teams" && (
              <S.ScrapGroup>
                <S.ScrapGroupTitle>
                  <S.ScrapGroupLabel>
                    <span />
                    게시물 <em>5</em>
                  </S.ScrapGroupLabel>
                  <S.ViewAllButton type="button">
                    전체보기 <Icon name="caret-right" size={15} weight="bold" />
                  </S.ViewAllButton>
                </S.ScrapGroupTitle>
                <S.ScrapCardList>
                  {scrapPosts.map((post) => (
                    <S.ScrapPostCard key={post.title}>
                      <S.ScrapThumbnail $tone={post.tone} />
                      <S.ScrapPostCopy>
                        <span>
                          <S.ScrapCategory $tone={post.tone}>
                            {post.category}
                          </S.ScrapCategory>
                          <small>{post.savedAt}</small>
                        </span>
                        <strong>{post.title}</strong>
                        <p>{post.organization}</p>
                      </S.ScrapPostCopy>
                      <S.ScrapPostAction>
                        <b>{post.deadline}</b>
                        <Icon name="bookmark" size={18} weight="fill" />
                      </S.ScrapPostAction>
                    </S.ScrapPostCard>
                  ))}
                </S.ScrapCardList>
              </S.ScrapGroup>
            )}
            {scrapFilter !== "posts" && (
              <S.ScrapGroup>
                <S.ScrapGroupTitle>
                  <S.ScrapGroupLabel $team>
                    <span />팀 <em>3</em>
                  </S.ScrapGroupLabel>
                  <S.ViewAllButton type="button">
                    전체보기 <Icon name="caret-right" size={15} weight="bold" />
                  </S.ViewAllButton>
                </S.ScrapGroupTitle>
                <S.ScrapCardList>
                  {scrapTeams.map((team) => (
                    <S.ScrapTeamCard key={team.title}>
                      <S.TeamThumbnail>
                        <Icon name="user" size={24} weight="regular" />
                      </S.TeamThumbnail>
                      <S.ScrapTeamCopy>
                        <span>
                          <S.TeamBadge>
                            <Icon name="users" size={13} weight="regular" />팀
                          </S.TeamBadge>
                          <small>{team.status}</small>
                        </span>
                        <strong>{team.title}</strong>
                        <p>{team.detail}</p>
                      </S.ScrapTeamCopy>
                      <S.ScrapTeamAction>
                        <Icon name="bookmark" size={18} weight="fill" />
                        <Icon name="caret-right" size={17} weight="bold" />
                      </S.ScrapTeamAction>
                    </S.ScrapTeamCard>
                  ))}
                </S.ScrapCardList>
              </S.ScrapGroup>
            )}
          </S.ScrapContent>
        )}
      </S.Content>
      <Modal
        description="같은 학교 학생끼리 안전하게 팀을 만들기 위해, 기웃허브와 팀 지원은 학교 인증을 마친 뒤 이용할 수 있어요. 1분이면 끝나요."
        emphasizeDescription
        icon={<Icon name="lock" size={22} weight="regular" />}
        onClose={() => setIsVerificationModalOpen(false)}
        open={isVerificationModalOpen}
        primaryAction={{
          label: "학교 인증하기",
          onClick: () => navigate("/student-verification"),
        }}
        secondaryAction={{
          label: "다음에 하기",
          onClick: () => setIsVerificationModalOpen(false),
        }}
        title="학교 인증 후 볼 수 있어요"
      />
      <BottomNavigation
        activeKey="mypage"
        items={navigationItems}
        onChange={(key) => {
          if (key === "home") navigate("/home");
          if (key === "hub") navigate("/giut-hub");
          if (key === "chat") navigate("/chat");
        }}
      />
    </S.Page>
  );
}
