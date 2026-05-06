import type { ReactNode } from "react";

// Achievement Data

export interface AchievementConfig {
  id: string; // unique identifier used to unlock or reference the achievement
  title: string; // display name shown in the badge
  sticker: string; // URL or imported asset path for the sticker texture
  metric?: string; // event name to track (e.g. "score", "clicks")
  threshold?: number; // auto-unlocks when the tracked metric reaches this value
}

export interface AchievementContextValue {
  unlock: (id: string) => void; // manually unlock an achievement by id
  track: (metric: string, value: number) => void; // report a metric value to trigger threshold-based unlocks
  unlocked: string[]; // list of achievement ids unlocked in this session
}

// Component Props

export interface AchievementBadgeProps {
  className?: string;
  children: ReactNode;
}

export interface AchievementProps {
  title: string;
  sticker: string;
  onDismiss?: () => void;
}

export interface AchievementProviderProps {
  achievements: AchievementConfig[];
  children: ReactNode;
}
