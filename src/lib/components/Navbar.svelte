<script lang="ts">
import { workoutTime } from "$lib/stores";
</script>

<div class="navbar bg-base-400 shadow-md">
  <div class="container mx-auto">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">JustHIIT.it</a>
    </div>
    {#if $workoutTime > 0}
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>Workout Time: {Math.round($workoutTime / 60)} minutes</li>
        </ul>
      </div>
    {/if}
  </div>
</div>
