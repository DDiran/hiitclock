import { test } from "vitest";
import {
  render,
  fireEvent,
  getByLabelText,
  screen,
} from "@testing-library/svelte";
import Settings from "$lib/components/Settings.svelte";

test("Settings: input fields are updated correctly", async () => {
  const { container } = render(Settings, {
    props: { sets: 10, workTime: 30, restTime: 10, timerActive: false },
  });

  const setsInput = getByLabelText(
    container,
    "Number of Sets"
  ) as HTMLInputElement;
  const workTimeInput = getByLabelText(
    container,
    "Time per set"
  ) as HTMLInputElement;
  const restTimeInput = getByLabelText(
    container,
    "Rest time"
  ) as HTMLInputElement;

  await fireEvent.input(setsInput, { target: { value: "12" } });
  await fireEvent.input(workTimeInput, { target: { value: "45" } });
  await fireEvent.input(restTimeInput, { target: { value: "15" } });

  expect(setsInput.value).toBe("12");
  expect(workTimeInput.value).toBe("45");
  expect(restTimeInput.value).toBe("15");
});

test("Settings: input fields are disabled when timer is active", async () => {
  render(Settings, {
    props: { sets: 10, workTime: 30, restTime: 10, timerActive: true },
  });

  const setsInput = screen.getByLabelText("Number of Sets");
  const workTimeInput = screen.getByLabelText("Time per set");
  const restTimeInput = screen.getByLabelText("Rest time");

  expect(setsInput).toHaveProperty("disabled", true);
  expect(workTimeInput).toHaveProperty("disabled", true);
  expect(restTimeInput).toHaveProperty("disabled", true);
});
