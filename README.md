# react-sticker-achievements

A React package for showing animated sticker achievement overlays when users complete milestones in your app. Achievements are displayed through a 3D sticker roller animation and support both hook-based and imperative APIs for easy integration with any state management setup.

---

## Installation

```bash
npm install react-sticker-achievements
```

---

## Quick Start

Wrap your app with `AchievementProvider`, define your achievements, then call `unlock` or `track` anywhere inside.

```tsx
import AchievementProvider from "react-sticker-achievements";
import { useAchievements } from "react-sticker-achievements/context";
import mySticker from "./assets/my-sticker.png";

const achievements = [
  {
    id: "first-login",
    title: "Welcome Back!",
    sticker: mySticker,
  },
  {
    id: "high-score",
    title: "High Score!",
    sticker: mySticker,
    metric: "score",
    threshold: 100,
  },
];

export default function App() {
  return (
    <AchievementProvider achievements={achievements}>
      <YourApp />
    </AchievementProvider>
  );
}
```

---

## Achievement Config

Each achievement in the `achievements` array accepts the following fields:

| Field       | Type     | Required | Description                                                       |
|-------------|----------|----------|-------------------------------------------------------------------|
| `id`        | `string` | Yes      | Unique identifier for the achievement                             |
| `title`     | `string` | Yes      | Display title shown on the achievement badge                      |
| `sticker`   | `string` | Yes      | Image URL or imported asset for the sticker                       |
| `metric`    | `string` | No       | Metric name to track (e.g. `"score"`, `"level"`)                  |
| `threshold` | `number` | No       | Value the metric must reach or exceed to auto-unlock              |

Achievements without `metric` and `threshold` can only be unlocked directly via `unlock(id)`.

---

## Hook API — `useAchievements()`

Use inside any component that is a child of `AchievementProvider`.

```tsx
import { useAchievements } from "react-sticker-achievements/context";

const GameHUD = () => {
  const { unlock, track, unlocked } = useAchievements();

  return (
    <button onClick={() => unlock("first-login")}>
      Trigger Welcome Achievement
    </button>
  );
};
```

### `unlock(id: string)`

Directly unlocks an achievement by its `id`. Safe to call multiple times — already-unlocked achievements are ignored.

```tsx
unlock("first-login");
```

### `track(metric: string, value: number)`

Updates a metric and auto-unlocks any achievement whose `metric` matches and `threshold` is met (`value >= threshold`).

```tsx
const [score, setScore] = useState(0);

const addScore = (amount: number) => {
  const next = score + amount;
  setScore(next);
  track("score", next); // unlocks "high-score" when next >= 100
};
```

### `unlocked: string[]`

Array of achievement ids that have been unlocked so far in the session.

```tsx
const { unlocked } = useAchievements();
console.log(unlocked); // ["first-login", "high-score"]
```

---

## Imperative API — `achievementManager`

Works **outside of React** — use this inside Zustand stores, Redux thunks, or any non-component code. No hook required.

```tsx
import { achievementManager } from "react-sticker-achievements/context";
```

> `achievementManager` is a no-op until `AchievementProvider` mounts. Make sure your provider is mounted before calling it.

### With Zustand

```ts
import { create } from "zustand";
import { achievementManager } from "react-sticker-achievements/context";

const useGameStore = create((set, get) => ({
  score: 0,

  addScore: (amount: number) => {
    const next = get().score + amount;
    set({ score: next });
    achievementManager.track("score", next);
  },

  completeTutorial: () => {
    achievementManager.unlock("tutorial-complete");
  },
}));
```

### With Redux Thunks

```ts
import { achievementManager } from "react-sticker-achievements/context";

export const submitScore = (score: number) => (dispatch) => {
  dispatch(setScore(score));
  achievementManager.track("score", score);
};
```

---

## Achievement Queue

If multiple achievements unlock at the same time, they display one after another. Each one waits for the user to peel the sticker before the next one appears.

```tsx
// These will queue up and show one by one
unlock("first-login");
unlock("burger-tower");
unlock("high-score");
```

---

## Full Example

```tsx
import AchievementProvider from "react-sticker-achievements";
import { useAchievements } from "react-sticker-achievements/context";
import { useState } from "react";
import mySticker from "./assets/my-sticker.png";

const achievements = [
  { id: "welcome", title: "Welcome!", sticker: mySticker },
  { id: "century", title: "Century Score!", sticker: mySticker, metric: "score", threshold: 100 },
  { id: "veteran", title: "Veteran Player!", sticker: mySticker, metric: "sessions", threshold: 10 },
];

const Game = () => {
  const { unlock, track } = useAchievements();
  const [score, setScore] = useState(0);

  const addPoints = (n: number) => {
    const next = score + n;
    setScore(next);
    track("score", next);
  };

  return (
    <div>
      <p>Score: {score}</p>
      <button onClick={() => unlock("welcome")}>Start</button>
      <button onClick={() => addPoints(25)}>+25 Points</button>
      <button onClick={() => track("sessions", 10)}>Simulate 10 Sessions</button>
    </div>
  );
};

export default function App() {
  return (
    <AchievementProvider achievements={achievements}>
      <Game />
    </AchievementProvider>
  );
}
```
