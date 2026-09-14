export type ApplicantTone = "blue" | "purple" | "success";

export type Applicant = {
  id: string;
  teamId: string;
  initial: string;
  name: string;
  role: string;
  filter: "백엔드 개발자" | "데이터 엔지니어" | "UI 디자이너";
  school: string;
  message: string;
  reason: string;
  answer: string;
  availability: string;
  receivedAt: string;
  tone: ApplicantTone;
};

export const applicants: Applicant[] = [
  {
    id: "kim-hyeonjin",
    teamId: "data-seoul",
    initial: "김",
    name: "김현진",
    role: "백엔드 개발자",
    filter: "백엔드 개발자",
    school: "서울시립대 컴퓨터과학부 3학년",
    message: "Spring · PostgreSQL로 공공데이터 API 2개 만들어봤어요.",
    reason: "이 팀에 지원한 이유",
    answer: "서울시 교통 공공데이터를 다루는 경험이 있어서 이번 공모전 주제와 잘 맞을 것 같아 지원했습니다.",
    availability: "주 15시간",
    receivedAt: "10분 전",
    tone: "blue",
  },
  {
    id: "park-seojun",
    teamId: "data-seoul",
    initial: "박",
    name: "박서준",
    role: "데이터 분석",
    filter: "데이터 엔지니어",
    school: "통계학과 4학년",
    message: "교통 데이터로 수상한 경험이 있어 분석 파트를 맡고 싶어요.",
    reason: "이 팀에 지원한 이유",
    answer: "지난 학기 교통 혼잡도 분석으로 교내 공모전에서 수상했고, 이번에는 공공데이터 프로젝트를 제대로 해보고 싶습니다.",
    availability: "주 10시간",
    receivedAt: "2시간 전",
    tone: "purple",
  },
  {
    id: "choi-yuna",
    teamId: "data-seoul",
    initial: "최",
    name: "최유나",
    role: "UI 디자이너",
    filter: "UI 디자이너",
    school: "산업디자인학과 3학년",
    message: "대시보드 화면 설계와 발표자료까지 함께 만들 수 있어요.",
    reason: "이 팀에 지원한 이유",
    answer: "데이터를 한눈에 보여주는 일에 관심이 많아 지원했습니다. 서비스 UI를 초기 구조부터 함께 만들고 싶어요.",
    availability: "주 8시간",
    receivedAt: "2시간 전",
    tone: "success",
  },
];
