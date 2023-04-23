<script lang="ts">
import { timerStore, totalSetTime } from "$lib/stores/timerStore";
import NumberInput from "$lib/components/settings/NumberInput.svelte";
import SettingsDisplayCard from "$lib/components/settings/SettingsDisplayCard.svelte";
import { fade } from "svelte/transition";

let workoutMinutes = 15;

const calculateNumberOfSets = () => {
  const totalWorkoutTime = workoutMinutes * 60;
  $timerStore.sets = Math.floor(totalWorkoutTime / $totalSetTime);
};
</script>

<SettingsDisplayCard displayMode="timeMode" displayNumber={$timerStore.sets} />
<form in:fade>
  <div class="grid justify-center lg:grid-cols-3 gap-4 mx-12 md:mx-auto">
    <NumberInput
      id="sets"
      label="What's the total workout time (in minutes?)"
      bind:value={workoutMinutes}
      on:update={calculateNumberOfSets}
      disabled={$timerStore.workoutStarted} />
    <NumberInput
      id="time"
      label="Time per set"
      bind:value={$timerStore.workTime}
      on:update={(e) => ($timerStore.workTime = e.detail)}
      disabled={$timerStore.workoutStarted} />
    <NumberInput
      id="rest"
      label="Rest time"
      bind:value={$timerStore.restTime}
      on:update={(e) => ($timerStore.restTime = e.detail)}
      disabled={$timerStore.workoutStarted} />
  </div>
</form>
