<script>
    let sets = 1;
    let workTime = 30;
    let restTime = 15;
    let timerActive = false;
    let currentSet = 1;
    let remainingTime = 0;
    let mode = 'work';
    let intervalId;
    let paused = false;
  
    function startTimer() {
      timerActive = true;
      remainingTime = workTime;
      mode = 'work';
      countdown();
    }
  
    function stopTimer() {
      timerActive = false;
      paused = true;
      clearInterval(intervalId);
    }

    function continueTimer() {
    paused = false;
    countdown();
  }


  function resetTimer() {
    stopTimer();
    currentSet = 1;
    remainingTime = workTime;
    mode = 'work';
    startTimer();
  }
  
    function countdown() {
      intervalId = setInterval(() => {
        remainingTime--;
  
        if (remainingTime === 0) {
          if (mode === 'work' && currentSet < sets) {
            mode = 'rest';
            remainingTime = restTime;
          } else {
            currentSet++;
            if (currentSet > sets) {
              stopTimer();
              currentSet = 1;
            } else {
              mode = 'work';
              remainingTime = workTime;
            }
          }
        }
      }, 1000);
    }
  </script>
  
  <main class="container mx-auto mt-10">
    <h1 class="text-4xl font-bold mb-10 text-center">HIIT Clock</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label for="sets" class="block text-sm font-medium text-gray-700">Sets</label>
        <input type="number" min="1" id="sets" bind:value={sets} class="input input-bordered w-full" />
      </div>
      <div>
        <label for="workTime" class="block text-sm font-medium text-gray-700">Work Time (seconds)</label>
        <input type="number" min="1" id="workTime" bind:value={workTime} class="input input-bordered w-full" />
      </div>
      <div>
        <label for="restTime" class="block text-sm font-medium text-gray-700">Rest Time (seconds)</label>
        <input type="number" min="1" id="restTime" bind:value={restTime} class="input input-bordered w-full" />
      </div>
    </div>
  
    <div class="mt-8 text-center">
      {#if !timerActive && !paused}
        <button on:click={startTimer} class="btn btn-primary">
          Start
        </button>
      {:else if timerActive}
        <button on:click={stopTimer} class="btn btn-error">
          Stop
        </button>
      {/if}
      {#if paused}
        <button on:click={continueTimer} class="btn btn-primary">
          Continue
        </button>
        <button on:click={resetTimer} class="btn btn-error">
          Reset
        </button>
      {/if}
    </div>
  
    <div class="mt-10 text-center">
      <div class="text-6xl font-bold">
        {remainingTime}
      </div>
      <div class="text-xl">
        {mode.toUpperCase()} - Set {currentSet} of {sets}
      </div>
    </div>
  </main>
  
  <style>

  </style>
  