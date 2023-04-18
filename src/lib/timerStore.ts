import { writable, derived } from "svelte/store";
import {
  DEFAULT_SETS,
  DEFAULT_WORK_TIME,
  DEFAULT_REST_TIME,
} from "$lib/constants";

export interface TimerState {
  sets: number;
  workTime: number;
  restTime: number;
  countdown: number;
  currentSet: number;
  isWork: boolean;
  workoutStarted: boolean;
}

const initialState: TimerState = {
  sets: DEFAULT_SETS,
  workTime: DEFAULT_WORK_TIME,
  restTime: DEFAULT_REST_TIME,
  countdown: DEFAULT_WORK_TIME,
  currentSet: 1,
  isWork: true,
  workoutStarted: false,
};

const timerStore = writable<TimerState>(initialState);

let interval: ReturnType<typeof setInterval>;

function startTimer() {
  timerStore.update((state: TimerState): TimerState => {
    if (!state.workoutStarted) {
      state.countdown = state.workTime;
      interval = setInterval(() => {
        timerStore.update(updateTimer);
      }, 1000);
      return { ...state, workoutStarted: true };
    }
    return state;
  });
}

function updateCountdown(state: TimerState): TimerState {
  return { ...state, countdown: state.countdown - 1 };
}

function switchWorkRest(state: TimerState): TimerState {
  return {
    ...state,
    isWork: !state.isWork,
    countdown: state.isWork ? state.restTime : state.workTime,
  };
}

function moveToNextSet(state: TimerState): TimerState {
  return {
    ...state,
    isWork: true,
    countdown: state.workTime,
    currentSet: state.currentSet + 1,
  };
}

function stopWorkout(state: TimerState): TimerState {
  clearInterval(interval);
  return { ...state, workoutStarted: false };
}

function updateTimer(state: TimerState): TimerState {
  if (state.countdown > 0) {
    return updateCountdown(state);
  } else {
    if (state.isWork && state.currentSet < state.sets) {
      return switchWorkRest(state);
    } else if (!state.isWork && state.currentSet <= state.sets) {
      return moveToNextSet(state);
    } else {
      return stopWorkout(state);
    }
  }
}

function pauseTimer() {
  timerStore.update((state: TimerState): TimerState => {
    clearInterval(interval);
    return { ...state, workoutStarted: false };
  });
}

function resetTimer() {
  timerStore.update((state: TimerState): TimerState => {
    clearInterval(interval);
    return initialState;
  });
}

function incrementCurrentSet() {
  timerStore.update((state: TimerState): TimerState => {
    return { ...state, currentSet: state.currentSet + 1 };
  });
}

function decrementCurrentSet() {
  timerStore.update((state: TimerState): TimerState => {
    return { ...state, currentSet: state.currentSet - 1 };
  });
}

const formatTime = (value: number): string => {
  return value.toString().padStart(2, "0");
};

const totalWorkoutTime = derived(
  timerStore,
  ($timerStore) =>
    ($timerStore.workTime + $timerStore.restTime) * $timerStore.sets
);

const progressPercentage = derived(
  [timerStore, totalWorkoutTime],
  ([$timerStore, $totalWorkoutTime]) => {
    const elapsedTimeInCurrentSet = $timerStore.isWork
      ? $timerStore.workTime - $timerStore.countdown
      : $timerStore.workTime + $timerStore.restTime - $timerStore.countdown;

    const completedTime =
      ($timerStore.currentSet - 1) *
        ($timerStore.workTime + $timerStore.restTime) +
      elapsedTimeInCurrentSet;

    return Math.max(0, (completedTime / $totalWorkoutTime) * 100);
  }
);

export {
  timerStore,
  updateCountdown,
  switchWorkRest,
  moveToNextSet,
  stopWorkout,
  updateTimer,
  startTimer,
  pauseTimer,
  resetTimer,
  incrementCurrentSet,
  decrementCurrentSet,
  formatTime,
  totalWorkoutTime,
  progressPercentage,
};
