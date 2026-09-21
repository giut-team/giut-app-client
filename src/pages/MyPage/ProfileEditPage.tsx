import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { Icon } from "../../components/icons";
import { Input } from "../../components/Input";
import { PageHeader } from "../../components/PageHeader";
import { Textarea } from "../../components/Textarea";
import { S } from "./ProfileEditPage.styles";

const roleCategories = ["개발", "디자인", "기획", "데이터", "마케팅", "기타"];
const roleOptions = ["프론트엔드", "백엔드", "풀스택", "모바일 앱 개발", "임베디드", "게임 개발", "AI/머신러닝 개발", "데브옵스"];
const roleTechnologyOptions = {
  frontend: {
    frameworks: ["React", "Next.js", "Vue.js", "Svelte", "JavaScript", "TypeScript"],
    tools: ["Figma", "Git", "VS Code", "Supabase", "Firebase", "Vercel"],
    interests: ["웹 서비스", "모바일 웹", "반응형 웹", "웹 접근성", "성능 최적화"],
  },
  backend: {
    frameworks: ["Spring Boot", "Node.js", "NestJS", "Django", "FastAPI", "Java", "Python"],
    tools: ["MySQL", "PostgreSQL", "Redis", "Docker", "AWS", "Git"],
    interests: ["REST API", "데이터베이스", "클라우드", "서버 보안", "성능 최적화"],
  },
};
const recommendedSkillsByRole: Record<string, string[]> = {
  "프론트엔드": ["React", "TypeScript", "JavaScript", "Next.js", "Vue.js", "Figma", "Git"],
  "백엔드": ["Spring Boot", "Java", "MySQL", "Docker", "Node.js", "PostgreSQL", "Redis", "MongoDB", "Kafka", "Kubernetes", "AWS", "Linux", "Grafana"],
  "풀스택": ["React", "Spring Boot", "TypeScript", "MySQL", "Docker", "Git"],
  "데이터 분석": ["Python", "SQL", "Pandas", "Tableau", "Excel · 함수", "Power BI", "R"],
};
const defaultRecommendedSkills = ["Python", "SQL", "Pandas", "React", "TypeScript", "Tableau", "Excel · 함수"];
const interestCategories = ["IT·과학", "경영·경제", "인문·사회", "예술·디자인", "기타"];
const interestCategoryOptions: Record<string, string[]> = { "IT·과학": ["데이터", "인공지능", "소프트웨어", "IT 서비스", "정보 보안"], "경영·경제": ["창업", "브랜딩", "마케팅", "금융"], "인문·사회": ["정책", "교육", "사회 문제", "문화"], "예술·디자인": ["UI/UX", "영상", "그래픽", "전시"], 기타: ["스포츠", "환경", "봉사", "여행"] };

type ProfileEditDraft = {
  interests?: string[];
  roles?: string[];
  skills?: string[];
};

type ProfileStatus = "팀 찾는 중" | "포폴 쌓는 중" | "지금은 쉬는 중";

