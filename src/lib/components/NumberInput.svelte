<script lang="ts">
import { Icon, Plus, Minus } from "svelte-hero-icons";
import { createEventDispatcher } from "svelte";

export let id: string = "";
export let label: string = "";
export let value: number = 0;
export let min: number = 1;
export let disabled: boolean = false;

const dispatch = createEventDispatcher();

const increment = (): void => {
  value = Math.min(value + 1, 999);
  dispatch("update", value);
};
const decrement = (): void => {
  value = Math.max(value - 1, min);
  dispatch("update", value);
};

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  dispatch("update", target.valueAsNumber);
};
</script>

<div class="form-control w-full">
  <label class="label" for={id}>
    <span class="label-text text-white">{label}</span>
  </label>
  <div class="flex">
    <button
      on:click={decrement}
      type="button"
      class="btn btn-square btn-ghost rounded-none bg-base-400 hover:bg-primary"
      disabled={disabled}>
      <Icon class="w-6 h-6" src={Minus} />
    </button>
    <input
      id={id}
      type="number"
      class="text-dark input input-bordered rounded-none w-full max-w-sm"
      bind:value={value}
      min={min}
      on:input={handleInput}
      disabled={disabled} />
    <button
      on:click={increment}
      type="button"
      class="btn btn-square btn-ghost rounded-none bg-base-400 hover:bg-primary"
      disabled={disabled}>
      <Icon class="w-6 h-6" src={Plus} />
    </button>
  </div>
</div>
