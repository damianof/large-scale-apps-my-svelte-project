<script lang="ts">
  // import a reference to our ItemInterace
  import type { ItemInterface } from '../../models/items/Item.interface'
  // expose a property called items with a default value of a blank array
  export let items: ItemInterface[] = []
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
