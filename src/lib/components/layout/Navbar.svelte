<script lang="ts">
import { totalWorkoutTime } from "$lib/stores/timerStore";

let workoutTimeMinutes: number = 0;
$: workoutTimeMinutes = Math.round($totalWorkoutTime / 60);
</script>

<div class="navbar bg-base-400 shadow-md">
  <div class="container mx-auto">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">JustHIIT.it</a>
    </div>
    {#if $totalWorkoutTime > 0}
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>Workout Time: {workoutTimeMinutes} minutes</li>
        </ul>
      </div>
    {/if}
  </div>
</div>