export function ProfileEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const draft = location.state as ProfileEditDraft | null;
  const [name, setName] = useState("김민재");
  const [department, setDepartment] = useState("컴퓨터과학부");
  const [grade, setGrade] = useState("3학년");
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>("팀 찾는 중");
  const [roles, setRoles] = useState<string[]>(draft?.roles ?? []);
  const [isDepartmentSheetOpen, setIsDepartmentSheetOpen] = useState(false);
  const [isGradeSheetOpen, setIsGradeSheetOpen] = useState(false);
  const [isStatusSheetOpen, setIsStatusSheetOpen] = useState(false);
  const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false);
  const [isInterestSheetOpen, setIsInterestSheetOpen] = useState(false);
  const [interests, setInterests] = useState<string[]>(draft?.interests ?? []);
  const [skills, setSkills] = useState<string[]>(draft?.skills ?? []);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [introduction, setIntroduction] = useState("AI로 더 편리한 캠퍼스 서비스를 만들고 싶어요. 주말에는 데이터 시각화 프로젝트를 진행합니다.");
  const [isPublic, setIsPublic] = useState(true);

  const removeRole = (role: string) => setRoles((current) => current.filter((item) => item !== role));
  const removeInterest = (interest: string) => setInterests((current) => current.filter((item) => item !== interest));
  const removeSkill = (skill: string) => setSkills((current) => current.filter((item) => item !== skill));
  const toggleSkill = (skill: string) => setSkills((current) => current.includes(skill) ? current.filter((item) => item !== skill) : current.length < 10 ? [...current, skill] : current);
  const recommendedSkills = recommendedSkillsByRole[roles[0]] ?? defaultRecommendedSkills;
  const primaryRecommendations = recommendedSkills.slice(0, 4);
  const moreRecommendations = recommendedSkills.slice(4);

  return (
    <S.Page>
      <S.Content>
        <PageHeader centerTitle onBack={() => navigate(-1)} rightContent={<S.PreviewButton type="button"><Icon name="eye" size={16} weight="regular" />미리보기</S.PreviewButton>} title="프로필 편집" />
        <S.EditBody>
          <S.PhotoArea><S.PhotoPlaceholder><Icon name="image" size={34} weight="regular" /><span>사진</span><small>or <u>browse files</u></small></S.PhotoPlaceholder><S.PhotoEditButton aria-label="프로필 사진 변경" type="button"><Icon name="image" size={18} weight="regular" /></S.PhotoEditButton><button type="button">프로필 사진 편집</button></S.PhotoArea>
          <S.SectionTitle>기본 정보</S.SectionTitle>
          <S.Field><label htmlFor="profile-name">이름</label><Input id="profile-name" onChange={(event) => setName(event.target.value)} value={name} /></S.Field>
          <S.Field><label>학과</label><S.SelectField onClick={() => setIsDepartmentSheetOpen(true)} type="button">{department} <Icon name="caret-right" size={18} weight="regular" /></S.SelectField></S.Field>
          <S.Field><label>학년</label><S.SelectField onClick={() => setIsGradeSheetOpen(true)} type="button">{grade} <Icon name="caret-right" size={18} weight="regular" /></S.SelectField></S.Field>
          <S.Field><label>학번</label><S.StudentNumber><strong>20221234</strong><span><Icon name="check" size={12} weight="bold" />인증 완료</span></S.StudentNumber></S.Field>
          <S.RoleSection><S.RoleHeading><span><strong>내 역할</strong><small>최대 3개까지 선택할 수 있어요</small></span><Icon name="caret-right" size={18} weight="regular" /></S.RoleHeading><S.RoleChipList>{roles.map((role) => <S.RoleChip key={role}>{role}<button aria-label={`${role} 삭제`} onClick={() => removeRole(role)} type="button">×</button></S.RoleChip>)}{roles.length < 3 && <S.AddRoleButton onClick={() => setIsRoleSheetOpen(true)} type="button">+ 추가하기</S.AddRoleButton>}</S.RoleChipList></S.RoleSection>
          <S.FollowupSection><S.RoleHeading><span><strong>관심 분야</strong><small>최대 3개까지 선택할 수 있어요</small></span><Icon name="caret-right" size={18} weight="regular" /></S.RoleHeading><S.RoleChipList>{interests.map((interest) => <S.RoleChip key={interest}>{interest}<button aria-label={`${interest} 삭제`} onClick={() => removeInterest(interest)} type="button">×</button></S.RoleChip>)}{interests.length < 3 && <S.AddRoleButton onClick={() => setIsInterestSheetOpen(true)} type="button">+ 추가하기</S.AddRoleButton>}</S.RoleChipList></S.FollowupSection>
          <S.FollowupSection><S.SectionHeading>현재 상태</S.SectionHeading><S.StatusSelectButton onClick={() => setIsStatusSheetOpen(true)} type="button"><S.SelectedRadio /> <span><strong>{profileStatus}</strong><small>{profileStatus === "팀 찾는 중" ? "기웃허브 상단에 노출돼요" : profileStatus === "포폴 쌓는 중" ? "제안은 받지만 검토 후 결정해요" : "검색 결과에서 잠시 숨겨요"}</small></span><Icon name="caret-right" size={18} weight="regular" /></S.StatusSelectButton></S.FollowupSection>
          <S.FollowupSection><S.SectionHeading>기술 스택</S.SectionHeading><S.SectionDescription>최대 10개까지 선택할 수 있어요</S.SectionDescription><S.SkillSearch><Icon name="search" size={19} weight="regular" /><input aria-label="기술 스택 검색" placeholder="기술 스택 검색 (예: Python)" /></S.SkillSearch>{skills.length > 0 && <S.RoleChipList>{skills.map((skill) => <S.RoleChip key={skill}>{skill}<button aria-label={`${skill} 삭제`} onClick={() => removeSkill(skill)} type="button">×</button></S.RoleChip>)}</S.RoleChipList>}<S.RecommendationHeader><S.RecommendationLabel>추천</S.RecommendationLabel></S.RecommendationHeader><S.SkillRecommendList>{primaryRecommendations.map((skill) => <S.RecommendSkill $selected={skills.includes(skill)} key={skill} onClick={() => toggleSkill(skill)} type="button">{skill}</S.RecommendSkill>)}<S.AddRoleButton type="button">+ 직접 입력</S.AddRoleButton>{moreRecommendations.length > 0 && <S.MoreRecommendationButton aria-expanded={showRecommendations} onClick={() => setShowRecommendations((current) => !current)} type="button">{showRecommendations ? "추천 접기" : "더보기"}</S.MoreRecommendationButton>}</S.SkillRecommendList>{showRecommendations && <S.ExpandedRecommendationList>{moreRecommendations.map((skill) => <S.ExpandedRecommendationButton $selected={skills.includes(skill)} key={skill} onClick={() => toggleSkill(skill)} type="button">{skills.includes(skill) && <Icon name="check" size={15} weight="bold" />}{skill}</S.ExpandedRecommendationButton>)}</S.ExpandedRecommendationList>}</S.FollowupSection>
          <S.FollowupSection><S.IntroductionHeading><S.SectionHeading>자기소개</S.SectionHeading><span>{introduction.length} / 200</span></S.IntroductionHeading><Textarea maxLength={200} onChange={(event) => setIntroduction(event.target.value)} value={introduction} /></S.FollowupSection>
          <S.VisibilitySection><span><strong>프로필 공개</strong><small>기웃허브 검색 결과에 노출됩니다</small></span><S.ToggleButton $active={isPublic} aria-pressed={isPublic} onClick={() => setIsPublic((current) => !current)} type="button"><i /></S.ToggleButton></S.VisibilitySection>
        </S.EditBody>
      </S.Content>
      <S.SaveBar><S.SaveButton onClick={() => navigate("/my-profile")} type="button">저장하기</S.SaveButton></S.SaveBar>
      <RoleSelectSheet onClose={() => setIsRoleSheetOpen(false)} onSelectDetail={(role) => navigate(`/my-profile/edit/roles/${role === "프론트엔드" ? "frontend" : "backend"}`, { state: { interests, roles, skills } satisfies ProfileEditDraft })} open={isRoleSheetOpen} roles={roles} setRoles={setRoles} />
      <InterestSelectSheet interests={interests} onClose={() => setIsInterestSheetOpen(false)} open={isInterestSheetOpen} setInterests={setInterests} />
      <DepartmentSelectSheet onClose={() => setIsDepartmentSheetOpen(false)} onSelect={setDepartment} open={isDepartmentSheetOpen} value={department} />
      <GradeSelectSheet onClose={() => setIsGradeSheetOpen(false)} onSelect={setGrade} open={isGradeSheetOpen} value={grade} />
      <StatusSelectSheet onClose={() => setIsStatusSheetOpen(false)} onSelect={setProfileStatus} open={isStatusSheetOpen} value={profileStatus} />
    </S.Page>
  );
}

