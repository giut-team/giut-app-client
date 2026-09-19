import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import designerFemale from "../../assets/default_image/designer-female.png";
import designerMale from "../../assets/default_image/designer-male.png";
import developerFemale from "../../assets/default_image/developer-female.png";
import developerMale from "../../assets/default_image/developer-male.png";
import marketingFemale from "../../assets/default_image/marketing-female.png";
import marketingMale from "../../assets/default_image/marketing-male.png";
import plannerFemale from "../../assets/default_image/planner-female.png";
import plannerMale from "../../assets/default_image/planner-male.png";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { BottomNavigation } from "../../components/BottomNavigation/BottomNavigation";
import { Icon } from "../../components/icons";
import { PillButton } from "../../components/PillButton";
import { S } from "./GiutHubPage.styles";

type Category = "전체" | "기획" | "디자인" | "개발" | "마케팅";
type FilterName = "포지션" | "학과 및 학년" | "현재 상태";
type Position = "기획" | "디자인" | "개발" | "마케팅";
type TeamStatus = "전체" | "바로 합류 가능" | "제안 검토 중" | "일정 조율 필요";
type Grade = 1 | 2 | 3 | 4;
type DepartmentCategory = "전체" | "IT·공학" | "경영·경제" | "디자인";

export const ProfileStatus = {
  LookingForTeam: "팀 찾는 중",
  AvailableToJoin: "바로 합류 가능",
  ReviewingOffers: "제안 검토 중",
  SchedulingNeeded: "일정 조율 필요",
} as const;

export type ProfileStatus = (typeof ProfileStatus)[keyof typeof ProfileStatus];

export type GiutHubProfile = {
  profileNumber: number;
  id: string;
  category: Exclude<Category, "전체">;
  role: Position;
  detailRole: string;
  status: ProfileStatus;
  name: string;
  available: boolean;
  summary: string;
  introduction: string;
  tags: string[];
  projectCount: number;
  lastActiveAt: string;
  lastResponseAt: string;
  recommendationCount: number;
  avatarFallback: string;
  avatarTone: "blue" | "purple" | "orange" | "green";
  avatarSrc?: string;
};

const categories: Category[] = ["전체", "기획", "디자인", "개발", "마케팅"];
const positionOptions: { value: Position; icon: "edit" | "palette" | "code" | "megaphone" }[] = [
  { value: "기획", icon: "edit" },
  { value: "디자인", icon: "palette" },
  { value: "개발", icon: "code" },
  { value: "마케팅", icon: "megaphone" },
];
const teamStatusOptions: { value: TeamStatus; description: string }[] = [
  { value: "전체", description: "모든 상태의 팀원" },
  { value: "바로 합류 가능", description: "지금 바로 시작할 수 있어요" },
  { value: "제안 검토 중", description: "좋은 제안이라면 확인해요" },
  { value: "일정 조율 필요", description: "시작 일정을 맞춰야 해요" },
];
const gradeOptions: { value: Grade; label: string }[] = [
  { value: 1, label: "1학년" },
  { value: 2, label: "2학년" },
  { value: 3, label: "3학년" },
  { value: 4, label: "4학년 이상" },
];
const departments: { name: string; category: DepartmentCategory }[] = [
  ["행정학과", "전체"], ["국제관계학과", "전체"], ["경제학부", "경영·경제"], ["사회복지학과", "전체"], ["세무학과", "경영·경제"], ["경영학부", "경영·경제"],
  ["전자전기컴퓨터공학부", "IT·공학"], ["화학공학과", "IT·공학"], ["기계정보공학과", "IT·공학"], ["신소재공학과", "IT·공학"], ["토목공학과", "IT·공학"],
  ["영어영문학과", "전체"], ["국어국문학과", "전체"], ["국사학과", "전체"], ["철학과", "전체"], ["중국어문화학과", "전체"], ["수학과", "전체"], ["통계학과", "전체"], ["물리학과", "전체"], ["생명과학과", "전체"], ["환경원예학과", "IT·공학"], ["융합응용화학과", "IT·공학"],
  ["건축학부 건축공학전공", "IT·공학"], ["건축학부 건축학전공", "IT·공학"], ["도시공학과", "IT·공학"], ["교통공학과", "IT·공학"], ["조경학과", "디자인"], ["도시행정학과", "전체"], ["도시사회학과", "전체"], ["공간정보공학과", "IT·공학"], ["환경공학부", "IT·공학"], ["소방방재학과", "IT·공학"],
  ["음악학과", "디자인"], ["디자인학과", "디자인"], ["조각학과", "디자인"], ["스포츠과학과", "전체"], ["자유전공학부", "전체"], ["융합전공학부", "전체"], ["컴퓨터과학부", "IT·공학"], ["인공지능학과", "IT·공학"], ["첨단융합학부", "IT·공학"],
].map(([name, category]) => ({ name, category: category as DepartmentCategory }));
const mockRecentAccessAt = (hoursAgo: number) =>
  new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();

