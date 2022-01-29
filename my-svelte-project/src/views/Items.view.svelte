<script lang="ts">
  // import reference to Svelete lifecycle hook onMount:
  import { onMount } from 'svelte'

  // import a reference to our ItemInterace
  import type { ItemInterface } from '../models/items/Item.interface'
  // import a reference to your ItemsList component:
  import ItemsListComponent from '../components/items/ItemsList.component.svelte'
  // import our useAppStore hook from our store
  import { useAppStore } from '../store'

  // get a reference to our itemsStore instanceusing our useAppStore() hook:
  const {
    itemsStore
  } = useAppStore()

  // get a reference to the items state data through our itemsStore getters:
  const { 
    loading,
    items
  } = itemsStore.getters
  
  // item select event handler
  function onSelectItem (event: CustomEvent<{ item: ItemInterface }>) {
    const item = event.detail.item
    console.log('ItemsView: onSelectItem', item.id, item.selected)
    itemsStore.actions.toggleItemSelected(item)
  }

  // lifecycle onMount hook: use to dispatch our loadItems action to our itemsStore
  onMount(async () => {
    itemsStore.actions.loadItems()
  })
</script>

<div>
  <ItemsListComponent 
    loading={$loading} 
    items={$items} 
    on:selectItem={onSelectItem} />
</div>
