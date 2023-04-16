<script lang="ts">
import { onMount, onDestroy } from "svelte";
import { browser } from "$app/environment";
import JSConfetti from "js-confetti";

import Settings from "$lib/components/Settings.svelte";
import Display from "$lib/components/Display.svelte";
import Controls from "$lib/components/Controls.svelte";
import Seo from "$lib/components/SEO.svelte";
import Navbar from "$lib/components/Navbar.svelte";

import { createAudioContext, playShortBeep, playLongBeep } from "$lib/audio";
import type { TimerId } from "$lib/timer";
import {
  startTimer as startTimerUtil,
  stopTimer as stopTimerUtil,
} from "$lib/timer";

let sets: number = 10;
let workTime: number = 40;
let restTime: number = 20;

let timerActive: boolean = false;
let paused: boolean = false;
let currentSet: number = 1;
let mode: "work" | "rest" = "work";
let remainingTime: number = workTime;
let intervalId: TimerId;
let jsConfetti: JSConfetti | undefined;

let audioContext: AudioContext | undefined;

$: totalWorkoutTime = (workTime + restTime) * sets - restTime;
$: timeElapsed =
  (currentSet - 1) * (workTime + restTime) +
  (mode === "work"
    ? workTime - remainingTime
    : workTime + restTime - remainingTime);

function startTimer(): void {
  if (!timerActive) {
    timerActive = true;
    paused = false;
    intervalId = startTimerUtil(countdown);
  }
}

function stopTimer(): void {
  stopTimerUtil(intervalId);
  timerActive = false;
  paused = true;
}

function resetTimer(): void {
  clearInterval(intervalId);
  timerActive = false;
  paused = false;
  currentSet = 1;
  remainingTime = workTime;
  mode = "work";
}

function countdown(): void {
  remainingTime--;

  if (remainingTime <= 3 && remainingTime > 0) {
    if (audioContext) {
      playShortBeep(audioContext);
    }
  }

  if (remainingTime === 0) {
    if (audioContext) {
      playLongBeep(audioContext);
    }

    if (mode === "work" && currentSet < sets) {
      mode = "rest";
      remainingTime = restTime;
    } else {
      currentSet++;
      if (currentSet > sets) {
        stopTimer();
        currentSet = 1;
        if (jsConfetti) {
          jsConfetti.addConfetti({
            // emojis: ["💪", "🏋️", "🏃", "🎊", "🎉", "🥳"],
            emojis: ["💪"],
            emojiSize: 100,
            confettiNumber: 500,
          });
        }
      } else {
        mode = "work";
        remainingTime = workTime;
      }
    }
  }
}

if (browser) {
  audioContext = createAudioContext();
}

onMount(() => {
  jsConfetti = new JSConfetti();
});

onDestroy(() => {
  jsConfetti?.clearCanvas();
});
</script>

<Seo />

<Navbar />

<main class="container mx-auto mb-auto mt-10 flex-grow">
  <Settings
    bind:sets={sets}
    bind:workTime={workTime}
    bind:restTime={restTime}
    timerActive={timerActive} />
  <Controls
    timerActive={timerActive}
    paused={paused}
    startTimer={startTimer}
    stopTimer={stopTimer}
    resetTimer={resetTimer} />

  <div class="my-24">
    <Display
      timerActive={timerActive}
      currentSet={currentSet}
      sets={sets}
      remainingTime={remainingTime}
      mode={mode}
      totalWorkoutTime={totalWorkoutTime}
      timeElapsed={timeElapsed} />
  </div>
</main>

<footer class="footer footer-center mt-auto p-4 bg-base-400 text-base-content">
  <div class="text-white font-sans">
    <!-- copyright current year -->
    <p>
      Copyright © {new Date().getFullYear()} - Made with
      <span aria-label="love">❤️</span> in Italy
    </p>
  </div>
</footer>
