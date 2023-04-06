<script lang="ts">
    export let currentSet: number;
    export let sets: number;
    export let remainingTime: number;
    export let mode: string;
  </script>
  
  <div class="text-center text-4xl text-white">
    {mode === 'work' ? 'Set' : 'Rest'} {currentSet}/{sets}
  </div>
  <div class="text-center text-[128px]"><span class="[text-shadow:_0_10px_10px_rgba(0,0,0,25%)]">{Math.floor(remainingTime / 60)}:{remainingTime % 60}</span></div>
  