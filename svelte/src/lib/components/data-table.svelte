<script lang="ts">
  interface Props {
    head: string[];
    rows: string[][];
  }
  let { head, rows }: Props = $props();
</script>

<div class="bk-table-wrap bk-cut">
  <table class="bk-table">
    <thead><tr>{#each head as c}<th>{c}</th>{/each}</tr></thead>
    <tbody>
      {#each rows as r}<tr>{#each r as c}<td>{c}</td>{/each}</tr>{/each}
    </tbody>
  </table>
</div>