const departmentsByCollege: Record<string, string[]> = {
  공과대학: ["컴퓨터과학부", "소프트웨어학과", "전기전자공학부", "기계공학과", "산업공학과", "신소재공학과"],
  경영대학: ["경영학부", "경제학부", "세무학과"],
  사회과학: ["행정학과", "사회복지학과", "국제관계학과"],
  디자인: ["산업디자인학과", "시각디자인학과"],
  자연과학: ["수학과", "통계학과", "환경원예학과"],
};
const gradeOptions = ["1학년", "2학년", "3학년", "4학년", "5학년 이상", "휴학 · 졸업유예"];
const statusOptions: { description: string; value: ProfileStatus }[] = [
  { value: "팀 찾는 중", description: "기웃허브 상단에 노출돼요" },
  { value: "포폴 쌓는 중", description: "제안은 받지만 검토 후 결정해요" },
  { value: "지금은 쉬는 중", description: "검색 결과에서 잠시 숨겨요" },
];

function DepartmentSelectSheet({ open, onClose, onSelect, value }: { open: boolean; onClose: () => void; onSelect: (department: string) => void; value: string }) {
  const [college, setCollege] = useState("공과대학");
  const [query, setQuery] = useState("");
  const departments = (departmentsByCollege[college] ?? []).filter((department) => department.includes(query));

  return <BottomSheet contentFill footer={<S.SheetFooter><S.SheetDoneButton onClick={onClose} type="button">{value} 선택</S.SheetDoneButton></S.SheetFooter>} footerVariant="action" minHeight="min(88svh, 760px)" onClose={onClose} open={open} showHeaderDivider={false} variant="compact"><S.SheetContent><S.SheetHeader><span><strong>학과 선택</strong><small>하나만 선택할 수 있어요</small></span><button aria-label="닫기" onClick={onClose} type="button"><Icon name="x" size={25} weight="regular" /></button></S.SheetHeader><S.SheetSearch><Icon name="search" size={18} weight="regular" /><input onChange={(event) => setQuery(event.target.value)} placeholder="학과 검색 (예: 컴퓨터)" value={query} /></S.SheetSearch><S.SchoolSheetLayout><S.SchoolCategoryList>{Object.keys(departmentsByCollege).map((item) => <button data-active={college === item} key={item} onClick={() => { setCollege(item); setQuery(""); }} type="button">{item}</button>)}</S.SchoolCategoryList><S.SchoolDepartmentList>{departments.map((department) => <S.SchoolDepartmentButton $selected={value === department} key={department} onClick={() => onSelect(department)} type="button">{department}{value === department && <Icon name="check" size={18} weight="bold" />}</S.SchoolDepartmentButton>)}</S.SchoolDepartmentList></S.SchoolSheetLayout></S.SheetContent></BottomSheet>;
}

