<script lang="ts">
  // expose a property called items with a default value of a blank array
  export let items: any[] = [] // explicetely using any[] as we'll replace this with an interface in the next chapters
</script>

<div>
  <h3>Items:</h3>
  <ul>
    {#each items as item}
      <li>
        {item.name}
      </li>
    {/each}
  </ul>
</div>
