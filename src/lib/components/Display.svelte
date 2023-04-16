<script lang="ts">
import timerStore, {
  setCurrentSet,
  setMode,
  setRemainingTime,
} from "$lib/timerStore";

let currentSet = $timerStore.currentSet;

let progressPercentage: number;

$: progressPercentage = $timerActive
  ? Math.round(($timeElapsed / $totalWorkoutTime) * 100)
  : 0;
</script>

<div class="flex flex-col md:flex-row gap-4 text-center justify-center">
  <div class="w-full md:w-8/12 lg:w-7/12 xl:w-8/12">
    <div class="card w-full h-full bg-base-400 shadow-xl flex flex-col">
      <div class="card-body flex-1">
        <h2 class="card-title justify-center text-4xl font-serif font-normal">
          {$currentMode === "work" ? "Set" : "Rest"}
          {$currentSet}/{$totalSets}
        </h2>
        <p class="font-serif text-xl italic opacity-70">Keep it going.</p>
        <div class="justify-center">
          <div class="text-[128px]">
            <span class="[text-shadow:_0_10px_10px_rgba(0,0,0,25%)]"
              >{Math.floor($remainingTime / 60)}:{(
                "0" +
                ($remainingTime % 60)
              ).slice(-2)}</span>
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
            style="--min: 0; --value:{progressPercentage}; --size:12rem; --thickness: 1.5rem;">
            {progressPercentage}%
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