function GradeSelectSheet({ open, onClose, onSelect, value }: { open: boolean; onClose: () => void; onSelect: (grade: string) => void; value: string }) {
  return <BottomSheet footer={<S.SheetFooter><S.SheetDoneButton onClick={onClose} type="button">{value} 선택</S.SheetDoneButton></S.SheetFooter>} footerVariant="action" minHeight="min(62svh, 610px)" onClose={onClose} open={open} showHeaderDivider={false} variant="compact"><S.SheetHeader><span><strong>학년 선택</strong><small>하나만 선택할 수 있어요</small></span><button aria-label="닫기" onClick={onClose} type="button"><Icon name="x" size={25} weight="regular" /></button></S.SheetHeader><S.SingleChoiceList>{gradeOptions.map((grade) => <S.SingleChoiceButton $selected={grade === value} key={grade} onClick={() => onSelect(grade)} type="button"><span>{grade === value && <Icon name="check" size={13} weight="bold" />}</span>{grade}</S.SingleChoiceButton>)}</S.SingleChoiceList></BottomSheet>;
}

function StatusSelectSheet({ open, onClose, onSelect, value }: { open: boolean; onClose: () => void; onSelect: (status: ProfileStatus) => void; value: ProfileStatus }) {
  return <BottomSheet footer={<S.SheetFooter><S.SheetDoneButton onClick={onClose} type="button">{value}으로 설정</S.SheetDoneButton></S.SheetFooter>} footerVariant="action" minHeight="min(51svh, 500px)" onClose={onClose} open={open} showHeaderDivider={false} variant="compact"><S.SheetHeader><span><strong>현재 상태</strong><small>상태에 따라 검색 노출이 달라져요</small></span><button aria-label="닫기" onClick={onClose} type="button"><Icon name="x" size={25} weight="regular" /></button></S.SheetHeader><S.StatusChoiceList>{statusOptions.map((status) => <S.StatusChoiceButton $selected={status.value === value} key={status.value} onClick={() => onSelect(status.value)} type="button"><span>{status.value === value && <Icon name="check" size={13} weight="bold" />}</span><strong>{status.value}</strong><small>{status.description}</small></S.StatusChoiceButton>)}</S.StatusChoiceList></BottomSheet>;
}

