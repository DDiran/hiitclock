<script lang="ts">
import SettingsSets from "$lib/components/SettingsSets.svelte";
import SettingsTime from "$lib/components/SettingsTime.svelte";
import OptionCard from "$lib/components/OptionCard.svelte";

import TimerImage from "$lib/assets/timer.png?as=src&width=500&height=300&quality=95&format=webp";
import SetImage from "$lib/assets/sets.png?as=src&width=500&height=300&quality=95&format=webp";
import WorkoutImage from "$lib/assets/workout.png?as=src&width=500&height=300&quality=95&format=webp";

import { showSettings } from "$lib/stores/workoutStore";

let selectedOption = "sets";

function onSelectOption(value: string) {
  selectedOption = value;
}
</script>

{#if showSettings}
  <form>
    <div class="flex flex-row gap-4 justify-center">
      <OptionCard
        checked={selectedOption === "sets"}
        value="sets"
        onSelectOption={onSelectOption}
        id="time-select"
        image={TimerImage}
        category="Time-Based"
        title="Workout by Time"
        copy="Choose the duration of your workout." />
      <OptionCard
        checked={selectedOption === "workoutTime"}
        value="workoutTime"
        onSelectOption={onSelectOption}
        id="set-select"
        image={SetImage}
        category="Exercise-Based"
        title="Workout by # Sets"
        copy="Choose how many sets to complete." />
      <OptionCard
        checked={selectedOption === "None"}
        value="None"
        onSelectOption={onSelectOption}
        id="workout-select"
        image={WorkoutImage}
        category="Program-Based"
        title="Workout like a Pro"
        copy="Choose from proven best workouts." />
    </div>
    <div class="flex flex-col my-9 mx-96">
      <button
        class="btn brn-tertiary btn-xl justify-center text-center object-centers"
        on:click={() => (showSettings = true)}>Next</button>
    </div>
  </form>
{:else if showSettings}
  {#if selectedOption === "sets"}
    <SettingsSets />
  {:else if selectedOption === "workoutTime"}
    <SettingsTime />
  {/if}
{/if}
