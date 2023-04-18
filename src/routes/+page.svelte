<script lang="ts">
import { onMount, onDestroy } from "svelte";
import { browser } from "$app/environment";

import Settings from "$lib/components/Settings.svelte";
import Display from "$lib/components/Display.svelte";
import Controls from "$lib/components/Controls.svelte";
// import Timer from "$lib/components/Timer.svelte";
// import TimerTwo from "$lib/components/TimerTwo.svelte";

import {
  createAudioContext,
  playShortBeep,
  playLongBeep,
} from "$lib/utils/audio";
import JSConfetti from "js-confetti";

let audioContext: AudioContext | undefined;
let jsConfetti: JSConfetti | undefined;

function addConfetti() {
  if (jsConfetti) {
    jsConfetti.addConfetti({
      emojis: ["💪"],
      emojiSize: 100,
      confettiNumber: 500,
    });
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

<main class="container mx-auto mb-auto mt-10 flex-grow">
  <Settings />
  <Controls />
  <Display />
  <!-- <TimerTwo /> -->
</main>
