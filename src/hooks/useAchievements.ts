import { useContext } from "react";
import { AchievementContext } from "@/contexts/AchievementContext";

const useAchievements = () => {
  const ctx = useContext(AchievementContext);
  if (!ctx) {
    throw new Error("useAchievements must be used within an AchievementProvider");
  }
  return ctx;
};

export default useAchievements;