export const getResponseStatus = (lastActiveAt: string) => {
  const elapsedHours = Math.max(
    0,
    Math.floor((Date.now() - new Date(lastActiveAt).getTime()) / (60 * 60 * 1000)),
  );

  return {
    elapsedHours,
    isFast: elapsedHours <= 3,
    label: elapsedHours <= 3 ? "응답 빠름" : "응답 느림",
  };
};

export const giutHubProfiles: GiutHubProfile[] = [
  {
    profileNumber: 1,
    id: "minjae",
    category: "개발" as const,
    role: "개발",
    detailRole: "데이터 분석",
    status: ProfileStatus.LookingForTeam,
    name: "김민재",
    available: true,
    summary: "개발 · 컴퓨터과학부 3학년",
    introduction: "AI로 더 편리한 캠퍼스 서비스를 만들고 싶어요.\n포트폴리오 프로젝트에 관심 있어요.",
    tags: ["AI/ML", "프론트엔드"],
    projectCount: 2,
    // 마지막 답장 2시간 전: 목업 기준 '응답 빠름'으로 표시됩니다.
    lastActiveAt: mockRecentAccessAt(12),
    lastResponseAt: mockRecentAccessAt(2),
    recommendationCount: 3,
    avatarFallback: "김",
    avatarTone: "blue",
    avatarSrc: developerMale,
  },
  {
    profileNumber: 2,
    id: "seoyeon",
    category: "기획" as const,
    role: "기획",
    detailRole: "서비스 기획",
    status: ProfileStatus.AvailableToJoin,
    name: "이서연",
    available: true,
    summary: "기획 · 경영학부 3학년",
    introduction: "사용자의 문제를 쉽게 푸는 기획을 좋아해요.",
    tags: ["서비스 기획", "시장 분석"],
    projectCount: 4,
    lastActiveAt: mockRecentAccessAt(4),
    lastResponseAt: mockRecentAccessAt(1),
    recommendationCount: 5,
    avatarFallback: "이",
    avatarTone: "purple",
    avatarSrc: plannerFemale,
  },
  {
    profileNumber: 3,
    id: "jiwoo",
    category: "디자인" as const,
    role: "디자인",
    detailRole: "UX/UI 디자인",
    status: ProfileStatus.ReviewingOffers,
    name: "박지우",
    available: false,
    summary: "디자인 · 산업디자인학과 2학년",
    introduction: "아이디어를 이해하기 쉬운 경험으로 만드는 데 관심 있어요.\n다음 공모전을 천천히 둘러보고 있어요.",
    tags: ["UX/UI", "Figma"],
    projectCount: 3,
    lastActiveAt: mockRecentAccessAt(18),
    lastResponseAt: mockRecentAccessAt(8),
    recommendationCount: 2,
    avatarFallback: "박",
    avatarTone: "orange",
    avatarSrc: designerFemale,
  },
  {
    profileNumber: 4,
    id: "junseo",
    category: "개발",
    role: "개발",
    detailRole: "백엔드 개발",
    status: ProfileStatus.SchedulingNeeded,
    name: "최준서",
    available: true,
    summary: "개발 · 소프트웨어학부 2학년",
    introduction: "완성도 높은 서비스를 함께 만들 동료를 찾고 있어요.",
    tags: ["백엔드", "Spring"],
    projectCount: 3,
    lastActiveAt: mockRecentAccessAt(9),
    lastResponseAt: mockRecentAccessAt(3),
    recommendationCount: 4,
    avatarFallback: "최",
    avatarTone: "blue",
    avatarSrc: developerFemale,
  },
  {
    profileNumber: 5,
    id: "dohyun",
    category: "기획",
    role: "기획",
    detailRole: "서비스 기획",
    status: ProfileStatus.ReviewingOffers,
    name: "정도현",
    available: true,
    summary: "기획 · 행정학과 4학년",
    introduction: "팀의 방향을 함께 찾고 끝까지 실행하는 걸 좋아해요.",
    tags: ["서비스 기획", "리서치"],
    projectCount: 5,
    lastActiveAt: mockRecentAccessAt(13),
    lastResponseAt: mockRecentAccessAt(5),
    recommendationCount: 6,
    avatarFallback: "정",
    avatarTone: "purple",
    avatarSrc: plannerMale,
  },
  {
    profileNumber: 6,
    id: "hayoon",
    category: "디자인",
    role: "디자인",
    detailRole: "브랜딩",
    status: ProfileStatus.LookingForTeam,
    name: "김하윤",
    available: true,
    summary: "디자인 · 시각디자인학과 3학년",
    introduction: "브랜드의 이야기를 설득력 있는 화면으로 풀어내고 싶어요.",
    tags: ["브랜딩", "UI 디자인"],
    projectCount: 2,
    lastActiveAt: mockRecentAccessAt(2),
    lastResponseAt: mockRecentAccessAt(2),
    recommendationCount: 4,
    avatarFallback: "김",
    avatarTone: "orange",
    avatarSrc: designerMale,
  },
  {
    profileNumber: 7,
    id: "soomin",
    category: "마케팅",
    role: "마케팅",
    detailRole: "콘텐츠 마케팅",
    status: ProfileStatus.AvailableToJoin,
    name: "한수민",
    available: true,
    summary: "마케팅 · 경영학부 2학년",
    introduction: "사람들의 마음을 움직이는 캠페인을 만들어 보고 싶어요.",
    tags: ["콘텐츠", "SNS 마케팅"],
    projectCount: 3,
    lastActiveAt: mockRecentAccessAt(12),
    lastResponseAt: mockRecentAccessAt(3),
    recommendationCount: 3,
    avatarFallback: "한",
    avatarTone: "green",
    avatarSrc: marketingFemale,
  },
  {
    profileNumber: 8,
    id: "minho",
    category: "마케팅",
    role: "마케팅",
    detailRole: "데이터 마케팅",
    status: ProfileStatus.SchedulingNeeded,
    name: "이민호",
    available: false,
    summary: "마케팅 · 경제학부 3학년",
    introduction: "데이터와 아이디어를 연결하는 마케팅을 좋아합니다.",
    tags: ["데이터 분석", "광고 기획"],
    projectCount: 4,
    lastActiveAt: mockRecentAccessAt(24),
    lastResponseAt: mockRecentAccessAt(12),
    recommendationCount: 1,
    avatarFallback: "이",
    avatarTone: "green",
    avatarSrc: marketingMale,
  },
  {
    profileNumber: 9,
    id: "yujin",
    category: "기획",
    role: "기획",
    detailRole: "사업 기획",
    status: ProfileStatus.ReviewingOffers,
    name: "최유진",
    available: true,
    summary: "기획 · 경영학부 4학년",
    introduction: "아이디어를 실제 서비스로 만드는 과정에 관심이 많아요. 함께 실행할 팀원을 찾고 있어요.",
    tags: ["사업 기획", "시장 분석"],
    projectCount: 3,
    lastActiveAt: mockRecentAccessAt(2),
    lastResponseAt: mockRecentAccessAt(1),
    recommendationCount: 4,
    avatarFallback: "최",
    avatarTone: "purple",
    avatarSrc: plannerFemale,
  },
];

