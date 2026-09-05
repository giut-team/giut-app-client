import { useCallback, useState } from "react";
import {
  BottomSheet,
  BottomSheetOptionList,
  type BottomSheetOption,
} from "./components/BottomSheet/BottomSheet";
import "./App.css";

type SortValue = "views" | "scraps" | "recent" | "closing";

const sortOptions: BottomSheetOption<SortValue>[] = [
  { value: "views", label: "조회순" },
  { value: "scraps", label: "스크랩순" },
  { value: "recent", label: "최신순" },
  { value: "closing", label: "마감일순" },
];

function App() {
  const [sheetOpen, setSheetOpen] = useState(true);
  const [sort, setSort] = useState<SortValue>("views");
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  return (
    <main className="demo-page">
      <div className="campaign-card">
        <div className="campaign-meta">
          <span>디자인</span>
          <b>D-10</b>
        </div>
        <h1>디자인으로 만드는 ESG 캠페인</h1>
        <p>한국디자인진흥원</p>
      </div>

      <button
        className="open-sheet-button"
        onClick={() => setSheetOpen(true)}
        type="button"
      >
        정렬 기준: {sortOptions.find((option) => option.value === sort)?.label}
      </button>

      <BottomSheet
        footer="‘인증’ 배지가 있는 공모전은 원문 링크가 확인된 항목으로, 정렬과 무관하게 표시됩니다."
        onClose={closeSheet}
        open={sheetOpen}
        title="정렬"
      >
        <BottomSheetOptionList
          ariaLabel="정렬 기준"
          onChange={setSort}
          options={sortOptions}
          value={sort}
        />
      </BottomSheet>
    </main>
  );
}

export default App;
