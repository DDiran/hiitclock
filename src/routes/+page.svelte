<script lang="ts">
  import { browser } from '$app/environment';

  import Settings from "../lib/Settings.svelte";
  import Display from "../lib/Display.svelte";
  import Controls from "../lib/Controls.svelte";
  import Seo from '../lib/SEO.svelte';

  let sets: number = 10;
  let workTime: number = 40;
  let restTime: number = 20;

  let timerActive: boolean = false;
  let paused: boolean = false;
  let currentSet: number = 1;
  let mode: 'work' | 'rest' = 'work';
  let remainingTime: number = workTime;
  let intervalId: number;

  let audioContext: AudioContext | undefined;

  $: totalWorkoutTime = (workTime + restTime) * sets - restTime;
  $: timeElapsed = (currentSet - 1) * (workTime + restTime) + (mode === 'work' ? workTime - remainingTime : workTime + restTime - remainingTime);

  function startTimer(): void {
    if (!timerActive) {
      timerActive = true;
      paused = false;
      countdown();
    }
  }

  function stopTimer(): void {
    clearInterval(intervalId);
    timerActive = false;
    paused = true;
  }

  function resetTimer(): void {
    clearInterval(intervalId);
    timerActive = false;
    paused = false;
    currentSet = 1;
    remainingTime = workTime;
    mode = 'work';
  }

  function countdown(): void {
    intervalId = setInterval(() => {
      remainingTime--;

      if (remainingTime <= 3 && remainingTime > 0) {
        playShortBeep();
      }

      if (remainingTime === 0) {
        playLongBeep();

        if (mode === 'work' && currentSet < sets) {
          mode = 'rest';
          remainingTime = restTime;
        } else {
          currentSet++;
          if (currentSet > sets) {
            stopTimer();
            currentSet = 1;
          } else {
            mode = 'work';
            remainingTime = workTime;
          }
        }
      }
    }, 1000);
  }

  if (browser && typeof AudioContext !== 'undefined') {
  audioContext = new AudioContext();
}

  function playShortBeep(): void {
    const duration = 0.1;
    playBeep(660, duration);
  }

  function playLongBeep(): void {
    const duration = 0.5;
    playBeep(440, duration);
  }

  function playBeep(frequency: number, duration: number): void {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.stop(audioContext.currentTime + duration);
  }
</script>

<Seo />

  <div class="navbar bg-base-400 shadow-md">
    <div class="container mx-auto">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">JustHIIT.it</a>
      </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>Workout Time: {Math.round(totalWorkoutTime/60)} minutes</li>
      </div>
  </div>
  </div>

  <main class="container mx-auto mb-auto mt-10 flex-grow">
    <Settings bind:sets bind:workTime bind:restTime {timerActive} />
    <Controls {timerActive} {paused} {startTimer} {stopTimer} {resetTimer} />
  
    <div class="my-24">
      <Display {currentSet} {sets} {remainingTime} {mode} {totalWorkoutTime} {timeElapsed} />
    </div>
  </main>
  
  <!-- <footer class="footer footer-center mt-auto p-4 bg-base-400 text-base-content">
    <div class="text-white font-sans">
      <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
    </div>
  </footer> -->