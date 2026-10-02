import { api } from "./client";

export type ContestCategory = "전체" | keyof typeof categoryQueryValues;
export type CompetitionCategory = (typeof categoryQueryValues)[keyof typeof categoryQueryValues];
type CategoryTone = "blue" | "orange" | "purple" | "green" | "yellow" | "pink";

export type CompetitionResponse = {
  id: number;
  title: string;
  category: CompetitionCategory;
  categoryName: string;
  hostOrganization: string;
  summary: string;
  applicationStartAt: string;
  applicationEndAt: string;
  recruitmentStatus: string;
  recruitmentStatusName: string;
  viewCount: number;
  scrapCount: number;
  teamCount: number;
  primaryUrl: string;
};

export type CompetitionUrl = {
  id: number;
  type: string;
  url: string;
  primary: boolean;
};

export type CompetitionDetailResponse = Omit<CompetitionResponse, "primaryUrl"> & {
  primaryUrl?: string;
  targetParticipant: string;
  scrapped: boolean;
  urls: CompetitionUrl[];
  recruitingTeamCount: number;
  teams: unknown[];
};

export type CompetitionsResponse = {
  competitions: CompetitionResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
};

export type Contest = CompetitionResponse & {
  categoryTone: CategoryTone;
  /** API의 applicationEndAt을 기준으로 프론트엔드에서 계산한 표시값 */
  dDay: string;
};

export type ContestDetail = CompetitionDetailResponse & {
  categoryTone: CategoryTone;
  dDay: string;
};

export const categories: ContestCategory[] = [
  "전체",
  "기획/아이디어",
  "광고/마케팅",
  "논문/리포트",
  "영상/UCC/사진",
  "디자인/캐릭터/웹툰",
  "웹/모바일/IT",
  "게임/소프트웨어",
  "과학/공학",
  "문학/글쓰기/시나리오",
  "건축/건설/인테리어",
  "네이밍/슬로건",
  "예체능/미술/음악",
  "기타",
];

const categoryQueryValues = {
  "기획/아이디어": "PLANNING_IDEA",
  "광고/마케팅": "ADVERTISING_MARKETING",
  "논문/리포트": "PAPER_REPORT",
  "영상/UCC/사진": "VIDEO_UCC_PHOTO",
  "디자인/캐릭터/웹툰": "DESIGN_CHARACTER_WEBTOON",
  "웹/모바일/IT": "WEB_MOBILE_IT",
  "게임/소프트웨어": "GAME_SOFTWARE",
  "과학/공학": "SCIENCE_ENGINEERING",
  "문학/글쓰기/시나리오": "LITERATURE_WRITING_SCENARIO",
  "건축/건설/인테리어": "ARCHITECTURE_CONSTRUCTION_INTERIOR",
  "네이밍/슬로건": "NAMING_SLOGAN",
  "예체능/미술/음악": "ENTERTAINMENT_ART_MUSIC",
  기타: "ETC",
} as const;

const categoryTones: Record<CompetitionCategory, CategoryTone> = {
  PLANNING_IDEA: "orange",
  ADVERTISING_MARKETING: "pink",
  PAPER_REPORT: "green",
  VIDEO_UCC_PHOTO: "pink",
  DESIGN_CHARACTER_WEBTOON: "purple",
  WEB_MOBILE_IT: "blue",
  GAME_SOFTWARE: "green",
  SCIENCE_ENGINEERING: "blue",
  LITERATURE_WRITING_SCENARIO: "orange",
  ARCHITECTURE_CONSTRUCTION_INTERIOR: "yellow",
  NAMING_SLOGAN: "orange",
  ENTERTAINMENT_ART_MUSIC: "purple",
  ETC: "yellow",
};

/** 브라우저의 현재 날짜를 기준으로 마감일까지 남은 일수를 표시합니다. */
export const calculateDday = (deadline: string | Date, today = new Date()): string => {
  const endDate = typeof deadline === "string"
    ? new Date(/^\d{4}-\d{2}-\d{2}$/.test(deadline) ? `${deadline}T00:00:00` : deadline)
    : deadline;

  if (Number.isNaN(endDate.getTime()) || Number.isNaN(today.getTime())) return "-";

  const endDay = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  const currentDay = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const days = (endDay - currentDay) / 86_400_000;

  if (days < 0) return "마감";
  return days === 0 ? "D-Day" : `D-${days}`;
};

const normalizeContest = (item: CompetitionResponse): Contest => ({
  ...item,
  categoryTone: categoryTones[item.category] ?? "blue",
  dDay: calculateDday(item.applicationEndAt),
});

const normalizeContestDetail = (item: CompetitionDetailResponse): ContestDetail => ({
  ...item,
  categoryTone: categoryTones[item.category] ?? "blue",
  dDay: calculateDday(item.applicationEndAt),
});

export const fetchContests = async (category: ContestCategory = "전체"): Promise<Contest[]> => {
  const { data } = await api.get<CompetitionsResponse>("/api/competitions", {
    params: {
      page: 0,
      size: 20,
      status: "OPEN",
      ...(category !== "전체"
        ? { category: categoryQueryValues[category] }
        : {}),
    },
  });

  return data.competitions.map(normalizeContest);
};

export const fetchContestDetail = async (contestId: string | number): Promise<ContestDetail> => {
  const { data } = await api.get<CompetitionDetailResponse>(`/api/competitions/${contestId}`);

  return normalizeContestDetail(data);
};
