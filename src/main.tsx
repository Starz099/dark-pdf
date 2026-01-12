import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(
  <div
    className="text-foreground relative min-h-screen overflow-hidden"
    style={{
      background:
        "radial-gradient(circle at 20% 20%, color-mix(in oklab, var(--color-secondary) 25%, transparent), transparent 32%)," +
        "radial-gradient(circle at 80% 10%, color-mix(in oklab, var(--color-primary) 18%, transparent), transparent 28%)," +
        "linear-gradient(135deg, color-mix(in oklab, var(--color-background) 92%, var(--color-foreground) 8%), color-mix(in oklab, var(--color-background) 75%, var(--color-primary) 25%))",
    }}
  >
    <div className="relative mx-auto max-w-6xl px-4 py-10">
      <App />
    </div>
  </div>,
);
