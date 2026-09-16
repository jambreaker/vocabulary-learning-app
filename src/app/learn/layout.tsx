import type { ReactNode } from "react";
import { LearningProvider } from "./learning-context";
import { LearnChrome } from "./learn-chrome";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <LearningProvider>
      <LearnChrome>{children}</LearnChrome>
    </LearningProvider>
  );
}
