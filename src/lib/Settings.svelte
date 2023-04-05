<script lang="ts">
    export let sets: number;
    export let workTime: number;
    export let restTime: number;
  </script>
  
  <div class="grid grid-cols-3 gap-4">
    <div class="form-control">
      <label class="label">
        <span>Sets</span>
        <input type="number" bind:value={sets} min="1" class="input input-bordered" />
      </label>
    </div>
    <div class="form-control">
      <label class="label">
        <span>Work Time</span>
        <input type="number" bind:value={workTime} min="1" class="input input-bordered" />
      </label>
    </div>
    <div class="form-control">
      <label class="label">
        <span>Rest Time</span>
        <input type="number" bind:value={restTime} min="1" class="input input-bordered" />
      </label>
    </div>
  </div>
  