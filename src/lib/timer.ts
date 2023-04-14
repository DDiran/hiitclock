export type TimerId = number | NodeJS.Timeout;

export function startTimer(callback: () => void): TimerId {
  return setInterval(callback, 1000);
}

export function stopTimer(intervalId: TimerId): void {
  clearInterval(intervalId as any);
}
