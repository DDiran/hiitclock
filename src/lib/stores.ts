import { writable, derived } from "svelte/store";

// Timer State
export const timerActive = writable(false);
export const timerPaused = writable(false);

// Workout Details
export const sets = writable(0);
export const setSeconds = writable(0);
export const restSeconds = writable(0);

// Derived Stores
export const workoutTime = derived(
  [sets, setSeconds, restSeconds],
  ([$sets, $setSeconds, $restSeconds]) =>
    $sets * ($setSeconds + $restSeconds) - $restSeconds / $sets
);
