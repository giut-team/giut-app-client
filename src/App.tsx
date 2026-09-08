import { Button } from "./components/Button";
import { Input } from "./components/Input";
import "./App.css";

function App() {
  return (
    <main className="button-preview">
      <section className="button-card">
        <p className="button-eyebrow">공용 UI</p>
        <h1>Form UI Preview</h1>
        <p className="button-description">
          버튼과 입력 컴포넌트의 기본 상태를 확인할 수 있습니다.
        </p>

        <div className="input-group">
          <label className="input-field">
            이름
            <Input placeholder="이름을 입력해주세요" />
          </label>
          <label className="input-field">
            비활성화된 입력
            <Input disabled placeholder="입력할 수 없습니다" />
          </label>
        </div>

        <div className="button-group">
          <Button>Primary</Button>
          <Button tone="secondary">Secondary</Button>
          <Button width="100%">Full Width</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </main>
  );
}

export default App;
