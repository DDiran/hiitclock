export function createAudioContext(): AudioContext | undefined {
  if ("AudioContext" in window) {
    return new AudioContext();
  }
  return undefined;
}

export function playShortBeep(audioContext: AudioContext): void {
  const duration = 0.1;
  playBeep(audioContext, 660, duration);
}

export function playLongBeep(audioContext: AudioContext): void {
  const duration = 0.5;
  playBeep(audioContext, 440, duration);
}

function playBeep(
  audioContext: AudioContext,
  frequency: number,
  duration: number
): void {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.01);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start(audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + duration
  );
  oscillator.stop(audioContext.currentTime + duration);
}
