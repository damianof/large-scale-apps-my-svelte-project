<script lang="ts">
  // import a reference to our ItemsList component
  import ItemsListComponent from './components/items/ItemsList.component.svelte'

  // mock some data:
  const items: any[] = [{ // explicetely using any[] as we'll replace this with an interface in the next chapters
    id: 1,
    name: 'Item 1'
  }, {
    id: 2,
    name: 'Item 2'
  }, {
    id: 3,
    name: 'Item 3'
  }]

</script>

<main>
  <div class="home">
    <ItemsListComponent items={items}/>
  </div>
</main>
