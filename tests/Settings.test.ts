import { test } from "vitest";
import { render, fireEvent, screen } from "@testing-library/svelte";
import { writable } from "svelte/store";
import Settings from "$lib/components/Settings.svelte";

// Mock timer store
const timerStore = writable({
  sets: 10,
  workTime: 30,
  restTime: 10,
  workoutStarted: false,
});

test("Settings: input fields are updated correctly", async () => {
  render(Settings, { props: { timerStore } });

  const setsInput = screen.getByLabelText("Number of Sets") as HTMLInputElement;
  const workTimeInput = screen.getByLabelText(
    "Time per set"
  ) as HTMLInputElement;
  const restTimeInput = screen.getByLabelText("Rest time") as HTMLInputElement;

  await fireEvent.input(setsInput, { target: { valueAsNumber: 12 } });
  await fireEvent.input(workTimeInput, { target: { valueAsNumber: 45 } });
  await fireEvent.input(restTimeInput, { target: { valueAsNumber: 15 } });

  expect(setsInput.value).toBe("12");
  expect(workTimeInput.value).toBe("45");
  expect(restTimeInput.value).toBe("15");
});

test("Settings: input fields are disabled when timer is active", async () => {
  timerStore.update((store) => ({ ...store, workoutStarted: true }));
  render(Settings, { props: { timerStore } });

  const setsInput = screen.getByLabelText("Number of Sets");
  const workTimeInput = screen.getByLabelText("Time per set");
  const restTimeInput = screen.getByLabelText("Rest time");

  expect(setsInput).toHaveProperty("disabled", true);
  expect(workTimeInput).toHaveProperty("disabled", true);
  expect(restTimeInput).toHaveProperty("disabled", true);
});
