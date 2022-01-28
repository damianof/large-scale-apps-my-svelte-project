<script lang="ts">
  // import a reference to our ItemInterace
  import type { ItemInterface } from './models/items/Item.interface'
  // import a reference to our ItemsList component
  import ItemsListComponent from './components/items/ItemsList.component.svelte'

  // mock some data:
  let items: ItemInterface[] = [{
    id: 1,
    name: 'Item 1',
    selected: false
  }, {
    id: 2,
    name: 'Item 2',
    selected: false
  }, {
    id: 3,
    name: 'Item 3',
    selected: false
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
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 12px;
  }
</style>