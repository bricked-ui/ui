<script lang="ts">
  interface Props {
    value?: number;
  }
  let { value = 50 }: Props = $props();
</script>

<div
  class="bk-progress bk-cut"
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={value}
>
  <div class="bk-progress__fill" style="width: {value}%"></div>
</div>
