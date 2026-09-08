import { Button } from "./components/Button";
import "./App.css";

function App() {
  return (
    <main className="button-preview">
      <section className="button-card">
        <p className="button-eyebrow">공용 UI</p>
        <h1>Button Preview</h1>
        <p className="button-description">
          버튼의 tone, width, disabled 상태를 확인할 수 있습니다.
        </p>

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
