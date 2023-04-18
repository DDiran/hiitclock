<script lang="ts">
import { onMount, createEventDispatcher } from "svelte";
import { timerStore } from "$lib/timerStore";
import type { TimerState } from "$lib/timerStore";

const dispatch = createEventDispatcher();

let sets: number = $timerStore.sets;
let workTime: number = $timerStore.workTime;
let restTime: number = $timerStore.restTime;

function loadSettings() {
  const savedSettings = localStorage.getItem("settings");

  if (savedSettings) {
    const { sets, workTime, restTime } = JSON.parse(savedSettings);

    timerStore.update((state: TimerState) => {
      return {
        ...state,
        sets: Number(sets),
        workTime: Number(workTime),
        restTime: Number(restTime),
        countdown: Number(workTime),
      };
    });
  }
}

function saveSettings() {
  timerStore.update((state: TimerState) => {
    return {
      ...state,
      sets: Number(sets),
      workTime: Number(workTime),
      restTime: Number(restTime),
      countdown: Number(workTime),
    };
  });

  localStorage.setItem(
    "settings",
    JSON.stringify({ sets, workTime, restTime })
  );
  dispatch("close");
}

onMount(() => {
  loadSettings();
});
</script>

<form>
  <div class="grid justify-center lg:grid-cols-3 gap-4 mx-12 md:mx-auto">
    <div class="form-control w-full">
      <label class="label" for="sets">
        <span class="label-text text-white">Number of Sets</span>
      </label>
      <input
        id="sets"
        type="number"
        bind:value={sets}
        min="1"
        disabled={$timerStore.workoutStarted}
        class="text-dark input input-bordered w-full max-w-sm" />
    </div>
    <div class="form-control w-full">
      <label class="label" for="time">
        <span class="label-text text-white">Time per set</span>
      </label>
      <input
        id="time"
        type="number"
        bind:value={workTime}
        min="1"
        disabled={$timerStore.workoutStarted}
        class="text-dark input input-bordered w-full max-w-sm" />
    </div>
    <div class="form-control w-full">
      <label class="label" for="rest">
        <span class="label-text text-white">Rest time</span>
      </label>
      <input
        id="rest"
        type="number"
        bind:value={restTime}
        min="1"
        disabled={$timerStore.workoutStarted}
        class="text-dark input input-bordered w-full max-w-sm" />
    </div>
  </div>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="button"
    on:click={saveSettings}>
    Save
  </button>
</form>
