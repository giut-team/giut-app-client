import type { SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";
import { readHubFilterSelection, writeHubFilterSelection, type HubFilterSelection, type Position, type Grade, type TeamStatus } from "./giutHubFilters";

export function useHubFilterSelection() {
  const [params, setParams] = useSearchParams();
  const selection = readHubFilterSelection(params);
  const update = <K extends keyof HubFilterSelection>(key: K, action: SetStateAction<HubFilterSelection[K]>) => {
    setParams(previous => {
      const current = readHubFilterSelection(previous);
      const value = typeof action === "function" ? action(current[key]) : action;
      return writeHubFilterSelection(previous, { ...current, [key]: value });
    }, { replace: true });
  };
  return {
    ...selection,
    returnTo: `/giut-hub${params.size ? `?${params.toString()}` : ""}`,
    setSelectedPositions: (value: SetStateAction<Position[]>) => update("selectedPositions", value),
    setSelectedTeamStatus: (value: SetStateAction<TeamStatus>) => update("selectedTeamStatus", value),
    setSelectedDepartments: (value: SetStateAction<string[]>) => update("selectedDepartments", value),
    setSelectedGrades: (value: SetStateAction<Grade[]>) => update("selectedGrades", value),
    resetFilters: () => setParams(previous => writeHubFilterSelection(previous, {
      selectedPositions: [], selectedTeamStatus: "전체", selectedDepartments: [], selectedGrades: [],
    }), { replace: true }),
  };
}
