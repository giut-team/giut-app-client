import { createContext, useContext, useState, type ReactNode } from "react";

type TeamMember = {
  id: string;
  name: string;
  profile: string;
};

type TeamCreationContextValue = {
  activityMode: string;
  introduction: string;
  locations: string[];
  majorRole: string;
  memberCount: number;
  members: TeamMember[];
  questions: string[];
  recruitingRoles: string[];
  roleCounts: Record<string, number>;
  roleSkills: Record<string, string[]>;
  setActivityMode: (mode: string) => void;
  setIntroduction: (introduction: string) => void;
  setLocations: (locations: string[]) => void;
  setMajorRole: (role: string) => void;
  setMemberCount: (count: number) => void;
  setMembers: (members: TeamMember[]) => void;
  setQuestions: (questions: string[]) => void;
  setRecruitingRoles: (roles: string[]) => void;
  setRoleCounts: (counts: Record<string, number>) => void;
  setRoleSkills: (skills: Record<string, string[]>) => void;
  setSubRole: (role: string) => void;
  setTeamName: (teamName: string) => void;
  setWeeklyMeetings: (count: number) => void;
  subRole: string;
  submitted: boolean;
  teamName: string;
  setSubmitted: (submitted: boolean) => void;
  weeklyMeetings: number;
};

const TeamCreationContext = createContext<TeamCreationContextValue | null>(
  null,
);

export function TeamCreationProvider({ children }: { children: ReactNode }) {
  const [teamName, setTeamName] = useState("데이터로 서울을");
  const [memberCount, setMemberCount] = useState(6);
  const [majorRole, setMajorRole] = useState("기획");
  const [subRole, setSubRole] = useState("서비스 기획");
  const [recruitingRoles, setRecruitingRoles] = useState(["개발", "디자인"]);
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({
    개발: 4,
    디자인: 1,
  });
  const [roleSkills, setRoleSkills] = useState<Record<string, string[]>>({
    개발: ["백엔드 개발자", "데이터 엔지니어", "프론트엔드 개발자"],
    디자인: ["UI 디자이너", "UX 디자이너"],
  });
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "seoyeon",
      name: "이서연",
      profile: "@seoyeon · 기획 포지션",
    },
  ]);
  const [activityMode, setActivityMode] = useState("온·오프 혼합");
  const [weeklyMeetings, setWeeklyMeetings] = useState(1);
  const [locations, setLocations] = useState(["교내"]);
  const [introduction, setIntroduction] = useState("");
  const [questions, setQuestions] = useState([
    "이 팀에 지원한 이유를 알려주세요",
    "지원한 포지션에서 만들 수 있는 역량은 무엇인가요?",
    "프로젝트에 어느정도의 성의를 하실 수 있나요?",
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
