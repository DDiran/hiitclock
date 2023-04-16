import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

interface TimerState {
  sets: number;
  workTime: number;
  restTime: number;
  timerStatus: "Stopped" | "Active" | "Paused";
  currentSet: number;
  mode: "Work" | "Rest";
  remainingTime: number;
  timerId: NodeJS.Timeout | null;
}

const initialState: TimerState = {
  sets: 8,
  workTime: 20,
  restTime: 10,
  timerStatus: "Stopped",
  currentSet: 1,
  mode: "Work",
  remainingTime: 20,
  timerId: null,
};

interface TimerStore extends Writable<TimerState> {
  setCurrentSet: (set: number) => void;
  setMode: (mode: "Work" | "Rest") => void;
  setRemainingTime: (time: number) => void;
  startTimerUtil: (callback: () => void) => NodeJS.Timeout;
  stopTimerUtil: (intervalId: NodeJS.Timeout) => void;
}

const createTimerStore = (): TimerStore => {
  const { subscribe, set, update } = writable<TimerState>(initialState);

  const startTimerUtil = (callback: () => void): NodeJS.Timeout => {
    return setInterval(callback, 1000);
  };

  const stopTimerUtil = (intervalId: NodeJS.Timeout): void => {
    clearInterval(intervalId);
  };

  return {
    subscribe,
    set,
    update,
    setCurrentSet: (setNumber: number) => {
      update((state) => ({ ...state, currentSet: setNumber }));
    },
    setMode: (mode: "Work" | "Rest") => {
      update((state) => ({ ...state, mode }));
    },
    setRemainingTime: (time: number) => {
      update((state) => ({ ...state, remainingTime: time }));
    },
    startTimerUtil,
    stopTimerUtil,
  };
};

const timerStore = createTimerStore();

export default timerStore;

export const {
  subscribe,
  setCurrentSet,
  setMode,
  setRemainingTime,
  startTimerUtil,
  stopTimerUtil,
} = timerStore;

export function startTimer(): void {
  timerStore.update((state) => {
    switch (state.timerStatus) {
      case "Stopped":
        state.timerStatus = "Active";
        state.timerId = timerStore.startTimerUtil(() => {
          timerStore.update((s) => ({
            ...s,
            remainingTime: s.remainingTime - 1,
          }));
        });
        break;
      default:
        break;
    }
    return state;
  });
}

export function pauseTimer(): void {
  timerStore.update((state) => {
    if (state.timerStatus === "Active") {
      if (state.timerId) {
        timerStore.stopTimerUtil(state.timerId);
      }
      state.timerStatus = "Paused";
    }
    return state;
  });
}

export function resetTimer(workTime: number): void {
  timerStore.update((state) => {
    if (state.timerId) {
      timerStore.stopTimerUtil(state.timerId);
    }
    return { ...initialState, remainingTime: workTime };
  });
}

export function incrementSet(): void {
  timerStore.update((state) => {
    state.currentSet++;
    return state;
  });
}
