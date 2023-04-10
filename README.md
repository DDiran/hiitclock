# JustHIIT.it

## Introduction

JustHIIT.it is a simple, intuitive, and effective High-Intensity Interval Training (HIIT) & Tabata timer built using SvelteKit and styled with DaisyUI (TailwindCSS). It helps users to stay on track with their workouts by providing a customizable timer that alternates between work and rest periods. Check out the live website at [https://justhiit.it](https://justhiit.it).

## Motivation

I built this because I was fed up with the lack of good HIIT timers on the web. Most of them are either clunky or ask for money. I also wanted to see how quickly I could build and deploy a Svelte App with zero Svelte experience using ChatGPT.

## Libraries & Frameworks

- [Svelte](https://svelte.dev/): A lightweight, modern, and reactive front-end framework for building user interfaces.
- [DaisyUI](https://daisyui.com): A Tailwind CSS component library for building beautiful and responsive websites.
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom user interfaces.
- [pnpm](https://pnpm.io/): A fast, disk space-efficient package manager for Node.js.
- [Vitest](https://github.com/vitest-dev/vitest): A fast and easy-to-use testing framework for Vite projects, including Svelte applications.
- [Svelte Testing Library](https://testing-library.com/docs/svelte-testing-library/intro): A library for testing Svelte components, built on top of the popular Testing Library.
- [ChatGPT](https://chat.openai.com): If you're not using this to code in 2023, you're doing it wrong.

## Features

Current Features:

- Customizable timer for work and rest periods.
- Set counter to track the number of sets completed.
- Progress bar to visualize workout progress.
- Responsive design for use on various devices.
- Browser-generated audio notifications to indicate the start and end of work and rest periods.

Planned Features:

- Add confetti when workout completes
- Spotify integration so you can play your favorite tracks directly from the browser during your workout.
- Preset workout templates for quick and easy access to popular HIIT routines.
- User accounts to save custom workouts and track progress over time.
- Integration with third-party fitness platforms (e.g., Google Fit, Apple Health, Fitbit).

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/your-username/justhiit.it.git
   cd justhiit.it
   ```

2. Install dependencies using pnpm:

   ```
   pnpm install
   ```

3. Start the development server:

   ```
   pnpm dev
   ```

   The application should now be running at [http://localhost:3000](http://localhost:3000).

4. Run tests using Vitest:

   ```
   pnpm test
   ```

## Contributing

If you would like to contribute to JustHIIT.it, feel free to submit a pull request or open an issue with your suggestions or bug reports. We appreciate any help in improving the project.

## License

This project is licensed under the [GNU GPL3](https://www.gnu.org/licenses/gpl-3.0.en.html) licence.
