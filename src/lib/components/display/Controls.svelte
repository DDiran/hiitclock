<script lang="ts">
import { Icon, Pause } from "svelte-hero-icons";
import {
  timerStore,
  startTimer,
  pauseTimer,
  resetTimer,
  unpauseTimer,
} from "$lib/stores/timerStore";
import { showSettings } from "$lib/stores/workoutStore";
import { fade } from "svelte/transition";
</script>

<div in:fade class="flex justify-center space-x-4 mt-8">
  {#if !$timerStore.workoutStarted}
    {#if $showSettings}
      <button
        class=" border-white border rounded-2xl px-16 py-4 hover:bg-primary hover:border-primary"
        on:click={() => ($showSettings = false)}>Back</button>
      <button
        class=" border-primary bg-primary border rounded-2xl px-16 py-4 hover:bg-secondary hover:border-secondary"
        on:click={startTimer}>Let's Go</button>
    {/if}
  {/if}
  {#if $timerStore.workoutStarted && !$timerStore.workoutPaused}
    <button class="btn btn-circle btn-lg" on:click={pauseTimer}
      ><Icon size="32" class="text-white" src={Pause} /></button>
  {/if}
  {#if $timerStore.workoutStarted && $timerStore.workoutPaused}
    <button
      class="border-secondary border rounded-2xl px-16 py-4 hover:bg-secondary hover:border-secondary"
      on:click={unpauseTimer}>Continue</button>
    <button
      class="border-primary border rounded-2xl px-16 py-4 hover:bg-primary hover:border-primary"
      on:click={resetTimer}>Reset</button>
  {/if}
</div>
