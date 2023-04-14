<script>
    export let totalWorkoutTime = 0;
    export let timeElapsed = 0;
  
    $: progressPercentage = (timeElapsed / totalWorkoutTime) * 100;
  </script>
  
  <!-- <div class="w-full bg-gray-200">
    <div class="h-1 bg-primary-500" style="width: {progressPercentage}%"></div>
  </div> -->

  <progress class="progress progress-primary w-full animate-bounce" value="{progressPercentage}" max="100"></progress>