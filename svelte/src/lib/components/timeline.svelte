<script lang="ts">
  interface Item {
    title: string;
    time: string;
  }
  interface Props {
    items: Item[];
  }
  let { items }: Props = $props();
</script>

<ol class="bk-tl">
  {#each items as it}
    <li>
      <span class="bk-tl__dot"></span>
      <div>
        <p class="bk-tl__title">{it.title}</p>
        <p>{it.time}</p>
      </div>
    </li>
  {/each}
</ol>
