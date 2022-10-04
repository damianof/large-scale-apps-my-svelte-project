<script lang="ts">
  // import a reference to our ItemInterace
  import type { ItemInterface } from '../../models/items/Item.interface'
  // expose a property called items with a default value of a blank array
  export let items: ItemInterface[] = [] // here replace any[] with ItemInterace[]

  // item click handler
  const handleClick = (item: ItemInterface) => {
    item.selected = !item.selected
    items = items // add this line here to set items to itself to force a refresh
    console.log('handleItemClick', item.id, item.selected)
  }
</script>

<div>
  <h3>Items:</h3>
  <ul>
    {#each items as item}
      <li on:click={() => handleClick(item)}><!-- add on:click here -->
        {item.name} [{item.selected}] <!-- output selected next to the name -->
      </li>
    {/each}
  </ul>
</div>
