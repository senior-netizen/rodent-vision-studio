import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/effects.css";
import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="system" storageKey="rodent-theme">
    <App />
  </ThemeProvider>
);
