<script lang="ts">
import { onMount } from "svelte";
import {
  timerStore,
  startTimer,
  pauseTimer,
  resetTimer,
  incrementCurrentSet,
  decrementCurrentSet,
  formatTime,
} from "$lib/timerStore";

let minutes: string;
let seconds: string;

onMount(() => {
  minutes = formatTime(Math.floor($timerStore.countdown / 60));
  seconds = formatTime($timerStore.countdown % 60);
});
</script>

<div
  class="min-h-screen bg-gray-100 flex items-center justify-center text-black">
  <div class="bg-white p-8 rounded-lg shadow-md w-80">
    <h1 class="text-3xl font-semibold mb-6 text-center">Interval Timer</h1>
    <div class="text-center">
      <p>
        Set:
        <span class="font-semibold">
          {$timerStore.currentSet} / {$timerStore.sets}
        </span>
      </p>
      <p class="text-lg font-semibold">
        {$timerStore.isWork ? "Work" : "Rest"}
      </p>
      <p class="text-6xl font-bold mb-6">{minutes}:{seconds}</p>
      <div class="flex items-center justify-center space-x-4">
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded-lg"
          on:click={startTimer}>
          Start
        </button>
        <button
          class="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          on:click={pauseTimer}>
          Pause
        </button>
        <button
          class="bg-red-500 text-white px-4 py-2 rounded-lg"
          on:click={resetTimer}>
          Reset
        </button>
      </div>
      <div class="mt-6 flex items-center justify-center space-x-4">
        <button
          class="bg-gray-300 text-black px-4 py-2 rounded-lg"
          on:click={decrementCurrentSet}>
          Prev Set
        </button>
        <button
          class="bg-gray-300 text-black px-4 py-2 rounded-lg"
          on:click={incrementCurrentSet}>
          Next Set
        </button>
      </div>
    </div>
  </div>
</div>
