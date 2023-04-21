<script lang="ts">
import { onMount, onDestroy } from "svelte";
import { browser } from "$app/environment";

import Settings from "$lib/components/SettingsSets.svelte";
import Display from "$lib/components/Display.svelte";
import Controls from "$lib/components/Controls.svelte";

import { timerStore } from "$lib/timerStore";
import {
  createAudioContext,
  playShortBeep,
  playLongBeep,
} from "$lib/utils/audio";
import JSConfetti from "js-confetti";
import SettingsOptions from "$lib/components/SettingsOptions.svelte";

let audioContext: AudioContext | undefined;
let jsConfetti: JSConfetti | undefined;

// If the workout completes, show confetti
$: {
  if ($timerStore.workoutCompleted) {
    if (jsConfetti) {
      jsConfetti.addConfetti({
        emojis: ["💪"],
        emojiSize: 100,
        confettiNumber: 500,
      });
    }
  }
}

$: {
  if (
    audioContext &&
    $timerStore.countdown <= 3 &&
    $timerStore.countdown >= 0
  ) {
    if ($timerStore.countdown === 0 && !$timerStore.workoutCompleted) {
      playLongBeep(audioContext);
    } else if ($timerStore.countdown > 0) {
      playShortBeep(audioContext);
    }
  }
}

onMount(() => {
  jsConfetti = new JSConfetti();
  // If the browser supports audio, create an audio context
  if (browser) {
    audioContext = createAudioContext();
  }
});

onDestroy(() => {
  jsConfetti?.clearCanvas();
});
</script>

<main class="container mx-auto mb-auto mt-10 flex-grow">
  <SettingsOptions />
  <Controls />
  <Display />
</main>
