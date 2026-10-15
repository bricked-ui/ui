<script lang="ts">
  interface Props {
    checked?: boolean;
    label?: string;
    onChange?: (v: boolean) => void;
  }
  let { checked = $bindable(false), label = "Switch", onChange }: Props = $props();

  function toggle() {
    checked = !checked;
    onChange?.(checked);
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={label}
  class="bk-switch bk-cut"
  onclick={toggle}
>
  <span class="bk-switch__opt {!checked ? 'is-on' : ''}">Off</span>
  <span class="bk-switch__opt {checked ? 'is-on' : ''}">On</span>
</button>
