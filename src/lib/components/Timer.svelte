<!-- <script lang="ts">
import { onDestroy } from "svelte";
import {
  timerStore,
  incrementCount,
  decrementCount,
  incrementCurrentSet,
  decrementCurrentSet,
  startTimer,
  pauseTimer,
  resetTimer,
  formatTime,
} from "$lib/timerStore";

let showControls = false;

const handleStart = () => {
  startTimer();
  showControls = true;
};

onDestroy(() => {
  resetTimer();
});
</script>

<section
  class="bg-white text-gray-900 min-h-screen flex flex-col items-center justify-center">
  <h1 class="text-4xl font-bold mb-8">HIIT Timer</h1>

  <div class="flex items-center mb-8">
    <label for="workTime" class="mr-4 font-semibold">Work Time:</label>
    <button
      id="workTime"
      class="bg-blue-500 text-white px-4 py-2 rounded mr-4"
      on:click={() => incrementCount()}>+</button>
    <h2 class="text-3xl font-semibold">{$timerStore.count}</h2>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded ml-4"
      on:click={() => decrementCount()}>-</button>
  </div>

  <div class="flex items-center mb-8">
    <label for="sets" class="mr-4 font-semibold">Sets:</label>
    <button
      id="sets"
      class="bg-blue-500 text-white px-4 py-2 rounded mr-4"
      on:click={() => incrementCurrentSet()}>+</button>
    <h2 class="text-3xl font-semibold">{$timerStore.currentSet}</h2>
    <button
      class="bg-blue-500 text-white px-4 py-2 rounded ml-4"
      on:click={() => decrementCurrentSet()}>-</button>
  </div>

  <div class="mb-8">
    <h2 class="text-3xl font-semibold">
      {formatTime(Math.floor($timerStore.count / 60))}:{formatTime(
        $timerStore.count % 60
      )}
    </h2>
  </div>

  <div class="flex space-x-4 mb-8">
    <button
      class="bg-green-500 text-white px-4 py-2 rounded"
      on:click={handleStart}>Start</button>
    {#if showControls}
      <button
        class="bg-yellow-500 text-white px-4 py-2 rounded"
        on:click={() => pauseTimer()}>Pause</button>
      <button
        class="bg-red-500 text-white px-4 py-2 rounded"
        on:click={() => resetTimer()}>Reset</button>
    {/if}
  </div>

  {#each Array.from({ length: $timerStore.currentSet }) as _, i (i)}
    <div class="bg-blue-100 text-blue-800 px-4 py-2 rounded mb-2">
      Set {i + 1}
    </div>
  {/each}
</section> -->

<script lang="ts">
import {
  timerStore,
  startTimer,
  pauseTimer,
  resetTimer,
  incrementCurrentSet,
  decrementCurrentSet,
  formatTime,
} from "$lib/timerStore";
</script>

<div class="container mx-auto p-4">
  <div class="flex flex-col justify-center items-center">
    <h1 class="text-6xl font-bold mb-4">HIIT Clock</h1>
    <div class="flex space-x-4">
      <div class="flex flex-col items-center">
        <label for="work-time" class="text-xl mb-2">Work Time</label>
        <input
          id="work-time"
          type="number"
          class="border-2 border-gray-300 px-3 py-2 text-lg text-center w-24"
          bind:value={$timerStore.workTime} />
      </div>
      <div class="flex flex-col items-center">
        <label for="rest-time" class="text-xl mb-2">Rest Time</label>
        <input
          id="rest-time"
          type="number"
          class="border-2 border-gray-300 px-3 py-2 text-lg text-center w-24"
          bind:value={$timerStore.restTime} />
      </div>
      <div class="flex flex-col items-center">
        <label for="sets" class="text-xl mb-2">Sets</label>
        <input
          id="sets"
          type="number"
          class="border-2 border-gray-300 px-3 py-2 text-lg text-center w-24"
          bind:value={$timerStore.sets} />
      </div>
    </div>

    <span>Countdown: {$timerStore.countdown}</span>
    <span>Current Set: {$timerStore.currentSet}</span>
    {#if $timerStore.isWork}<span>Work Time!</span>{:else}<span>Rest Time!</span
      >{/if}
    {#if $timerStore.workoutStarted}<span>Let's Go!</span>{:else}<span
        >Awaiting Start</span
      >{/if}

    {#if !$timerStore.workoutStarted}
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        on:click={() => startTimer()}>
        Start
      </button>
    {:else}
      <div class="flex space-x-4 mt-4">
        <button
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          on:click={() => pauseTimer()}>
          Pause
        </button>
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          on:click={() => resetTimer()}>
          Reset
        </button>
      </div>
    {/if}
  </div>
</div>
