<script lang="ts">
import { Icon, Pause } from "svelte-hero-icons";
import {
  timerStore,
  startTimer,
  pauseTimer,
  resetTimer,
} from "$lib/timerStore";
</script>

<div class="flex justify-center space-x-4 mt-8">
  {#if !$timerStore.workoutStarted}
    <button
      class=" border-white border rounded-2xl px-16 py-4 hover:bg-primary hover:border-primary"
      on:click={startTimer}>Let's Go</button>
  {/if}
  {#if $timerStore.workoutStarted}
    <button class="btn btn-circle btn-lg" on:click={pauseTimer}
      ><Icon size="32" class="text-white" src={Pause} /></button>
  {/if}
  {#if !$timerStore.workoutStarted}
    <button
      class="border-secondary border rounded-2xl px-16 py-4 hover:bg-secondary hover:border-secondary"
      on:click={startTimer}>Continue</button>
    <button
      class="border-primary border rounded-2xl px-16 py-4 hover:bg-primary hover:border-primary"
      on:click={resetTimer}>Reset</button>
  {/if}
</div>
