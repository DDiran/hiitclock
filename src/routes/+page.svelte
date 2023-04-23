<script lang="ts">
import { onMount, onDestroy } from "svelte";
import { browser } from "$app/environment";
import { OnMount } from "fractils";
import { fade } from "svelte/transition";

import SettingsOptions from "$lib/components/settings/SettingsOptions.svelte";
import Display from "$lib/components/display/Display.svelte";
import Controls from "$lib/components/display/Controls.svelte";

import { timerStore } from "$lib/stores/timerStore";
import {
  createAudioContext,
  playShortBeep,
  playLongBeep,
} from "$lib/utils/audio";
import JSConfetti from "js-confetti";

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

<OnMount>
  <div transition:fade class="container mx-auto mb-auto mt-10 flex-grow">
    {#if !$timerStore.workoutStarted}
      <SettingsOptions />
    {/if}
    <Controls />
    {#if $timerStore.workoutStarted}
      <Display />
    {/if}
  </div>
</OnMount>
