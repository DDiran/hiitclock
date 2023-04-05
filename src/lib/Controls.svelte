<script lang="ts">
    export let timerActive: boolean;
    export let paused: boolean;
    export let startTimer: () => void;
    export let stopTimer: () => void;
    export let resetTimer: () => void;
  </script>
  
  <div class="flex justify-center space-x-4 mt-8">
    {#if !timerActive && !paused}
      <button class="btn btn-primary" on:click={startTimer}>Start</button>
    {/if}
    {#if timerActive}
      <button class="btn btn-accent" on:click={stopTimer}>Stop</button>
    {/if}
    {#if paused}
      <button class="btn btn-primary" on:click={startTimer}>Continue</button>
      <button class="btn btn-accent" on:click={resetTimer}>Reset</button>
    {/if}
  </div>
  