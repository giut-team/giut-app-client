import { useState } from "react";
import { BottomNavigation, type BottomNavigationItem } from "./components/BottomNavigation/BottomNavigation";
import "./App.css";

type TabKey = "home" | "chat" | "team" | "mypage";

const navigationItems: BottomNavigationItem[] = [
  { key: "home", label: "홈", icon: "home" },
  { key: "chat", label: "채팅", icon: "chat", badge: 2 },
  { key: "team", label: "기웃허브", icon: "users" },
  { key: "mypage", label: "마이페이지", icon: "user" },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  return (
    <main className="app-page">
      <BottomNavigation
        activeKey={activeTab}
        items={navigationItems}
        onChange={(key) => setActiveTab(key as TabKey)}
      />
    </main>
  );
}

export default App;
