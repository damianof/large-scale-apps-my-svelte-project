<script lang="ts">
  // import a reference to our ItemInterace
  import type { ItemInterface } from '../../models/items/Item.interface'
  // expose a property called items with a default value of a blank array
  export let items: ItemInterface[] = []

  // item click handler
  function handleClick (item: ItemInterface) {
    item.selected = !item.selected
    items = [...items]
    console.log('handleItemClick', item.id, item.selected)
  }
</script>

<div>
  <h3>My Items:</h3>
  <ul>
    {#each items as item}
      <li on:click={() => handleClick(item)}>
        {item.name} [{item.selected}]
      </li>
    {/each}
  </ul>
</div>
