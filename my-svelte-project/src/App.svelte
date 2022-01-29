<script lang="ts">
  // import a reference to our ItemsView component
  import ItemsView from './views/Items.view.svelte'
</script>

<main>
  <div class="home">
    <ItemsView />
  </div>
</main>

<style>
  .home {
    padding: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 12px;
  }
</style>