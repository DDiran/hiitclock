import { test } from "vitest";
import { render, screen, waitFor } from "@testing-library/svelte";
import Display from "$lib/components/Display.svelte";

test("Display: should show current set and mode", async () => {
  render(Display, {
    props: {
      currentSet: 2,
      sets: 10,
      remainingTime: 30,
      mode: "work",
      totalWorkoutTime: 600,
      timeElapsed: 60,
      timerActive: false,
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
      timerActive: true,
    },
  });

  expect(await screen.findByText("0:30")).toBeTruthy();
});

test("Display: should show progress percentage correctly", async () => {
  const { component } = render(Display, {
    props: {
      currentSet: 1,
      sets: 10,
      remainingTime: 30,
      mode: "work",
      totalWorkoutTime: 600,
      timeElapsed: 0,
      timerActive: false,
    },
  });

  await component.$set({ timerActive: true, timeElapsed: 60 });

  await waitFor(async () => {
    const progress = await screen.findByText("10%");
    expect(progress).toBeTruthy();
  });
});

test("Display: should not update progress percentage before workout starts", async () => {
  const { component } = render(Display, {
    props: {
      currentSet: 1,
      sets: 10,
      remainingTime: 30,
      mode: "work",
      totalWorkoutTime: 600,
      timeElapsed: 0,
      timerActive: false,
    },
  });

  expect(await screen.findByText("0%")).toBeTruthy();

  await component.$set({ sets: 5, totalWorkoutTime: 300 });

  expect(await screen.findByText("0%")).toBeTruthy();
});

test("Display: should update progress percentage after workout starts", async () => {
  const { component } = render(Display, {
    props: {
      currentSet: 1,
      sets: 10,
      remainingTime: 30,
      mode: "work",
      totalWorkoutTime: 600,
      timeElapsed: 0,
      timerActive: false,
    },
  });

  expect(await screen.findByText("0%")).toBeTruthy();

  await component.$set({ timerActive: true, timeElapsed: 60 });

  expect(await screen.findByText("10%")).toBeTruthy();
});
