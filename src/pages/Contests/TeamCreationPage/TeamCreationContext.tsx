import { createContext, useContext, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";

type TeamMember = {
  id: string;
  name: string;
  profile: string;
};

type TeamCreationContextValue = {
  activityMode: string;
  introduction: string;
  locations: string[];
  majorRole: string[];
  memberCount: number;
  members: TeamMember[];
  questions: string[];
  recruitingRoles: string[];
  roleCounts: Record<string, number>;
  roleSkills: Record<string, string[]>;
  setActivityMode: (mode: string) => void;
  setIntroduction: (introduction: string) => void;
  setLocations: (locations: string[]) => void;
  setMajorRole: (roles: string[]) => void;
  setMemberCount: (count: number) => void;
  setMembers: (members: TeamMember[]) => void;
  setQuestions: (questions: string[]) => void;
  setRecruitingRoles: (roles: string[]) => void;
  setRoleCounts: (counts: Record<string, number>) => void;
  setRoleSkills: (skills: Record<string, string[]>) => void;
  setSubRole: (roles: string[]) => void;
  setTeamName: (teamName: string) => void;
  setWeeklyMeetings: (count: number) => void;
  subRole: string[];
  submitted: boolean;
  teamName: string;
  setSubmitted: (submitted: boolean) => void;
  weeklyMeetings: number;
};

const TeamCreationContext = createContext<TeamCreationContextValue | null>(
  null,
);

export function TeamCreationProvider({ children }: { children: ReactNode }) {
  const { teamId } = useParams();
  const isEditMode = Boolean(teamId);
  const [teamName, setTeamName] = useState(() =>
    isEditMode ? "데이터로 서울을" : "",
  );
  const [memberCount, setMemberCount] = useState(() => (isEditMode ? 5 : 0));
  const [majorRole, setMajorRole] = useState<string[]>(() =>
    isEditMode ? ["기획"] : [],
  );
  const [subRole, setSubRole] = useState<string[]>(() =>
    isEditMode ? ["서비스 기획"] : [],
  );
  const [recruitingRoles, setRecruitingRoles] = useState<string[]>(() =>
    isEditMode ? ["개발"] : [],
  );
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>(() =>
    isEditMode ? { 개발: 4 } : ({} as Record<string, number>),
  );
  const [roleSkills, setRoleSkills] = useState<Record<string, string[]>>(() =>
    isEditMode
      ? { 개발: ["백엔드 개발자", "데이터 엔지니어"] }
      : ({} as Record<string, string[]>),
  );
  const [members, setMembers] = useState<TeamMember[]>(() =>
    isEditMode
      ? [{ id: "seoyeon", name: "이서연", profile: "@seoyeon · 기획 포지션" }]
      : [],
  );
  const [activityMode, setActivityMode] = useState(() =>
    isEditMode ? "온·오프 혼합" : "",
  );
  const [weeklyMeetings, setWeeklyMeetings] = useState(() => (isEditMode ? 1 : 0));
  const [locations, setLocations] = useState<string[]>(() =>
    isEditMode ? ["교내"] : [],
  );
  const [introduction, setIntroduction] = useState(() =>
    isEditMode
      ? "서울시 열린데이터로 생활 문제를 푸는 팀입니다. 주 1회 오프라인 회의와 온라인 소통으로 함께해요."
      : "",
  );
  const [questions, setQuestions] = useState([
    "이 팀에 지원한 이유를 알려주세요",
    "지원한 포지션에서 맡을 수 있는 역할은 무엇인가요?",
    "프로젝트에 어느정도의 참여를 하실 수 있나요?",
  ]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <TeamCreationContext.Provider
      value={{
        activityMode,
        introduction,
        locations,
        majorRole,
        memberCount,
        members,
        questions,
        recruitingRoles,
        roleCounts,
        roleSkills,
        setActivityMode,
        setIntroduction,
        setLocations,
        setMajorRole,
        setMemberCount,
        setMembers,
        setQuestions,
        setRecruitingRoles,
        setRoleCounts,
        setRoleSkills,
        setSubRole,
        setSubmitted,
        setTeamName,
        setWeeklyMeetings,
        subRole,
        submitted,
        teamName,
        weeklyMeetings,
      }}
    >
      {children}
    </TeamCreationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTeamCreation() {
  const context = useContext(TeamCreationContext);

  if (!context) {
    throw new Error("useTeamCreation must be used within TeamCreationProvider");
  }

  return context;
}
