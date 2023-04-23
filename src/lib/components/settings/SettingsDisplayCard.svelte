<script lang="ts">
export let displayMode: "timeMode" | "setsMode" = "timeMode";
export let displayNumber: number = 0;

let workoutTimeMinutes: number = 0;
$: workoutTimeMinutes = Math.round(displayNumber / 60);
$: displayCorrect =
  displayMode === "timeMode" ? displayNumber : workoutTimeMinutes;
</script>

<div class="flex flex-row justify-center">
  <div
    class="w-full bg-center max-w-xs p-8 mb-12 bg-primary shadow-lg rounded-lg text-center">
    {#if displayMode === "timeMode"}
      <div class="text-xl font-bold mb-4">Number of Sets</div>
    {:else if displayMode === "setsMode"}
      <div class="text-xl font-bold mb-4">Total Workout Time</div>
    {/if}
    <div class="text-5xl font-bold">{displayCorrect}</div>
  </div>
</div>
