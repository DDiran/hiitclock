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
  workoutPaused: boolean;
  workoutCompleted: boolean;
}

const initialState: TimerState = {
  sets: DEFAULT_SETS,
  workTime: DEFAULT_WORK_TIME,
  restTime: DEFAULT_REST_TIME,
  countdown: DEFAULT_WORK_TIME,
  currentSet: 1,
  isWork: true,
  workoutStarted: false,
  workoutPaused: false,
  workoutCompleted: false,
};

const timerStore = writable<TimerState>(initialState);

let interval: ReturnType<typeof setInterval>;

// Main timer logic
function startTimer() {
  timerStore.update((state: TimerState): TimerState => {
    if (!state.workoutStarted) {
      state.countdown = state.workTime;
      interval = setInterval(() => {
        timerStore.update(updateTimer);
      }, 1000);
      return {
        ...state,
        workoutStarted: true,
        workoutPaused: false,
        workoutCompleted: false,
      };
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
  return {
    ...state,
    workoutStarted: false,
    workoutPaused: false,
    workoutCompleted: true,
  };
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

// Pause, unpause, and reset timer
function pauseTimer() {
  timerStore.update((state: TimerState): TimerState => {
    clearInterval(interval);
    return { ...state, workoutPaused: true };
  });
}

function unpauseTimer() {
  timerStore.update((state: TimerState): TimerState => {
    if (state.workoutPaused) {
      interval = setInterval(() => {
        timerStore.update(updateTimer);
      }, 1000);
      return { ...state, workoutPaused: false };
    }
    return state;
  });
}

function resetTimer() {
  timerStore.update((state: TimerState): TimerState => {
    clearInterval(interval);
    return initialState;
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

const totalSetTime = derived(
  timerStore,
  ($timerStore) => $timerStore.workTime + $timerStore.restTime
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

    // Adjust total workout time to exclude the last rest time
    const adjustedTotalWorkoutTime = $totalWorkoutTime - $timerStore.restTime;

    return Math.max(0, (completedTime / adjustedTotalWorkoutTime) * 100);
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
  unpauseTimer,
  resetTimer,
  formatTime,
  totalSetTime,
  totalWorkoutTime,
  progressPercentage,
};
