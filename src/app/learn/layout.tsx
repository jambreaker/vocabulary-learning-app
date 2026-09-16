import type { ReactNode } from "react";
import { LearningProvider } from "./learning-context";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <LearningProvider>{children}</LearningProvider>;
}
