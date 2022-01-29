<script lang="ts">
  // import a reference to our ItemInterace
  import type { ItemInterface } from '../../models/items/Item.interface'
  // import a reference to our Item component
  import ItemComponent from './children/Item.component.svelte'
  // import a reference to our Loader component:
  import Loader from '../shared/Loader.component.svelte'

  // expose loading property:
  export let loading = false
  // expose a property called items with a default value of a blank array
  export let items: ItemInterface[] = []

  // item select handler
  function onSelectItem (event: CustomEvent<{ item: ItemInterface }>) {
    const item = event.detail.item
    item.selected = !item.selected
    items = items
    console.log('onSelectItem', item.id, item.selected)
  }
</script>

<div>
  <h3>My Items:</h3>
  {#if loading}
    <Loader />
  {/if}
  {#if !loading}
    <ul>
      {#each items as item}
        <ItemComponent item={item} on:selectItem={onSelectItem} />
      {/each}
    </ul>
  {/if}
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
