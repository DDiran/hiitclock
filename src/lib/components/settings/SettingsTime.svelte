<script lang="ts">
import { timerStore } from "$lib/stores/timerStore";
import NumberInput from "$lib/components/NumberInput.svelte";

let totalWorkoutTime = 30;
let restTime = 10;

const startWorkout = () => {
  $timerStore.sets = Math.floor(
    (totalWorkoutTime * 60) / ($timerStore.workTime + restTime)
  );
  $timerStore.restTime = restTime;
  $timerStore.workoutStarted = true;
};
</script>

<form>
  <div class="grid justify-center lg:grid-cols-2 gap-4 mx-12 md:mx-auto">
    <NumberInput
      id="totalWorkoutTime"
      label="Total workout time (minutes)"
      bind:value={totalWorkoutTime}
      on:update={(e) => (totalWorkoutTime = e.detail)}
      min={1} />
    <NumberInput
      id="restTime"
      label="Rest time (seconds)"
      bind:value={restTime}
      on:update={(e) => (restTime = e.detail)}
      min={1} />
  </div>
</form>
