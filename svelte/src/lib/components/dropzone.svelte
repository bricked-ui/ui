<script lang="ts">
  interface Props {
    filename?: string;
    onPick?: (name: string) => void;
  }
  import PixelIcon from "./pixel-icon.svelte";
  let { filename = $bindable(""), onPick }: Props = $props();
</script>

<label class="bk-drop bk-cut">
  <input
    type="file"
    onchange={(e) => {
      const f = e.currentTarget.files?.[0]?.name ?? "";
      filename = f;
      onPick?.(f);
    }}
  />
  <PixelIcon name="upload" />
  <span>{filename || "Choose a file"}</span>
</label>
