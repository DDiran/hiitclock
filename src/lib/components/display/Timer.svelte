<script lang="ts">
import {
  timerStore,
  startTimer,
  pauseTimer,
  resetTimer,
} from "$lib/stores/timerStore";
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
