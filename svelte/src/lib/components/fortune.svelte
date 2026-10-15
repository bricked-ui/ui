<script lang="ts">
  import Button from "./button.svelte";

  const ANSWERS = [
    "Lay one more brick.",
    "Ask again after a snack.",
    "Yes, build it.",
    "The wall says no.",
    "Take a break first.",
    "Orange is always right."
  ];
  let a = $state("Ask me anything.");
</script>

<div class="bk-answer bk-cut" aria-live="polite">{a}</div>
<div class="bk-row">
  <Button size="sm" icon="star" onclick={() => (a = ANSWERS[Math.floor(Math.random() * ANSWERS.length)])}>
    Ask
  </Button>
</div>
