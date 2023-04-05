<script lang="ts">
    export let currentSet: number;
    export let sets: number;
    export let remainingTime: number;
    export let mode: string;
  </script>
  
  <div class="text-center text-4xl">
    {mode === 'work' ? 'Work' : 'Rest'} {currentSet}/{sets}
  </div>
  <div class="text-center text-6xl mt-4">{Math.floor(remainingTime / 60)}:{remainingTime % 60}</div>
  