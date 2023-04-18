<script lang="ts">
import { timerStore } from "$lib/timerStore";
</script>

<form>
  <div class="grid justify-center lg:grid-cols-3 gap-4 mx-12 md:mx-auto">
    <div class="form-control w-full">
      <label class="label" for="sets">
        <span class="label-text text-white">Number of Sets</span>
      </label>
      <input
        id="sets"
        type="number"
        bind:value={$timerStore.sets}
        min="1"
        disabled={$timerStore.workoutStarted}
        class="text-dark input input-bordered w-full max-w-sm" />
    </div>
    <div class="form-control w-full">
      <label class="label" for="time">
        <span class="label-text text-white">Time per set</span>
      </label>
      <input
        id="time"
        type="number"
        bind:value={$timerStore.workTime}
        min="1"
        disabled={$timerStore.workoutStarted}
        class="text-dark input input-bordered w-full max-w-sm" />
    </div>
    <div class="form-control w-full">
      <label class="label" for="rest">
        <span class="label-text text-white">Rest time</span>
      </label>
      <input
        id="rest"
        type="number"
        bind:value={$timerStore.restTime}
        min="1"
        disabled={$timerStore.workoutStarted}
        class="text-dark input input-bordered w-full max-w-sm" />
    </div>
  </div>
</form>