function RoleSelectSheet({ open, onClose, roles, setRoles, onSelectDetail }: { open: boolean; onClose: () => void; roles: string[]; setRoles: React.Dispatch<React.SetStateAction<string[]>>; onSelectDetail: (role: string) => void }) {
  const [category, setCategory] = useState("개발");
  const toggleRole = (role: string) => {
    setRoles((current) => current.includes(role) ? current.filter((item) => item !== role) : current.length < 3 ? [...current, role] : current);
  };
  const handleDone = () => {
    const selectedRole = roles.at(-1);

    if (selectedRole) onSelectDetail(selectedRole);
    else onClose();
  };

  return (
    <BottomSheet
      contentFill
      footer={<S.SheetFooter><S.SelectedRoles>선택한 역할 {roles.length}/3<S.RoleChipList>{roles.map((role) => <S.RoleChip key={role}>{role}<button aria-label={`${role} 삭제`} onClick={() => toggleRole(role)} type="button">×</button></S.RoleChip>)}</S.RoleChipList></S.SelectedRoles><S.SheetDoneButton onClick={handleDone} type="button">완료</S.SheetDoneButton></S.SheetFooter>}
      footerVariant="action"
      minHeight="min(84svh, 700px)"
      onClose={onClose}
      open={open}
      showHeaderDivider={false}
      variant="compact"
    >
      <S.SheetContent>
        <S.SheetHeader><span><strong>내 역할 선택</strong><small>최대 3개까지 선택할 수 있어요</small></span><button aria-label="닫기" onClick={onClose} type="button"><Icon name="x" size={25} weight="regular" /></button></S.SheetHeader>
        <S.RoleSheetLayout>
          <S.CategoryList>{roleCategories.map((item) => <button data-active={category === item} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}</S.CategoryList>
          <S.RoleOptionList>{category === "개발" ? roleOptions.map((role) => { const selected = roles.includes(role); return <S.RoleOption $selected={selected} key={role} onClick={() => toggleRole(role)} type="button"><span>{selected && <Icon name="check" size={13} weight="bold" />}</span>{role}</S.RoleOption>; }) : <S.EmptyRole>선택할 수 있는 역할을 준비하고 있어요.</S.EmptyRole>}</S.RoleOptionList>
        </S.RoleSheetLayout>
      </S.SheetContent>
    </BottomSheet>
  );
}

function InterestSelectSheet({ open, onClose, interests, setInterests }: { open: boolean; onClose: () => void; interests: string[]; setInterests: React.Dispatch<React.SetStateAction<string[]>> }) {
  const [category, setCategory] = useState("IT·과학");
  const toggleInterest = (interest: string) => setInterests((current) => current.includes(interest) ? current.filter((item) => item !== interest) : current.length < 3 ? [...current, interest] : current);

  return (
    <BottomSheet
      contentFill
      footer={<S.SheetFooter><S.SelectedRoles>선택한 관심 분야 {interests.length}/3<S.RoleChipList>{interests.map((interest) => <S.RoleChip key={interest}>{interest}<button aria-label={`${interest} 삭제`} onClick={() => toggleInterest(interest)} type="button">×</button></S.RoleChip>)}</S.RoleChipList></S.SelectedRoles><S.SheetDoneButton onClick={onClose} type="button">완료</S.SheetDoneButton></S.SheetFooter>}
      footerVariant="action"
      minHeight="min(76svh, 650px)"
      onClose={onClose}
      open={open}
      showHeaderDivider={false}
      variant="compact"
    >
      <S.SheetContent>
        <S.SheetHeader><span><strong>관심 분야 선택</strong><small>최대 3개까지 선택할 수 있어요</small></span><button aria-label="닫기" onClick={onClose} type="button"><Icon name="x" size={25} weight="regular" /></button></S.SheetHeader>
        <S.RoleSheetLayout>
          <S.CategoryList>{interestCategories.map((item) => <button data-active={category === item} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}</S.CategoryList>
          <S.RoleOptionList>{interestCategoryOptions[category].map((interest) => { const selected = interests.includes(interest); return <S.RoleOption $selected={selected} key={interest} onClick={() => toggleInterest(interest)} type="button"><span>{selected && <Icon name="check" size={13} weight="bold" />}</span>{interest}</S.RoleOption>; })}</S.RoleOptionList>
        </S.RoleSheetLayout>
      </S.SheetContent>
    </BottomSheet>
  );
}

export function ProfileRoleDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roleId } = useParams();
  const draft = location.state as ProfileEditDraft | null;
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const toggle = (item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  const roleType = roleId === "frontend" ? "frontend" : "backend";
  const title = roleType === "frontend" ? "프론트엔드" : "백엔드";
  const technologyOptions = roleTechnologyOptions[roleType];
  const saveSelection = () => {
    const skills = [...new Set([...(draft?.skills ?? []), ...selectedFrameworks, ...selectedTools])];
    const interests = [...new Set([...(draft?.interests ?? []), ...selectedInterests])];

    navigate("/my-profile/edit", {
      state: { interests, roles: draft?.roles ?? [], skills } satisfies ProfileEditDraft,
    });
  };

  return <S.Page><S.Content><PageHeader centerTitle onBack={() => navigate(-1)} rightContent={<S.ResetButton onClick={() => { setSelectedFrameworks([]); setSelectedTools([]); setSelectedInterests([]); }} type="button">초기화</S.ResetButton>} title={title} /><S.DetailBody><S.DetailHint>세부 기술이나 관심 분야를 선택해보세요. (선택 사항)</S.DetailHint><S.DetailSection><h2>주요 프레임워크 / 라이브러리</h2><S.SelectChipList>{technologyOptions.frameworks.map((item) => <S.SelectChip $selected={selectedFrameworks.includes(item)} key={item} onClick={() => toggle(item, setSelectedFrameworks)} type="button">{selectedFrameworks.includes(item) && <Icon name="check" size={14} weight="bold" />}{item}</S.SelectChip>)}</S.SelectChipList></S.DetailSection><S.DetailSection><h2>관련 도구</h2><S.SelectChipList>{technologyOptions.tools.map((item) => <S.SelectChip $selected={selectedTools.includes(item)} key={item} onClick={() => toggle(item, setSelectedTools)} type="button">{selectedTools.includes(item) && <Icon name="check" size={14} weight="bold" />}{item}</S.SelectChip>)}</S.SelectChipList></S.DetailSection><S.DetailSection><h2>관심 분야 <small>선택</small></h2><S.SelectChipList>{technologyOptions.interests.map((item) => <S.SelectChip $selected={selectedInterests.includes(item)} key={item} onClick={() => toggle(item, setSelectedInterests)} type="button">{selectedInterests.includes(item) && <Icon name="check" size={14} weight="bold" />}{item}</S.SelectChip>)}</S.SelectChipList></S.DetailSection></S.DetailBody></S.Content><S.SaveBar><S.SaveButton onClick={saveSelection} type="button">선택 완료</S.SaveButton></S.SaveBar></S.Page>;
}
