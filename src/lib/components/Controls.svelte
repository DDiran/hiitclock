<script lang="ts">
import { Icon, Pause } from "svelte-hero-icons";
import { startTimer, pauseTimer, resetTimer } from "$lib/timerStore";

export let workTime: number;
export let timerActive: boolean = false;
export let paused: boolean = false;
export let startTimerFunction: () => void = startTimer;
export let pauseTimerFunction: () => void = pauseTimer;
export let resetTimerFunction: () => void = () => resetTimer(workTime);
</script>

<!-- <div class="flex justify-center space-x-4 mt-8">
    {#if !timerActive && !paused}
      <button class=" border-white border rounded-2xl px-16 py-4 hover:bg-primary hover:border-primary" on:click={startTimer}>Start</button>
    {/if}
    {#if timerActive}
      <button class="btn btn-circle btn-lg" on:click={stopTimer}><Icon size="32" class="text-white" src="{ Pause }" /></button>
    {/if}
    {#if paused}
      <button class="border-secondary border rounded-2xl px-16 py-4 hover:bg-secondary hover:border-secondary" on:click={startTimer}>Continue</button>
      <button class="border-primary border rounded-2xl px-16 py-4 hover:bg-primary hover:border-primary" on:click={resetTimer}>Reset</button>
    {/if}
  </div> -->

<div class="flex justify-center space-x-4 mt-8">
  {#if !timerActive && !paused}
    <button on:click={startTimerFunction} class="start">Start</button>
  {:else if timerActive && !paused}
    <button on:click={pauseTimerFunction} class="pause">Pause</button>
  {:else}
    <button on:click={startTimerFunction} class="resume">Resume</button>
  {/if}
  <button on:click={resetTimerFunction} class="reset">Reset</button>
</div>
