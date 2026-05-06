import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import Achievement from "@/components/Achievement";
import { AchievementContext, achievementManager } from "@/contexts/AchievementContext";
import type { AchievementConfig, AchievementProviderProps } from "@/types";

const AchievementProvider = ({ achievements, children }: AchievementProviderProps) => {
    const [unlocked, setUnlocked] = useState<string[]>([]);
    const [queue, setQueue] = useState<AchievementConfig[]>([]);
    const unlockedRef = useRef<Set<string>>(new Set());

    const enqueue = useCallback(
        (id: string) => {
            if (unlockedRef.current.has(id)) return;
            const cfg = achievements.find((a) => a.id === id);
            if (!cfg) return;
            unlockedRef.current.add(id);
            setUnlocked((prev) => [...prev, id]);
            setQueue((prev) => [...prev, cfg]);
        },
        [achievements]
    );

    const unlock = useCallback(
        (id: string) => {
            enqueue(id);
        },
        [enqueue]
    );

    const track = useCallback(
        (metric: string, value: number) => {
            achievements.forEach((a) => {
                if (a.metric === metric && a.threshold !== undefined && value >= a.threshold) {
                    enqueue(a.id);
                }
            });
        },
        [achievements, enqueue]
    );

    useEffect(() => {
        achievementManager.unlock = unlock;
        achievementManager.track = track;
    }, [unlock, track]);

    const handleDismiss = useCallback(() => {
        setQueue((prev) => prev.slice(1));
    }, []);

    const value = useMemo(
        () => ({ unlock, track, unlocked }),
        [unlock, track, unlocked]
    );

    const current = queue[0];

    return (
        <AchievementContext.Provider value={value}>
            {children}
            {current && (
                <Achievement
                    key={current.id}
                    title={current.title}
                    sticker={current.sticker}
                    onDismiss={handleDismiss}
                />
            )}
        </AchievementContext.Provider>
    );
};

export default AchievementProvider;
