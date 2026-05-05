import sampleSticker from "@/assets/toilet_1_texture-nobg.png";
import AchievementProvider from "@/components/AchievementProvider";
import type { AchievementConfig } from "@/contexts/AchievementContext";
import Demo from "@/components/Demo";

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

const App = () => {
  return (
    <AchievementProvider achievements={achievements}>
      <Demo />
    </AchievementProvider>
  );
};

export default App;
