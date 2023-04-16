<script lang="ts">
export let sets: number;
export let workTime: number;
export let restTime: number;
export let timerStatus: string;

const timerActive: boolean = timerStatus == "Active" ? true : false;
</script>

<div class="grid justify-center lg:grid-cols-3 gap-4 mx-12 md:mx-auto">
  <div class="form-control w-full">
    <label class="label" for="sets">
      <span class="label-text text-white">Number of Sets</span>
    </label>
    <input
      id="sets"
      type="number"
      bind:value={sets}
      min="1"
      disabled={timerActive}
      class="text-dark input input-bordered w-full max-w-sm" />
  </div>
  <div class="form-control w-full">
    <label class="label" for="time">
      <span class="label-text text-white">Time per set</span>
    </label>
    <input
      id="time"
      type="number"
      bind:value={workTime}
      min="1"
      disabled={timerActive}
      class="text-dark input input-bordered w-full max-w-sm" />
  </div>
  <div class="form-control w-full">
    <label class="label" for="rest">
      <span class="label-text text-white">Rest time</span>
    </label>
    <input
      id="rest"
      type="number"
      bind:value={restTime}
      min="1"
      disabled={timerActive}
      class="text-dark input input-bordered w-full max-w-sm" />
  </div>
</div>
