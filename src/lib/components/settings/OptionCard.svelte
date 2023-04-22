<script lang="ts">
import { Icon, CheckCircle } from "svelte-hero-icons";
import { fade } from "svelte/transition";

export let checked: boolean = false;
export let id: string;
export let image: string;
export let title: string;
export let value: string;
export let onSelectOption: (value: string) => void;
export let category: string;
export let copy: string;
export let disabled: boolean = false;
</script>

<div id="card-{id}">
  <input
    id={id}
    on:change={() => onSelectOption(value)}
    class="hidden peer"
    type="radio"
    name="workout-options"
    value={value}
    disabled={disabled}
    checked={checked}
    in:fade|local={{ duration: 300 }} />
  <label
    class="card shadow-xl rounded-md w-96 bg-base-400 border-4 border-base-400 {disabled
      ? 'cursor-not-allowed'
      : 'cursor-pointer hover:border-4 peer-checked:border-4 hover:border-primary peer-checked:border-primary'} "
    for={id}>
    {#if checked}
      <div class="absolute top-0 right-0 mt-2 mr-2 text-primary">
        <Icon src={CheckCircle} class="h-10 w-10" />
      </div>
    {/if}
    <figure class="px-10 pt-10">
      <img
        src={image}
        alt="Shoes"
        class="rounded-xl {disabled ? 'grayscale' : ''}" />
    </figure>
    <div
      class="card-body items-center text-center {disabled ? 'grayscale' : ''}">
      <span class="text-primary font-sans uppercase text-xs leading-3"
        >{category}</span>
      <h2 class="card-title font-serif text-2xl">{title}</h2>
      <p class=" italic text-lg leading-6 opacity-70">
        {copy}
      </p>
    </div>
  </label>
</div>