const profileFilterData: Record<string, { grade: Grade; department: string; teamStatus: TeamStatus }> = {
  minjae: { grade: 3, department: "컴퓨터과학부", teamStatus: "바로 합류 가능" },
  seoyeon: { grade: 3, department: "경영학부", teamStatus: "바로 합류 가능" },
  jiwoo: { grade: 2, department: "디자인학과", teamStatus: "제안 검토 중" },
  junseo: { grade: 2, department: "전자전기컴퓨터공학부", teamStatus: "일정 조율 필요" },
  dohyun: { grade: 4, department: "행정학과", teamStatus: "제안 검토 중" },
  hayoon: { grade: 3, department: "디자인학과", teamStatus: "바로 합류 가능" },
  soomin: { grade: 2, department: "경영학부", teamStatus: "바로 합류 가능" },
  minho: { grade: 3, department: "경제학부", teamStatus: "일정 조율 필요" },
  yujin: { grade: 4, department: "경영학부", teamStatus: "제안 검토 중" },
};

const navigationItems = [
  { key: "home", label: "홈", icon: "home" as const },
  { key: "hub", label: "기웃허브", icon: "users" as const },
  { key: "chat", label: "채팅", icon: "chat" as const, badge: 2 },
  { key: "mypage", label: "마이페이지", icon: "user" as const },
];

