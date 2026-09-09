import { useState } from "react";
import {
  BottomNavigation,
  type BottomNavigationItem,
} from "./components/BottomNavigation/BottomNavigation";
import {
  BottomSheet,
  BottomSheetOptionList,
} from "./components/BottomSheet/BottomSheet";
import { Button } from "./components/Button";
import { PageHeader } from "./components/PageHeader";
import { Icon, type IconName } from "./components/icons";
import { Input } from "./components/Input";
import { Modal } from "./components/Modal/Modal";
import { Textarea } from "./components/Textarea";
import "./App.css";

type TabKey = "home" | "chat" | "team" | "mypage";
type SortValue = "조회수순" | "스크랩순" | "최신순" | "마감일순";

const navigationItems: BottomNavigationItem[] = [
  { key: "home", label: "홈", icon: "home" },
  { key: "chat", label: "채팅", icon: "chat", badge: 2 },
  { key: "team", label: "기웃허브", icon: "users" },
  { key: "mypage", label: "마이페이지", icon: "user" },
];

const iconNames: IconName[] = ["home", "search", "bell", "user", "lock"];

const sortOptions: { value: SortValue; label: string }[] = [
  { value: "조회수순", label: "조회수순" },
  { value: "스크랩순", label: "스크랩순" },
  { value: "최신순", label: "최신순" },
  { value: "마감일순", label: "마감일순" },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [sortValue, setSortValue] = useState<SortValue>("조회수순");

  return (
    <main className="showcase-page">
      <PageHeader title="공모전 등록" onBack={() => undefined} />
      <div className="showcase-content">
        <header className="showcase-header">
          <p className="showcase-eyebrow">공용 UI 컴포넌트</p>
          <h1>기웃 디자인 시스템</h1>
          <p>
            지금까지 만든 컴포넌트를 한 화면에서 확인하고 직접 사용해볼 수
            있습니다.
          </p>
        </header>

        <section className="showcase-section">
          <div className="section-heading">
            <div>
              <p className="component-name">Button</p>
              <h2>버튼</h2>
            </div>
            <span>primary · secondary</span>
          </div>
          <div className="demo-row">
            <Button>Primary</Button>
            <Button tone="secondary">Secondary</Button>
            <Button width="100%">전체 너비</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="showcase-section">
          <div className="section-heading">
            <div>
              <p className="component-name">Input</p>
              <h2>입력 필드</h2>
            </div>
            <span>default · disabled</span>
          </div>
          <div className="field-stack">
            <label className="field-label">
              이름
              <Input placeholder="이름을 입력해주세요" />
            </label>
            <label className="field-label">
              비활성화된 입력
              <Input disabled placeholder="입력할 수 없습니다" />
            </label>
          </div>
        </section>

        <section className="showcase-section">
          <div className="section-heading">
            <div>
              <p className="component-name">Textarea</p>
              <h2>여러 줄 입력</h2>
            </div>
            <span>resize none</span>
          </div>
          <label className="field-label">
            자기소개
            <Textarea placeholder="내용을 입력해주세요" />
          </label>
        </section>

        <section className="showcase-section">
          <div className="section-heading">
            <div>
              <p className="component-name">Icon</p>
              <h2>아이콘</h2>
            </div>
            <span>통합 아이콘 매핑</span>
          </div>
          <div className="icon-row">
            {iconNames.map((name) => (
              <div className="icon-item" key={name}>
                <span className="icon-box">
                  <Icon name={name} size={22} />
                </span>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="showcase-section">
          <div className="section-heading">
            <div>
              <p className="component-name">Overlay</p>
              <h2>모달과 바텀시트</h2>
            </div>
            <span>클릭해서 확인</span>
          </div>
          <div className="demo-row">
            <Button onClick={() => setIsModalOpen(true)}>Modal 열기</Button>
            <Button onClick={() => setIsBottomSheetOpen(true)} tone="secondary">
              BottomSheet 열기
            </Button>
          </div>
        </section>
      </div>

      <Modal
        description="공용 Modal 컴포넌트의 기본 형태와 액션 버튼을 확인할 수 있습니다."
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        primaryAction={{
          label: "확인",
          onClick: () => setIsModalOpen(false),
        }}
        secondaryAction={{
          label: "다음에 하기",
          onClick: () => setIsModalOpen(false),
        }}
        title="학교 인증 후 볼 수 있어요"
      />

      <BottomSheet
        footer={<span>선택한 정렬 기준: {sortValue}</span>}
        onClose={() => setIsBottomSheetOpen(false)}
        open={isBottomSheetOpen}
        title="정렬"
      >
        <BottomSheetOptionList
          ariaLabel="정렬 기준"
          onChange={(value) => setSortValue(value)}
          options={sortOptions}
          value={sortValue}
        />
      </BottomSheet>

      <BottomNavigation
        activeKey={activeTab}
        items={navigationItems}
        onChange={(key) => setActiveTab(key as TabKey)}
      />
    </main>
  );
}

export default App;
