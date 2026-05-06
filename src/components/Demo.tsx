import { useState } from "react";
import sampleSticker from "@/assets/surfboard_v2.png";
import AchievementProvider from "@/components/AchievementProvider";
import type { AchievementConfig } from "@/types";
import useAchievements from "@/hooks/useAchievements";

const achievements: AchievementConfig[] = [
  {
    id: "first-login",
    title: "Welcome Back!",
    sticker: sampleSticker,
  },
  {
    id: "century",
    title: "Century Score!",
    sticker: sampleSticker,
    metric: "score",
    threshold: 100,
  },
  {
    id: "burger-tower",
    title: "Highest Burger Stacked!",
    sticker: sampleSticker,
    metric: "burger-stack-height",
    threshold: 10,
  },
  {
    id: "flush-master",
    title: "Flush Master!",
    sticker: sampleSticker,
    metric: "flush-count",
    threshold: 5,
  },
  {
    id: "big-spender",
    title: "Big Spender!",
    sticker: sampleSticker,
    metric: "total-spent",
    threshold: 1,
  },
];

const DemoContent = () => {
  const { unlock, track } = useAchievements();
  const [score, setScore] = useState(0);

  const addScore = (amount: number) => {
    const next = score + amount;
    setScore(next);
    track("score", next);
  };


  return (
    <main className="flex flex-col items-center justify-center gap-4 h-[97vh] text-white">
      <p className="text-sm text-black opacity-60">Score: {score}</p>

      <button
        onClick={() => unlock("first-login")}
        className="px-4 py-2 rounded bg-action text-action-text border-2 border-border-strong"
      >
        Trigger: Welcome Back
      </button>

      <button
        onClick={() => addScore(25)}
        className="px-4 py-2 rounded bg-action text-action-text border-2 border-border-strong"
      >
        +25 Score (need 100)
      </button>

      <button
        onClick={() => track("burger-stack-height", 10)}
        className="px-4 py-2 rounded bg-action text-action-text border-2 border-border-strong"
      >
        Stack 10 Burgers
      </button>

      <button
        onClick={() => track("total-spent", 1)}
        className="px-4 py-2 rounded bg-action text-action-text border-2 border-border-strong"
      >
        Make a Purchase
      </button>
    </main>
  );
};

const Demo = () => (
  <AchievementProvider achievements={achievements}>
    <DemoContent />
  </AchievementProvider>
);

export default Demo;
