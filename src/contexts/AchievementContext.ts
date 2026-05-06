import { createContext } from "react";
import type { AchievementContextValue } from "@/types";

export const AchievementContext = createContext<AchievementContextValue | null>(
  null,
);

// Imperative API — works outside React (Zustand actions, vanilla JS, etc.)
// Calls are no-ops until AchievementProvider mounts and registers its functions.
export const achievementManager: {
  unlock: (id: string) => void;
  track: (metric: string, value: number) => void;
} = {
  unlock: () => {},
  track: () => {},
};
