<script lang="ts">
  // expose a property called items with a default value of a blank array
  export let items = []
</script>

<div>
  <h3>My Items:</h3>
  <ul>
    {#each items as item}
      <li>
        {item.name}
      </li>
    {/each}
  </ul>
</div>
