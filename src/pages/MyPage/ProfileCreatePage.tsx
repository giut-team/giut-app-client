import { useNavigate } from 'react-router-dom';
import { PageHeader } from "../../components/PageHeader";
import { useState, useRef } from 'react';
import { Icon } from '../../components/icons';
import { getSkillIcon } from '../GiutHub/GiutHubProfilePage';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import { Input } from '../../components/Input';
import { DepartmentSelectSheet, GradeSelectSheet, RoleSelectSheet, InterestSelectSheet } from './ProfileEditPage';
import { BottomSheet } from '../../components/BottomSheet/BottomSheet';
import { Textarea } from '../../components/Textarea';
import { S, type ProfileStatus } from './ProfileCreatePage.styles';

const MAX_SKILLS = 10;
const COLLAPSED_COUNT = 7;

const skillStackOptions = [
    "Python", "SQL", "Pandas", "React", "Figma", "Spring", "Java", "JavaScript",
    "TypeScript", "Node.js", "AWS", "Docker", "MySQL", "Git", "Notion", "Slack",
];
const statusOptions: { description: string; value: ProfileStatus }[] = [
    { value: "팀 찾는 중", description: "기웃허브 상단에 노출돼요" },
    {
        value: "포폴 쌓는 중",
        description: "제안은 받지만 검토 후 결정해요",
    },
    { value: "지금은 쉬는 중", description: "검색 결과에서 잠시 숨겨요" },
];