export function GiutHubPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("전체");
  const [isPositionSheetOpen, setIsPositionSheetOpen] = useState(false);
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false);
  const [isDepartmentSheetOpen, setIsDepartmentSheetOpen] = useState(false);
  const [selectedPositions, setSelectedPositions] = useState<Position[]>([]);
  const [selectedTeamStatus, setSelectedTeamStatus] = useState<TeamStatus>("전체");
  const [selectedGrades, setSelectedGrades] = useState<Grade[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [departmentCategory, setDepartmentCategory] = useState<DepartmentCategory>("전체");
  const [departmentQuery, setDepartmentQuery] = useState("");

  const visibleProfiles = useMemo(
    () => giutHubProfiles.filter((profile) => {
      const filterData = profileFilterData[profile.id];
      const matchesCategory = activeCategory === "전체" || profile.category === activeCategory;
      const matchesPosition = selectedPositions.length === 0 || selectedPositions.includes(profile.category);
      const matchesStatus = selectedTeamStatus === "전체" || filterData.teamStatus === selectedTeamStatus;
      const matchesGrade = selectedGrades.length === 0 || selectedGrades.includes(filterData.grade);
      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.includes(filterData.department);

      return matchesCategory && matchesPosition && matchesStatus && matchesGrade && matchesDepartment;
    }),
    [activeCategory, selectedDepartments, selectedGrades, selectedPositions, selectedTeamStatus],
  );

  const resetFilters = () => {
    setActiveCategory("전체");
    setSelectedPositions([]);
    setSelectedTeamStatus("전체");
    setSelectedGrades([]);
    setSelectedDepartments([]);
  };

  const togglePosition = (position: Position) => {
    setSelectedPositions((current) =>
      current.includes(position)
        ? current.filter((item) => item !== position)
        : [...current, position],
    );
  };

  const toggleGrade = (grade: Grade) => {
    setSelectedGrades((current) => current.includes(grade) ? current.filter((item) => item !== grade) : [...current, grade]);
  };

  const toggleDepartment = (department: string) => {
    setSelectedDepartments((current) => current.includes(department) ? current.filter((item) => item !== department) : [...current, department]);
  };

  const visibleDepartments = departments.filter(({ name, category }) =>
    (departmentCategory === "전체" || category === departmentCategory) && name.includes(departmentQuery.trim()),
  );

  const recommendationTitle =
    activeCategory === "전체"
      ? "이루매님에게 잘 맞는 팀원이에요"
      : `${activeCategory} 분야에서 주목받는 팀원이에요`;

  const isFilterApplied = (filter: FilterName) =>
    (filter === "포지션" && selectedPositions.length > 0) ||
    (filter === "학과 및 학년" && (selectedGrades.length > 0 || selectedDepartments.length > 0)) ||
    (filter === "현재 상태" && selectedTeamStatus !== "전체");

  return (
    <S.Page>
      <S.Content>
        <S.Hero>
          <S.HubLabel>기웃허브</S.HubLabel>
          <S.Title>
            공모전부터 창업까지,
            <br />
            함께할 팀원을 찾아보세요
          </S.Title>
          <S.ResetButton onClick={resetFilters} type="button">
            <Icon name="arrows-down-up" size={15} weight="bold" />
            필터 초기화
          </S.ResetButton>
          <S.FilterPanel aria-label="팀원 탐색 필터">
            {(["포지션", "학과 및 학년", "현재 상태"] as FilterName[]).map((filter) => (
              <S.FilterButton
                $active={isFilterApplied(filter)}
                aria-pressed={isFilterApplied(filter)}
                key={filter}
                onClick={() => {
                  if (filter === "포지션") {
                    setIsPositionSheetOpen(true);
                    return;
                  }

                  if (filter === "현재 상태") {
                    setIsStatusSheetOpen(true);
                    return;
                  }

                  if (filter === "학과 및 학년") {
                    setIsDepartmentSheetOpen(true);
                    return;
                  }
                }}
                tone="secondary"
                type="button"
                width="100%"
              >
                {filter}
              </S.FilterButton>
            ))}
          </S.FilterPanel>
          {(selectedPositions.length > 0 || selectedGrades.length > 0 || selectedDepartments.length > 0 || selectedTeamStatus !== "전체") && (
            <S.AppliedFilters aria-label="적용된 필터">
              {selectedPositions.map((position) => <S.AppliedFilter key={position} onClick={() => togglePosition(position)} type="button">{position} <span>×</span></S.AppliedFilter>)}
              {selectedGrades.map((grade) => <S.AppliedFilter key={grade} onClick={() => toggleGrade(grade)} type="button">{typeof grade === "string" ? grade : `${grade}학년`} <span>×</span></S.AppliedFilter>)}
              {selectedDepartments.map((department) => <S.AppliedFilter key={department} onClick={() => toggleDepartment(department)} type="button">{department} <span>×</span></S.AppliedFilter>)}
              {selectedTeamStatus !== "전체" && <S.AppliedFilter onClick={() => setSelectedTeamStatus("전체")} type="button">{selectedTeamStatus} <span>×</span></S.AppliedFilter>}
            </S.AppliedFilters>
          )}
        </S.Hero>

        <S.Results>
          <S.SectionTitle>{recommendationTitle}</S.SectionTitle>
          <S.CategoryList aria-label="팀원 직무 필터">
            {categories.map((category) => (
              <PillButton
                active={activeCategory === category}
                aria-pressed={activeCategory === category}
                key={category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </PillButton>
            ))}
          </S.CategoryList>

          <S.ProfileList>
            {visibleProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                onView={() => navigate(`/giut-hub/${profile.profileNumber}`)}
                profile={profile}
              />
            ))}
            {visibleProfiles.length === 0 && <S.EmptyState>선택한 분야의 팀원을 준비하고 있어요.</S.EmptyState>}
          </S.ProfileList>
        </S.Results>
      </S.Content>

      <BottomNavigation
        activeKey="hub"
        items={navigationItems}
        onChange={(key) => {
          if (key === "home") navigate("/home");
          if (key === "chat") navigate("/chat");
          if (key === "mypage") navigate("/my-team");
        }}
      />
      <BottomSheet
        footer={
          <S.PositionSheetFooter>
            <S.ViewPositionsButton onClick={() => setIsPositionSheetOpen(false)} type="button">
              {visibleProfiles.length}명 보기
            </S.ViewPositionsButton>
          </S.PositionSheetFooter>
        }
        footerVariant="action"
        minHeight="min(78svh, 560px)"
        onClose={() => setIsPositionSheetOpen(false)}
        open={isPositionSheetOpen}
        showHeaderDivider={false}
        variant="compact"
      >
        <S.PositionSheetHeader>
          <S.PositionSheetClose aria-label="닫기" onClick={() => setIsPositionSheetOpen(false)} type="button">
            <Icon name="x" size={30} weight="regular" />
          </S.PositionSheetClose>
          <S.PositionSheetTitle>포지션</S.PositionSheetTitle>
        </S.PositionSheetHeader>
        <S.PositionSheetHeading>어떤 역할을 찾고 있나요?</S.PositionSheetHeading>
        <S.PositionSheetDescription>여러 포지션을 선택할 수 있어요.</S.PositionSheetDescription>
        <S.PositionGrid aria-label="찾는 포지션 선택">
          {positionOptions.map((option) => {
            const selected = selectedPositions.includes(option.value);

            return (
              <S.PositionOption
                $selected={selected}
                aria-pressed={selected}
                key={option.value}
                onClick={() => togglePosition(option.value)}
                type="button"
              >
                {selected && <S.PositionCheck><Icon name="check" size={16} weight="bold" /></S.PositionCheck>}
                <Icon name={option.icon} size={38} weight="regular" />
                <span>{option.value}</span>
              </S.PositionOption>
            );
          })}
        </S.PositionGrid>
      </BottomSheet>
      <BottomSheet
        footer={
          <S.StatusSheetFooter>
            <S.ResetStatusButton onClick={() => setSelectedTeamStatus("전체")} type="button">
              초기화
            </S.ResetStatusButton>
            <S.ViewStatusButton onClick={() => setIsStatusSheetOpen(false)} type="button">
              결과 {visibleProfiles.length}명 보기
            </S.ViewStatusButton>
          </S.StatusSheetFooter>
        }
        footerVariant="action"
        minHeight="min(72svh, 520px)"
        onClose={() => setIsStatusSheetOpen(false)}
        open={isStatusSheetOpen}
        showHeaderDivider={false}
        variant="compact"
      >
        <S.StatusSheetHeader>
          <S.StatusSheetTitle>현재 상태</S.StatusSheetTitle>
          <S.StatusSheetClose aria-label="닫기" onClick={() => setIsStatusSheetOpen(false)} type="button">
            <Icon name="x" size={28} weight="regular" />
          </S.StatusSheetClose>
        </S.StatusSheetHeader>
        <S.StatusSheetDescription>지금 팀 활동을 시작할 수 있는 사람을 찾아보세요.</S.StatusSheetDescription>
        <S.StatusOptionList aria-label="현재 상태 선택" role="radiogroup">
          {teamStatusOptions.map((option) => {
            const selected = selectedTeamStatus === option.value;

            return (
              <S.StatusOption
                $selected={selected}
                aria-checked={selected}
                key={option.value}
                onClick={() => setSelectedTeamStatus(option.value)}
                role="radio"
                type="button"
              >
                <S.StatusRadio $selected={selected} aria-hidden="true" />
                <span>
                  <strong>{option.value}</strong>
                  <small>{option.description}</small>
                </span>
              </S.StatusOption>
            );
          })}
        </S.StatusOptionList>
      </BottomSheet>
      <BottomSheet
        footer={<S.DepartmentFooter><S.ViewStatusButton onClick={() => setIsDepartmentSheetOpen(false)} type="button">결과 {visibleProfiles.length}명 보기</S.ViewStatusButton></S.DepartmentFooter>}
        footerVariant="action"
        minHeight="min(84svh, 620px)"
        onClose={() => {
          setIsDepartmentSheetOpen(false);
        }}
        open={isDepartmentSheetOpen}
        showHeaderDivider={false}
        variant="compact"
      >
        <S.StatusSheetHeader>
          <S.StatusSheetTitle>학과 및 학년</S.StatusSheetTitle>
          <S.StatusSheetClose aria-label="닫기" onClick={() => setIsDepartmentSheetOpen(false)} type="button"><Icon name="x" size={28} weight="regular" /></S.StatusSheetClose>
        </S.StatusSheetHeader>
        {selectedGrades.length > 0 && <S.SelectedGradeList>{selectedGrades.map((grade) => <S.SelectedGrade key={grade}>{`${grade}학년`} <button aria-label={`${grade} 선택 해제`} onClick={() => toggleGrade(grade)} type="button">×</button></S.SelectedGrade>)}</S.SelectedGradeList>}
        <S.DepartmentHeading>학년</S.DepartmentHeading>
        <S.GradeGrid>
          <S.GradeButton $selected={selectedGrades.length === 0} onClick={() => setSelectedGrades([])} type="button">전체</S.GradeButton>
          {gradeOptions.map((option) => <S.GradeButton $selected={selectedGrades.includes(option.value)} key={option.value} onClick={() => toggleGrade(option.value)} type="button">{option.label}</S.GradeButton>)}
        </S.GradeGrid>
        <S.DepartmentHeading>학과</S.DepartmentHeading>
        <S.DepartmentSearch>
          <Icon name="search" size={22} weight="regular" />
          <input aria-label="학과명 검색" onChange={(event) => setDepartmentQuery(event.target.value)} placeholder="학과명 검색" value={departmentQuery} />
        </S.DepartmentSearch>
        <S.DepartmentTabs>
          {(["전체", "IT·공학", "경영·경제", "디자인"] as DepartmentCategory[]).map((category) => (
            <S.DepartmentTab $active={departmentCategory === category} key={category} onClick={() => setDepartmentCategory(category)} type="button">{category}</S.DepartmentTab>
          ))}
        </S.DepartmentTabs>
        <S.DepartmentList aria-label="학과 선택 목록">
          {visibleDepartments.map((department) => {
            const selected = selectedDepartments.includes(department.name);
            return <S.DepartmentRow $selected={selected} key={department.name} onClick={() => toggleDepartment(department.name)} type="button"><span>{selected && <Icon name="check" size={14} weight="bold" />}</span>{department.name}</S.DepartmentRow>;
          })}
        </S.DepartmentList>
      </BottomSheet>
    </S.Page>
  );
}

