import { PageHeader } from '../../components/PageHeader';
import { S } from './PortfolioAddPage.styles'
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import { Icon } from '../../components/icons';
import { useState } from 'react';
import { RoleSelectSheet } from "./ProfileEditPage"
import { BottomSheet } from "../../components/BottomSheet/BottomSheet";
import { Textarea } from "../../components/Textarea";

type ParticipationType = "individual" | "team";

const skillStackOptions = [
    "Python", "SQL", "Pandas", "React", "Figma", "Spring", "Java", "JavaScript",
    "TypeScript", "Node.js", "AWS", "Docker", "MySQL", "Git", "Notion", "Slack",
];
const MAX_SKILLS = 10;
const COLLAPSED_COUNT = 7;
const MAX_LINKS = 5;

export function PortfolioAddPage() {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("2026-07");
    const [endDate, setEndDate] = useState("2026-09");
    const [activeTab, setActiveTab] = useState<ParticipationType>("individual");
    const [memberCount, setMemberCount] = useState<number>(4);
    const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false);
    const [roles, setRoles] = useState<string[]>([]);
    const [skills, setSkills] = useState<string[]>([]);
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [isDirectSkillSheetOpen, setIsDirectSkillSheetOpen] = useState(false);
    const [directSkill, setDirectSkill] = useState("");
    const [description, setDescription] = useState("");
    const [projectTitle, setProjectTitle] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const [isMain, setIsMain] = useState(false);
    const [links, setLinks] = useState<string[]>([""]);


    const handleDecrease = () => {
        setMemberCount((prev) => Math.max(2, prev - 1));
    };
    const handleIncrease = () => {
        setMemberCount((prev) => prev + 1);
    };
    const removeRole = (role: string) =>
        setRoles((current) => current.filter((item) => item !== role));
    const toggleSkill = (skill: string) =>
        setSkills((current) =>
            current.includes(skill)
                ? current.filter((item) => item !== skill)
                : current.length < MAX_SKILLS
                    ? [...current, skill]
                    : current,
        );

    const addDirectSkill = () => {
        const skill = directSkill.trim();
        if (!skill || skills.includes(skill) || skills.length >= MAX_SKILLS) return;
        setSkills((current) => [...current, skill]);
        setDirectSkill("");
        setIsDirectSkillSheetOpen(false);
    };
    const updateLink = (index: number, value: string) =>
        setLinks((current) => current.map((link, i) => (i === index ? value : link)));
    const addLink = () =>
        setLinks((current) => (current.length < MAX_LINKS ? [...current, ""] : current));
    const removeLink = (index: number) =>
        setLinks((current) => current.filter((_, i) => i !== index));

    const allSkillOptions = [...new Set([...skillStackOptions, ...skills])];
    const visibleSkills = showAllSkills ? allSkillOptions : allSkillOptions.slice(0, COLLAPSED_COUNT);
    const remainingSkillCount = Math.max(0, allSkillOptions.length - COLLAPSED_COUNT);

    return (
        <S.Page>
            <S.Content>
                <PageHeader centerTitle
                    onBack={() => navigate(-1)}
                    rightContent={
                        <S.DraftSave type="button">임시저장</S.DraftSave>
                    }
                    title="포트폴리오 추가"
                />
                <S.ProjectImageContainer>
                    <S.ProjectImageLabels>
                        <S.ProjectImageTitle><strong>프로젝트 이미지</strong></S.ProjectImageTitle>
                        <S.ProjectImageDescription>최대 10장 · 첫 장이 커버</S.ProjectImageDescription>
                    </S.ProjectImageLabels>
                    <ImageUploader />
                </S.ProjectImageContainer>
                <S.ProjecTitleContainer>
                    <S.ProjectTitleLabels>
                        <strong>프로젝트명<em> *</em></strong>
                        <span>{projectTitle.length}/40</span>
                    </S.ProjectTitleLabels>
                    <S.ProjectTitleInput
                        type='text'
                        placeholder='예) 서울시 데이터 공모전 발표'
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        maxLength={40}
                    />
                </S.ProjecTitleContainer>
                <S.DurationContainer>
                    <S.DurationLabels>
                        <strong>진행 기간<em> *</em></strong>
                    </S.DurationLabels>
                    <S.DurationInput>
                        <S.DateInput
                            type="month"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)} />
                        <S.Seperator>-</S.Seperator>
                        <S.DateInput
                            type="month"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)} />
                    </S.DurationInput>
                </S.DurationContainer>
                <S.ParticipationTypeContainer>
                    <S.ParticipationTypeLabels>
                        <strong>참여 형태<em> *</em></strong>
                    </S.ParticipationTypeLabels>
                    <S.TabList>
                        <S.Tab
                            $active={activeTab === "individual"}
                            aria-selected={activeTab === "individual"}
                            onClick={() => setActiveTab("individual")}
                            role="tab"
                            type="button"
                        >
                            개인
                        </S.Tab>
                        <S.Tab
                            $active={activeTab === "team"}
                            aria-selected={activeTab === "team"}
                            onClick={() => setActiveTab("team")}
                            role="tab"
                            type="button"
                        >
                            팀
                        </S.Tab>
                    </S.TabList>
                    {activeTab === "team" && (
                        <S.TeamMemberNumber>
                            <S.TeamMemberNumberLabel>팀 인원</S.TeamMemberNumberLabel>
                            <S.CounterGroup>
                                <S.CounterButton
                                    type="button"
                                    onClick={handleDecrease}
                                    disabled={memberCount <= 2}
                                >-</S.CounterButton>
                                <S.CountText><strong>{memberCount}명</strong></S.CountText>
                                <S.CounterButton
                                    type="button"
                                    onClick={handleIncrease}
                                >+</S.CounterButton>
                            </S.CounterGroup>
                        </S.TeamMemberNumber>
                    )}
                </S.ParticipationTypeContainer>
                <S.RoleContainer>
                    <S.RoleHeading>
                        <span>
                            <strong>내 역할</strong>
                            <small>최대 3개까지 선택할 수 있어요</small>
                        </span>
                        <Icon name="caret-right" size={18} weight="regular" />
                    </S.RoleHeading>
                    <S.RoleChipList>
                        {roles.map((role) => (
                            <S.RoleChip key={role}>
                                {role}
                                <button
                                    aria-label={`${role} 삭제`}
                                    onClick={() => removeRole(role)}
                                    type="button"
                                >
                                    ×
                                </button>
                            </S.RoleChip>
                        ))}
                        {roles.length < 3 && (
                            <S.AddRoleButton onClick={() => setIsRoleSheetOpen(true)} type="button">
                                + 추가하기
                            </S.AddRoleButton>
                        )}
                    </S.RoleChipList>
                </S.RoleContainer>
                <S.SkillContainer>
                    <S.SectionHeading><span>
                        <strong>사용 기술</strong>
                        <small>프로젝트에 사용한 기술 · 최대 10개</small>
                    </span>
                    </S.SectionHeading>
                    <S.SkillStackList>
                        {visibleSkills.map((skill) => (
                            <S.SkillStackOption
                                $selected={skills.includes(skill)}
                                key={skill}
                                onClick={() => toggleSkill(skill)}
                                type="button"
                            >
                                {skill}
                            </S.SkillStackOption>
                        ))}
                        <S.DirectSkillButton onClick={() => setIsDirectSkillSheetOpen(true)} type="button">
                            <Icon name="plus" size={18} weight="regular" />
                            직접 입력
                        </S.DirectSkillButton>
                    </S.SkillStackList>
                    {remainingSkillCount > 0 && (
                        <S.SkillMoreToggle
                            aria-expanded={showAllSkills}
                            onClick={() => setShowAllSkills((v) => !v)}
                            type="button"
                        >
                            {showAllSkills ? "접기" : `더보기 +${remainingSkillCount}`}
                        </S.SkillMoreToggle>
                    )}
                </S.SkillContainer>
                <S.DescriptionContainer>
                    <S.DescriptionHeading>
                        <S.SectionHeading><strong>프로젝트 설명</strong></S.SectionHeading>
                        <span>{description.length} / 200</span>
                    </S.DescriptionHeading>
                    <Textarea
                        maxLength={200}
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                        placeholder='어떤 문제를 풀었고, 내가 맡은 부분과 결과를 적어주세요'
                    />
                </S.DescriptionContainer>
                <S.LinkContainer>
                    <S.LinkLabel>링크</S.LinkLabel>
                    {links.map((link, index) => (
                        <S.LinkInputWrap key={index}>
                            <Icon name="link" size={18} weight="regular" />
                            <S.LinkInput
                                type="url"
                                value={link}
                                onChange={(e) => updateLink(index, e.target.value)}
                                placeholder="GitHub, Behance, 노션 링크"
                            />
                            {links.length > 1 && (
                                <S.LinkRemoveButton
                                    aria-label="링크 삭제"
                                    onClick={() => removeLink(index)}
                                    type="button"
                                >
                                    ×
                                </S.LinkRemoveButton>
                            )}
                        </S.LinkInputWrap>
                    ))}
                    {links.length < MAX_LINKS && (
                        <S.AddLinkButton onClick={addLink} type="button">
                            + 링크 추가
                        </S.AddLinkButton>
                    )}
                </S.LinkContainer>
                <S.VisibleContainer>
                    <S.VisibleLabel><strong>공개 설정</strong></S.VisibleLabel>
                    <S.VisibilitySection>
                        <span>
                            <strong>프로필에 노출</strong>
                            <small>노출 중4/6· 끄면 보관함에 저장돼요</small>
                        </span>
                        <S.ToggleButton
                            $active={isMain}
                            aria-pressed={isMain}
                            onClick={() => setIsMain((current) => !current)}
                            type="button"
                        >
                            <i />
                        </S.ToggleButton>
                    </S.VisibilitySection>
                    <S.VisibilitySection>
                        <span>
                            <strong>대표 프로젝트로 설정</strong>
                            <small>마이페이지 맨 위에 크게 보여요</small>
                        </span>
                        <S.ToggleButton
                            $active={isPublic}
                            aria-pressed={isPublic}
                            onClick={() => setIsPublic((current) => !current)}
                            type="button"
                        >
                            <i />
                        </S.ToggleButton>
                    </S.VisibilitySection>
                </S.VisibleContainer>
            </S.Content>
            <S.SaveBar>
                <S.SaveButton
                    onClick={() => navigate("/my-profile")} type="button">
                    업로드
                </S.SaveButton>
            </S.SaveBar>
            <RoleSelectSheet
                open={isRoleSheetOpen}
                onClose={() => setIsRoleSheetOpen(false)}
                roles={roles}
                setRoles={setRoles}
                onSelectDetail={() => setIsRoleSheetOpen(false)} // 상세 페이지 이동 대신 그냥 닫기
            />
            <BottomSheet
                footer={
                    <S.SheetFooter>
                        <S.SheetDoneButton disabled={!directSkill.trim()} onClick={addDirectSkill} type="button">
                            기술 추가하기
                        </S.SheetDoneButton>
                    </S.SheetFooter>
                }
                footerVariant="action"
                minHeight="min(34svh, 320px)"
                onClose={() => setIsDirectSkillSheetOpen(false)}
                open={isDirectSkillSheetOpen}
                showHeaderDivider={false}
                variant="compact"
            >
                <S.SheetHeader>
                    <span>
                        <strong>사용 기술 직접 입력</strong>
                        <small>사용한 기술을 하나씩 추가해보세요</small>
                    </span>
                    <button aria-label="닫기" onClick={() => setIsDirectSkillSheetOpen(false)} type="button">
                        <Icon name="x" size={25} weight="regular" />
                    </button>
                </S.SheetHeader>
                <S.DirectSkillInput
                    autoFocus
                    onChange={(e) => setDirectSkill(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addDirectSkill();
                    }}
                    placeholder="예: Spring Boot"
                    value={directSkill}
                />
            </BottomSheet>
        </S.Page>
    );
}