export function ProfileCreatePage() {
    const navigate = useNavigate();
    const [currentProgress, setcurrentProgress] = useState<number>(1);
    const [name, setName] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [grade, setGrade] = useState<string>("");
    const majorGrade = [major, grade].filter(Boolean).join(" ");
    const [roles, setRoles] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);
    const roleInterest = [roles.join(" / "), interests.join(", ")]
        .filter(Boolean)
        .join(" · ");
    const [state, setState] = useState<ProfileStatus>("팀 찾는 중");
    const [bio, setBio] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);
    const formRef = useRef<HTMLDivElement>(null);
    const [isDepartmentSheetOpen, setIsDepartmentSheetOpen] = useState(false);
    const [isGradeSheetOpen, setIsGradeSheetOpen] = useState(false);
    const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false);
    const [isInterestSheetOpen, setIsInterestSheetOpen] = useState(false);
    const [isDirectSkillSheetOpen, setIsDirectSkillSheetOpen] = useState(false);
    const [directSkill, setDirectSkill] = useState("");
    const [showAllSkills, setShowAllSkills] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const handleNext = () => {
        if (!isStepValid) return;
        if (currentProgress < 3) {
            setcurrentProgress(currentProgress + 1);
            formRef.current?.scrollTo(0, 0);
        } else {
            setIsCompleted(true);
         }
    };
    const handleBack = () => {
        setcurrentProgress(currentProgress - 1)
    };
    const removeRole = (role: string) =>
        setRoles((current) => current.filter((item) => item !== role));
    const removeInterest = (interest: string) =>
        setInterests((current) => current.filter((item) => item !== interest));
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
    const handleImageChange = (files: File[]) => {
        if (profileImage) URL.revokeObjectURL(profileImage);
        setProfileImage(files[0] ? URL.createObjectURL(files[0]) : null);
    };

    const isStepValid = [
        Boolean(name.trim() && major && grade),
        roles.length > 0 && interests.length > 0,
        Boolean(state),
    ][currentProgress - 1];

    const allSkillOptions = [...new Set([...skillStackOptions, ...skills])];
    const visibleSkills = showAllSkills ? allSkillOptions : allSkillOptions.slice(0, COLLAPSED_COUNT);
    const remainingSkillCount = Math.max(0, allSkillOptions.length - COLLAPSED_COUNT);

    const filledChecks = [
        name.trim(), major, grade,
        roles.length > 0, interests.length > 0,
        state, bio.trim(),
    ];
    const completion = Math.round(
        (filledChecks.filter(Boolean).length / filledChecks.length) * 100
    );

    const renderStep1 = () => (
        <>
            <S.FormSection>
                <S.FormLabel>프로필 사진</S.FormLabel>
                <S.FormProfileImgdescription>
                    얼굴이 보이는 사진이면 팀 제안을 받을 확률이 높아져요
                </S.FormProfileImgdescription>
                <ImageUploader maxImages={1} onChange={handleImageChange} />
            </S.FormSection>
            <S.FormSection>
                <S.FormLabel>이름 <span>*</span></S.FormLabel>
                <Input
                    id="profile-name"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    style={{ margin: "10px 0 20px" }}
                />
            </S.FormSection>
            <S.FormSection>
                <S.FormLabel>학교 <span>*</span></S.FormLabel>
                <S.FormUniv>
                    <strong>서울시립대학교</strong>
                    <span>
                        <Icon name="check" size={12} weight="bold" />
                        인증 완료
                    </span>
                </S.FormUniv>
            </S.FormSection>
            <S.FormSection>
                <S.FormLabel>학과 <span>*</span></S.FormLabel>
                <S.SelectField onClick={() => setIsDepartmentSheetOpen(true)} type="button" style={{ margin: "10px 0 20px" }}>
                    {major} <Icon name="caret-right" size={18} weight="regular" />
                </S.SelectField>
                <DepartmentSelectSheet
                    onClose={() => setIsDepartmentSheetOpen(false)}
                    onSelect={setMajor}
                    open={isDepartmentSheetOpen}
                    value={major}
                />
            </S.FormSection>
            <S.LastFormSection>
                <S.FormLabel>학년 <span>*</span></S.FormLabel>
                <S.SelectField onClick={() => setIsGradeSheetOpen(true)} type="button" style={{ margin: "10px 0 20px" }}>
                    {grade} <Icon name="caret-right" size={18} weight="regular" />
                </S.SelectField>
                <GradeSelectSheet
                    onClose={() => setIsGradeSheetOpen(false)}
                    onSelect={setGrade}
                    open={isGradeSheetOpen}
                    value={grade}
                />
            </S.LastFormSection>
        </>
    )
    const renderStep2 = () => (
        <>
            <S.FormSection>
                <S.FormLabel>내 역할 <span>*</span></S.FormLabel>
                <S.FormProfileImgdescription>
                    최대 3개까지 선택할 수 있어요
                </S.FormProfileImgdescription>
                <S.RoleChipList style={{ margin: "10px 0 20px" }}>
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
                <RoleSelectSheet
                    open={isRoleSheetOpen}
                    onClose={() => setIsRoleSheetOpen(false)}
                    roles={roles}
                    setRoles={setRoles}
                    onSelectDetail={() => setIsRoleSheetOpen(false)} // 상세 페이지 이동 대신 그냥 닫기
                />
            </S.FormSection>
            <S.FormSection>
                <S.FormLabel>관심 분야 <span>*</span></S.FormLabel>
                <S.FormProfileImgdescription>
                    최대 3개까지 선택할 수 있어요
                </S.FormProfileImgdescription>
                <S.RoleChipList style={{ margin: "10px 0 20px" }}>
                    {interests.map((interest) => (
                        <S.RoleChip key={interest}>
                            {interest}
                            <button
                                aria-label={`${interest} 삭제`}
                                onClick={() => removeInterest(interest)}
                                type="button"
                            >
                                ×
                            </button>
                        </S.RoleChip>
                    ))}
                    {interests.length < 3 && (
                        <S.AddRoleButton
                            onClick={() => setIsInterestSheetOpen(true)}
                            type="button"
                        >
                            + 추가하기
                        </S.AddRoleButton>
                    )}
                </S.RoleChipList>
                <InterestSelectSheet
                    interests={interests}
                    onClose={() => setIsInterestSheetOpen(false)}
                    open={isInterestSheetOpen}
                    setInterests={setInterests}
                />
            </S.FormSection>
            <S.FormSection>
                <S.FormLabel>기술 스택</S.FormLabel>
                <S.FormProfileImgdescription>
                    최대 10개 · 목록에 없으면 직접 입력
                </S.FormProfileImgdescription>
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
            </S.FormSection>
        </>
    )
    const renderStep3 = () => (
        <>
            <S.FormSection>
                <S.FormLabel>현재 상태 <span>*</span></S.FormLabel>
                <S.StatusChoiceList>
                    {statusOptions.map((status) => (
                        <S.StatusChoiceButton
                            $selected={status.value === state}
                            key={status.value}
                            onClick={() => setState(status.value)}
                            type="button"
                        >
                            <span>
                                {status.value === state && <Icon name="check" size={13} weight="bold" />}
                            </span>
                            <strong>{status.value}</strong>
                            <small>{status.description}</small>
                        </S.StatusChoiceButton>
                    ))}
                </S.StatusChoiceList>
            </S.FormSection>
            <S.FormSection>
                <S.FormLabel>한 줄 소개 <em>{bio.length}/200</em></S.FormLabel>
                <Textarea
                    maxLength={200}
                    onChange={(event) => setBio(event.target.value)}
                    value={bio}
                    style={{ margin: "10px 0 20px" }}
                />
            </S.FormSection>
            <S.FormSection>
                <S.FormLabel style={{ margin: "0 0 5px" }}>활동 이력</S.FormLabel>
                <S.AddButton>
                    <Icon name='plus' size={14} weight='bold' />
                    활동 이력 추가
                    <span>수상 · 동아리 · 대외활동</span>
                </S.AddButton>
            </S.FormSection>
        </>
    )

    if (isCompleted) {
        return (
            <S.Page>
                <S.DoneContent>
                    <S.DoneIcon>
                        <Icon name="check" size={28} weight="bold" />
                    </S.DoneIcon>
                    <S.DoneTitle>프로필이 완성됐어요</S.DoneTitle>
                    <S.DoneDescription>
                        이제 기웃허브에서 팀원들이
                        <br />
                        {name}님을 찾을 수 있어요
                    </S.DoneDescription>
                </S.DoneContent>
                <S.DoneButtons>
                    <S.DonePrimaryButton
                        onClick={() => {navigate("/", { replace: true }); navigate("/my-profile/portfolio-add")}} // 실제 경로로 바꿔줘
                        type="button"
                    >
                        첫 포트폴리오 올리기
                    </S.DonePrimaryButton>
                    <S.DoneSecondaryButton onClick={() => navigate("/")} type="button">
                        홈으로 가기
                    </S.DoneSecondaryButton>
                </S.DoneButtons>
            </S.Page>
        );
    }

    return (
    <S.Page>
        <S.Content>
            <PageHeader centerTitle
                onBack={() => navigate(-1)}
                rightContent={
                    <S.SkipButton aria-label="건너뛰기" onClick={() => navigate("/")} type="button">
                        건너뛰기
                    </S.SkipButton>
                }
                title='프로필 만들기' />
            <S.StaticPannel>
                <S.ProgressBar>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <S.ProgressSegment key={index} isActive={index < currentProgress} />
                    ))}
                </S.ProgressBar>
                <S.ProgressLabel>{currentProgress}/3 · 기본 정보</S.ProgressLabel>
                <S.ProfilePreview>
                    <S.ProfilePreviewTitle>
                        <Icon name='eye' size={13} weight="regular" />
                        내 프로필 미리보기
                        <span>완성도 {completion}%</span>
                    </S.ProfilePreviewTitle>
                    <S.PreviewArea>
                        <S.PreviewTop>
                            <S.ProfileImg>
                                {profileImage ? (
                                    <img alt="프로필 미리보기" src={profileImage} />
                                ) : (
                                    <Icon name="user" size={28} weight="fill" />
                                )}
                            </S.ProfileImg>
                            <S.PreviewLabels>
                                <S.PreviewName $empty={!name}>{name || "이름"}</S.PreviewName>
                                <S.PrewviewMajorGrade $empty={!majorGrade}>{majorGrade || "학과 · 학년"}</S.PrewviewMajorGrade>
                                <S.PreviewRoleInterest $empty={!roleInterest}>{roleInterest || "역할 · 관심 분야"}</S.PreviewRoleInterest>
                                <S.PreviewState $status={state}>{state}</S.PreviewState>
                            </S.PreviewLabels>
                        </S.PreviewTop>
                        <S.PreviewBio $empty={!bio}>{bio || "한 줄 소개가 여기에 보여요"}</S.PreviewBio>
                        <S.PreviewSkills>
                            <S.SkillList aria-label="보유 기술">
                                {skills.map((skill, index) => (
                                    <S.Skill $index={index} key={skill}>
                                        {getSkillIcon(skill) && <img alt="" src={getSkillIcon(skill)} />}
                                        {skill}
                                    </S.Skill>
                                ))}
                            </S.SkillList>
                        </S.PreviewSkills>
                    </S.PreviewArea>
                </S.ProfilePreview>
            </S.StaticPannel>
            <S.FormArea ref={formRef}>
                {currentProgress === 1 && renderStep1()}
                {currentProgress === 2 && renderStep2()}
                {currentProgress === 3 && renderStep3()}
            </S.FormArea>
        </S.Content>
        {currentProgress === 1 && <S.SaveBar>
            <S.SaveButton
                disabled={!isStepValid} onClick={handleNext} type="button">
                다음
            </S.SaveButton>
        </S.SaveBar>}
        {currentProgress === 2 && <S.SaveBar>
            <S.SaveButtonsLight
                onClick={handleBack} type="button">
                이전
            </S.SaveButtonsLight>
            <S.SaveButtons
                disabled={!isStepValid} onClick={handleNext} type="button">
                다음
            </S.SaveButtons>
        </S.SaveBar>}
        {currentProgress === 3 && <S.SaveBar>
            <S.SaveButtonsLight
                onClick={handleBack} type="button">
                이전
            </S.SaveButtonsLight>
            <S.SaveButtons
                disabled={!isStepValid} onClick={handleNext} type="button">
                프로필 완성하기
            </S.SaveButtons>
        </S.SaveBar>}
    </S.Page>
    )

}