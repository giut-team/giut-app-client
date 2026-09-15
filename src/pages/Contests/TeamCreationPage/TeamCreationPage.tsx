import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../../components/icons";
import { S } from "./TeamCreationPage.styles";

const majorRoles = ["개발", "디자인", "기획", "마케팅"];
const subRoles = [
  "프로덕트 매니저",
  "프로젝트 매니저",
  "서비스 기획",
  "비즈니스 기획",
  "콘텐츠 기획",
  "데이터 분석 기획자",
];
const leaderRoles = ["개발", "디자인", "기획", "마케팅"];

export function TeamCreationPage() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState("");
  const [memberCount, setMemberCount] = useState(2);
  const [majorRole, setMajorRole] = useState("기획");
  const [subRole, setSubRole] = useState("서비스 기획");
  const [recruitingRoles, setRecruitingRoles] = useState(["개발", "디자인"]);

  const toggleRecruitingRole = (role: string) => {
    setRecruitingRoles((current) =>
      current.includes(role)
        ? current.filter((selectedRole) => selectedRole !== role)
        : [...current, role],
    );
  };

  return (
    <S.Page>
      <S.Content>
        <S.Header>
          <S.BackButton
            aria-label="뒤로 가기"
            onClick={() => navigate(-1)}
            type="button"
          >
            <Icon name="arrow-left" size={20} weight="regular" />
          </S.BackButton>
          <S.Title>팀 만들기</S.Title>
          <S.StepCount>1/4</S.StepCount>
        </S.Header>
        <S.Progress aria-label="총 4단계 중 1단계">
          {[0, 1, 2, 3].map((step) => (
            <S.ProgressSegment $active={step === 0} key={step} />
          ))}
        </S.Progress>

        <S.Form>
          <S.ContestNotice>
            <strong>2026 서울시 데이터 활용 공모전</strong>
            <span>이 공모전에 팀을 등록합니다</span>
          </S.ContestNotice>

          <S.Field $outlined={false}>
            <S.Label htmlFor="team-name">팀명</S.Label>
            <S.TeamNameInput
              id="team-name"
              onChange={(event) => setTeamName(event.target.value)}
              value={teamName}
            />
          </S.Field>

          <S.Field>
            <S.Label>총 모집 인원</S.Label>
            <S.HelperText>팀장님을 포함한 인원이에요</S.HelperText>
            <S.MemberControl>
              <S.CountButton
                aria-label="모집 인원 줄이기"
                disabled={memberCount <= 2}
                onClick={() => setMemberCount((count) => count - 1)}
                type="button"
              >
                <Icon name="minus" size={15} weight="bold" />
              </S.CountButton>
              <S.MemberCount>{memberCount}명</S.MemberCount>
              <S.CountButton
                aria-label="모집 인원 늘리기"
                disabled={memberCount >= 10}
                onClick={() => setMemberCount((count) => count + 1)}
                type="button"
              >
                +
              </S.CountButton>
            </S.MemberControl>
          </S.Field>

          <S.RoleField>
            <S.RoleHeading>
              <S.Label>나(팀장) 역할</S.Label>
              <S.SelectedRole>
                {majorRole} · {subRole}
              </S.SelectedRole>
            </S.RoleHeading>
            <S.RoleLabel>대분류</S.RoleLabel>
            <S.ChipList>
              {majorRoles.map((role) => (
                <S.RoleChip
                  $active={majorRole === role}
                  aria-pressed={majorRole === role}
                  key={role}
                  onClick={() => setMajorRole(role)}
                  type="button"
                >
                  {role}
                </S.RoleChip>
              ))}
            </S.ChipList>
            <S.RoleLabel>소분류</S.RoleLabel>
            <S.ChipList>
              {subRoles.map((role) => (
                <S.RoleChip
                  $active={subRole === role}
                  aria-pressed={subRole === role}
                  key={role}
                  onClick={() => setSubRole(role)}
                  type="button"
                >
                  {role}
                </S.RoleChip>
              ))}
            </S.ChipList>
          </S.RoleField>

          <S.LeaderField>
            <S.RoleHeading>
              <S.Label>모집 포지션</S.Label>
            </S.RoleHeading>
            <S.HelperText>
              어떤 직군을 모집할지 먼저 고르고, 세부 직군과 인원은 다음 단계에서
              정해요.
            </S.HelperText>
            <S.PositionChipList>
              {leaderRoles.map((role) => (
                <S.RoleChip
                  $active={recruitingRoles.includes(role)}
                  aria-pressed={recruitingRoles.includes(role)}
                  key={role}
                  onClick={() => toggleRecruitingRole(role)}
                  type="button"
                >
                  {role}
                </S.RoleChip>
              ))}
            </S.PositionChipList>
          </S.LeaderField>
        </S.Form>
      </S.Content>

      <S.ActionBar>
        <S.NextButton type="button">다음으로 가기</S.NextButton>
      </S.ActionBar>
    </S.Page>
  );
}
