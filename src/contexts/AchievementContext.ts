import { createContext, useContext } from "react";

export interface AchievementConfig {
    id: string;
    title: string;
    sticker: string;
    metric?: string;
    threshold?: number;
}

export interface AchievementContextValue {
    unlock: (id: string) => void;
    track: (metric: string, value: number) => void;
    unlocked: string[];
}

export const AchievementContext = createContext<AchievementContextValue | null>(null);

export const useAchievements = () => {
    const ctx = useContext(AchievementContext);
    if (!ctx) {
        throw new Error("useAchievements must be used within an AchievementProvider");
    }
    return ctx;
};

// Imperative API — works outside React (Zustand actions, vanilla JS, etc.)
// Calls are no-ops until AchievementProvider mounts and registers its functions.
export const achievementManager: {
    unlock: (id: string) => void;
    track: (metric: string, value: number) => void;
} = {
    unlock: () => {},
    track: () => {},
};