function ProfileCard({ profile, onView }: { profile: GiutHubProfile; onView: () => void }) {
  const responseStatus = getResponseStatus(profile.lastResponseAt);

  return (
    <S.ProfileCard>
      <S.ProfileTop>
        <S.Avatar $tone={profile.avatarTone}>
          {profile.avatarSrc ? <img alt={`${profile.name} 프로필`} src={profile.avatarSrc} /> : profile.avatarFallback}
        </S.Avatar>
        <S.ProfileIdentity>
          <S.ProfileHeader>
            <S.Name>{profile.name}</S.Name>
            <S.Availability $available={profile.available}>
              <S.AvailabilityDot $available={profile.available} />
              {profile.available ? "합류 가능" : "현재 팀을 찾고 있지 않아요"}
            </S.Availability>
          </S.ProfileHeader>
          <S.ProfileSummary>{profile.summary}</S.ProfileSummary>
        </S.ProfileIdentity>
        <S.DetailButton aria-label={`${profile.name} 프로필 보기`} onClick={onView} type="button">
          <Icon name="caret-right" size={20} weight="bold" />
        </S.DetailButton>
      </S.ProfileTop>
      <S.ProfileMeta aria-label={`${profile.name} 활동 정보`}>
        <span>
          <Icon name="users" size={16} weight="regular" />
          협업 경험 {profile.projectCount}회
        </span>
        <S.ResponseMeta
          $fast={responseStatus.isFast}
          aria-label={`최근 답장 ${responseStatus.elapsedHours}시간 전, ${responseStatus.label}`}
        >
          <Icon name="lightning" size={14} weight="fill" />{responseStatus.label}
        </S.ResponseMeta>
      </S.ProfileMeta>
      <S.Introduction>{profile.introduction}</S.Introduction>
      <S.CardFooter>
        <S.TagList aria-label={`${profile.name} 관심 분야`}>
          {profile.tags.map((tag) => <S.Tag key={tag}>#{tag}</S.Tag>)}
        </S.TagList>
        <S.ProfileLink onClick={onView} type="button">프로필 보기 <Icon name="arrow-right" size={16} weight="bold" /></S.ProfileLink>
      </S.CardFooter>
    </S.ProfileCard>
  );
}
