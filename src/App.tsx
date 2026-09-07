import { useCallback, useState } from "react";
import {
  BottomSheet,
  BottomSheetOptionList,
  type BottomSheetOption,
} from "./components/BottomSheet/BottomSheet";
import { Modal } from "./components/Modal/Modal";
import "./App.css";

type SortValue = "views" | "scraps" | "recent" | "closing";

const sortOptions: BottomSheetOption<SortValue>[] = [
  { value: "views", label: "조회순" },
  { value: "scraps", label: "스크랩순" },
  { value: "recent", label: "최신순" },
  { value: "closing", label: "마감일순" },
];

function App() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [sort, setSort] = useState<SortValue>("views");
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <main className="demo-page">
      <div className="demo-actions">
        <button className="open-sheet-button" onClick={() => setSheetOpen(true)} type="button">
          정렬 열기
        </button>
        <button className="open-modal-button" onClick={() => setModalOpen(true)} type="button">
          인증 안내 다시 보기
        </button>
      </div>

      <BottomSheet
        footer="‘인증’ 배지가 있는 공모전은 원문 링크가 확인된 항목으로 표시됩니다."
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

      <Modal
        description="같은 학교 학생끼리 안전하게 팀을 만들기 위해, 기웃보다 팀 지원은 학교 인증을 마친 뒤 이용할 수 있어요. 1분이면 끝나요."
        onClose={closeModal}
        open={modalOpen}
        primaryAction={{ label: "학교 인증하기", onClick: closeModal }}
        secondaryAction={{ label: "다음에 하기", onClick: closeModal }}
        title="학교 인증 후 볼 수 있어요"
      />
    </main>
  );
}

export default App;
