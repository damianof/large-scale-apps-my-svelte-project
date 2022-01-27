<script lang="ts">
  // import a reference to our ItemsList component
  import ItemsListComponent from './components/items/ItemsList.component.svelte'

  // mock some data:
  const items = [{
    id: 1,
    name: 'Item 1',
    selected: true
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
