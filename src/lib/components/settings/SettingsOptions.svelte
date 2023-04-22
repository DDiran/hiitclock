<script lang="ts">
import SettingsSets from "$lib/components/settings/SettingsSets.svelte";
import SettingsTime from "$lib/components/settings/SettingsTime.svelte";
import OptionCard from "$lib/components/settings/OptionCard.svelte";

// @ts-ignore
import TimerImage from "$lib/assets/timer.png?as=src&width=500&height=300&quality=95&format=webp";
// @ts-ignore
import SetImage from "$lib/assets/sets.png?as=src&width=500&height=300&quality=95&format=webp";
// @ts-ignore
import WorkoutImage from "$lib/assets/workout.png?as=src&width=500&height=300&quality=95&format=webp";

import { showSettings } from "$lib/stores/workoutStore";

let selectedOption = "time";

function onSelectOption(value: string) {
  selectedOption = value;
}
</script>

{#if !$showSettings}
  <div class="flex flex-col gap-9 mb-12">
    <h1 class="text-4xl text-center leading-9 font-bold font-serif">
      Welcome to Just HIIT
    </h1>
    <h2 class="text-xl text-center leading-7 opacity-70 font-sans">
      Choose the best option to start configuring your perfect workout.
    </h2>
  </div>
  <form>
    <div class="flex flex-col md:flex-row gap-4 justify-center">
      <OptionCard
        checked={selectedOption === "time"}
        value="time"
        onSelectOption={onSelectOption}
        id="time-select"
        image={TimerImage}
        category="Time-Based"
        title="Workout by Time"
        copy="Choose the duration of your workout." />
      <OptionCard
        checked={selectedOption === "sets"}
        value="sets"
        onSelectOption={onSelectOption}
        id="set-select"
        image={SetImage}
        category="Set-Based"
        title="Workout by # Sets"
        copy="Choose how many sets to complete." />
      <OptionCard
        checked={selectedOption === "workout"}
        value="workout"
        onSelectOption={onSelectOption}
        id="workout-select"
        image={WorkoutImage}
        category="Exercise-Based"
        title="Workout like a Pro"
        copy="Choose from proven best workouts."
        disabled />
    </div>
    <div class="flex flex-wrap justify-center my-12">
      <button
        class="btn btn-primary btn-lg"
        on:click={() => ($showSettings = true)}>Let's Get Started</button>
    </div>
  </form>
{:else if $showSettings}
  {#if selectedOption === "time"}
    <SettingsTime />
  {:else if selectedOption === "sets"}
    <SettingsSets />
  {/if}
{/if}
