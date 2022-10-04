<script lang="ts">
  // import a reference to our ItemInterace
  import type { ItemInterface } from '../../models/items/Item.interface'
  // import a reference to our Item component
  import ItemComponent from './children/Item.component.svelte'

  // expose a property called items with a default value of a blank array
  export let items: ItemInterface[] = [] // here replace any[] with ItemInterace[]

  // begin: remove code block:
  // // item click handler
  // const handleClick = (item: ItemInterface) => {
  //   item.selected = !item.selected
  //   items = items // add this line here to set items to itself to force a refresh
  //   console.log('handleItemClick', item.id, item.selected)
  // }
  // end: remove code block:
  
  // begin: add code block
  // item select handler
  function onSelectItem (event: CustomEvent<{ item: ItemInterface }>) {
    const item = event.detail.item
    item.selected = !item.selected
    items = items
    console.log('onSelectItem', item.id, item.selected)
  }
  // end: add code block
</script>

<div>
  <h3>Items:</h3>
  <ul>
    {#each items as item}
      <!-- begin: remove code block -->
      <!--li on:click={() => handleClick(item)}>
        {item.name} [{item.selected}] 
      </li-->
      <!-- end: remove code block -->

      <!-- add a reference to the item component -->
      <ItemComponent item={item} on:selectItem={onSelectItem} />
    {/each}
  </ul>
</div>

<style>
  ul {
    padding-inline-start: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }
</style>
