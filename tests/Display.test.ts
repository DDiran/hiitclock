import { test } from "vitest";
import { render, screen } from "@testing-library/svelte";
import Display from "../src/lib/Display.svelte";

test("Display: should show current set and mode", async () => {
  render(Display, {
    props: {
      currentSet: 2,
      sets: 10,
      remainingTime: 30,
      mode: "work",
      totalWorkoutTime: 600,
      timeElapsed: 60,
    },
  });

  expect(await screen.findByText("Set 2/10")).toBeTruthy();
  expect(await screen.findByText("Workout Progress")).toBeTruthy();
});

test("Display: should show remaining time correctly", async () => {
  render(Display, {
    props: {
      currentSet: 2,
      sets: 10,
      remainingTime: 30,
      mode: "work",
      totalWorkoutTime: 600,
      timeElapsed: 60,
    },
  });

  expect(await screen.findByText("0:30")).toBeTruthy();
});

test("Display: should show progress percentage correctly", async () => {
  render(Display, {
    props: {
      currentSet: 2,
      sets: 10,
      remainingTime: 30,
      mode: "work",
      totalWorkoutTime: 600,
      timeElapsed: 60,
    },
  });

  const progress = await screen.findByText("10%");
  expect(progress).toBeTruthy();

  // Get the computed style value for the progress element
  const progressStyle = getComputedStyle(progress.parentElement as Element);
  expect(progressStyle.getPropertyValue("--value").trim()).toEqual("10");
});
