import { useState } from "react";
import useAchievements from "@/hooks/useAchievements";

const Demo = () => {
  const { unlock, track } = useAchievements();
  const [score, setScore] = useState(0);
  // const [flushes, setFlushes] = useState(0);

  const addScore = (amount: number) => {
    const next = score + amount;
    setScore(next);
    track("score", next);
  };

  // const flush = () => {
  //   const next = flushes + 1;
  //   setFlushes(next);
  //   track("flush-count", next);
  // };

  return (
    <main className="flex flex-col items-center justify-center gap-4 h-[97vh] text-white">
      {/* <p className="text-sm text-black opacity-60">Score: {score} · Flushes: {flushes}</p> */}
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

      {/* <button
        onClick={flush}
        className="px-4 py-2 rounded bg-action text-action-text border-2 border-border-strong"
      >
        Flush (+1, need 5)
      </button> */}

      <button
        onClick={() => track("total-spent", 1)}
        className="px-4 py-2 rounded bg-action text-action-text border-2 border-border-strong"
      >
        Make a Purchase
      </button>
    </main>
  );
};

export default Demo;
