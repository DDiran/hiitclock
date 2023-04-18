<script lang="ts">
import { onMount } from "svelte";
import { timerStore, formatTime, progressPercentage } from "$lib/timerStore";

let minutes: string;
let seconds: string;

$: {
  minutes = formatTime(Math.floor($timerStore.countdown / 60));
  seconds = formatTime($timerStore.countdown % 60);
}
</script>

<div class="my-24">
  <div class="flex flex-col md:flex-row gap-4 text-center justify-center">
    <div class="w-full md:w-8/12 lg:w-7/12 xl:w-8/12">
      <div class="card w-full h-full bg-base-400 shadow-xl flex flex-col">
        <div class="card-body flex-1">
          <h2 class="card-title justify-center text-4xl font-serif font-normal">
            {$timerStore.isWork ? "Set" : "Rest"}
            {$timerStore.currentSet}/{$timerStore.sets}
          </h2>
          <p class="font-serif text-xl italic opacity-70">Keep it going.</p>
          <div class="justify-center">
            <div class="text-[128px]">
              <span class="[text-shadow:_0_10px_10px_rgba(0,0,0,25%)]"
                >{minutes}:{seconds}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-4/12 lg:w-5/12 xl:w-4/12">
      <div class="card w-full h-full bg-base-400 shadow-xl flex flex-col">
        <div class="card-body flex-1">
          <h2 class="card-title justify-center text-2xl font-serif font-normal">
            Workout Progress
          </h2>
          <p class="font-serif text-xl italic opacity-70">Stay focused.</p>
          <div class="justify-center mt-9">
            <div
              class="radial-progress"
              style="--min: 0; --value:{$progressPercentage}; --size:12rem; --thickness: 1.5rem;">
              {Math.round($progressPercentage)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
