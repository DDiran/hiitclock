<script lang="ts">
import { onMount, onDestroy } from "svelte";
import { browser } from "$app/environment";
import JSConfetti from "js-confetti";

import Settings from "$lib/components/Settings.svelte";
import Display from "$lib/components/Display.svelte";
import Controls from "$lib/components/Controls.svelte";

import { createAudioContext, playShortBeep, playLongBeep } from "$lib/audio";
import timerStore, {
  startTimer,
  pauseTimer,
  resetTimer,
  incrementSet,
  setMode,
  setRemainingTime,
  setCurrentSet,
} from "$lib/timerStore";

import { fade } from "svelte/transition";
import { cubicOut } from "svelte/easing";

let sets: number = 10;
let workTime: number = 40;
let restTime: number = 20;

let jsConfetti: JSConfetti | undefined;

let audioContext: AudioContext | undefined;

$: totalWorkoutTime = (workTime + restTime) * sets - restTime;
$: timeElapsed =
  ($timerStore.currentSet - 1) * (workTime + restTime) +
  ($timerStore.mode === "Work"
    ? workTime - $timerStore.remainingTime
    : workTime + restTime - $timerStore.remainingTime);

if (browser) {
  audioContext = createAudioContext();
}

onMount(() => {
  jsConfetti = new JSConfetti();
});

onDestroy(() => {
  jsConfetti = undefined;
});

$: {
  if ($timerStore.remainingTime <= 3 && $timerStore.remainingTime > 0) {
    if (audioContext) {
      playShortBeep(audioContext);
    }
  }

  if ($timerStore.remainingTime === 0) {
    if (audioContext) {
      playLongBeep(audioContext);
    }

    if ($timerStore.mode === "Work" && $timerStore.currentSet < sets) {
      setMode("Rest");
      setRemainingTime(restTime);
    } else {
      incrementSet();
      if ($timerStore.currentSet > sets) {
        pauseTimer();
        setCurrentSet(1);
        if (jsConfetti) {
          jsConfetti.addConfetti({
            emojis: ["💪"],
            emojiSize: 75,
            confettiNumber: 300,
          });
        }
      } else {
        setMode("Work");
        setRemainingTime(workTime);
      }
    }
  }
}
</script>

<main class="container mx-auto mb-auto mt-10 flex-grow">
  <Settings
    bind:sets={sets}
    bind:workTime={workTime}
    bind:restTime={restTime}
    timerStatus={$timerStore.timerStatus} />

  <Controls
    startTimer={() => startTimer()}
    pauseTimer={() => pauseTimer()}
    resetTimer={() => resetTimer(workTime)} />

  <div class="my-24">
    {#if $timerStore.timerStatus === "Active" || $timerStore.timerStatus === "Paused"}
      <div transition:fade={{ duration: 750, easing: cubicOut }}>
        <Display
          timerStore={timerStore}
          totalWorkoutTime={totalWorkoutTime}
          timeElapsed={timeElapsed} />
      </div>
    {/if}
  </div>
</main>
