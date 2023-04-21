<script lang="ts">
import SettingsSets from "$lib/components/SettingsSets.svelte";
import SettingsTime from "$lib/components/SettingsTime.svelte";
import OptionCard from "$lib/components/OptionCard.svelte";

import TimerImage from "$lib/assets/timer.png?as=src&width=500&height=300&quality=95&format=webp";
import SetImage from "$lib/assets/sets.png?as=src&width=500&height=300&quality=95&format=webp";

let selectedOption = "sets";
let showSettings = false;

function onSelectOption(value: string) {
  selectedOption = value;
}
</script>

<div class="options">
  <h2>Select an option:</h2>
  <label>
    <input type="radio" value="sets" bind:group={selectedOption} />
    Set the number of sets
  </label>
  <label>
    <input type="radio" value="workoutTime" bind:group={selectedOption} />
    Set the workout time
  </label>
  <button class="btn brn-tertiary btn-xl" on:click={() => (showSettings = true)}
    >Next</button>
</div>

<form>
  <div class="flex flex-row gap-4 justify-center">
    <OptionCard
      checked={selectedOption === "sets"}
      value="sets"
      onSelectOption={onSelectOption}
      id="time-select"
      image={TimerImage}
      title="Workout by Time" />
    <OptionCard
      checked={selectedOption === "workoutTime"}
      value="workoutTime"
      onSelectOption={onSelectOption}
      id="set-select"
      image={SetImage}
      title="Workout by # Sets" />
  </div>
</form>

{#if showSettings}
  {#if selectedOption === "sets"}
    <SettingsSets />
  {:else if selectedOption === "workoutTime"}
    <SettingsTime />
  {/if}
{/if}
