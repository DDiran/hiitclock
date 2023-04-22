<script lang="ts">
import { Icon, CheckCircle } from "svelte-hero-icons";

export let checked: boolean = false;
export let id: string;
export let image: string;
export let title: string;
export let value: string;
export let onSelectOption: (value: string) => void;
export let category: string;
export let copy: string;
</script>

<div>
  <input
    id={id}
    on:change={() => onSelectOption(value)}
    class="hidden peer"
    type="radio"
    name="workout-options"
    value={value}
    checked={checked} />
  <label
    class="card w-96 bg-base-400 shadow-xl cursor-pointer border-4 border-base-400 hover:border-4 peer-checked:border-4 hover:border-primary peer-checked:border-primary"
    for={id}>
    {#if checked}
      <div class="absolute top-0 right-0 mt-2 mr-2 text-primary">
        <Icon src={CheckCircle} class="h-10 w-10" />
      </div>
    {/if}
    <figure class="px-10 pt-10">
      <img src={image} alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <span class="text-primary font-sans uppercase text-xs leading-3"
        >{category}</span>
      <h2 class="card-title font-serif text-2xl">{title}</h2>
      <p class=" italic text-lg leading-6 opacity-70">
        {copy}
      </p>
    </div>
  </label>
</div>
