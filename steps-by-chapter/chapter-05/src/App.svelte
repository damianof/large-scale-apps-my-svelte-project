<script lang="ts">
  // import a reference to our ItemInterace
  import type { ItemInterface } from './models/items/Item.interface'
  // import a reference to our ItemsList component
  import ItemsListComponent from './components/items/ItemsList.component.svelte'

  // mock some data:
  const items: ItemInterface[] = [{ // here change any[] to ItemInterface[]
    id: 1,
    name: 'Item 1',
    selected: false // add selected: false to each item
  }, {
    id: 2,
    name: 'Item 2',
    selected: false // add selected: false to each item
  }, {
    id: 3,
    name: 'Item 3',
    selected: false // add selected: false to each item
  }]

</script>

<main>
  <div class="home">
    <ItemsListComponent items={items}/>
  </div>
</main>

<style>
  .home {
    padding: 20px;
  }
</style>
