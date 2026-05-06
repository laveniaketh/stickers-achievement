// import css file
import "./index.css";

// Main component
// Wrap your app with <AchievementProvider achievements={[...]}> to enable the achievement system.
// Props: achievements (AchievementConfig[]), children
export { default as AchievementProvider } from "@/components/AchievementProvider";

// Achievement display components (rendered automatically by AchievementProvider)
export { default as Achievement } from "@/components/Achievement";
export { default as AchievementBadge } from "@/components/ui/AchievementBadge";

// Hook — read or trigger achievements from anywhere inside the provider tree
export { default as useAchievements } from "@/hooks/useAchievements";

// Imperative API — unlock or track achievements from outside React (stores, vanilla JS, etc.)
export { achievementManager } from "@/contexts/AchievementContext";

// Types
export type {
  AchievementConfig, // { id, title, sticker, metric?, threshold? }
  AchievementContextValue, // { unlock, track, unlocked }
  AchievementProps, // props accepted by <Achievement />
  AchievementProviderProps, // props accepted by <AchievementProvider />
  AchievementBadgeProps, // props accepted by <AchievementBadge />
} from "@/types";
