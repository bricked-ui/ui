<script lang="ts">
  import { onMount } from "svelte";

  let t = $state(new Date());
  let timer: ReturnType<typeof setInterval>;

  onMount(() => {
    timer = setInterval(() => (t = new Date()), 1000);
    return () => clearInterval(timer);
  });
</script>

<div class="bk-clock bk-cut" role="timer">
  {t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
</div>
