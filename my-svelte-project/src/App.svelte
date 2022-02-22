<script lang="ts">
  // import a reference to our ItemsView component
  import ItemsView from './views/Items.view.svelte'
  // import localization
  import { useLocalization } from './localization/useLocalization'

  const { 
    locales, 
    currentLocale, 
    getUserPreferredLocale, 
    changeLocale, 
    isLoadingLocale,
    isLocaleLoaded, 
    t
  } = useLocalization()

  // on load, check if locale has been set. If not invoke changeLocale
  $: if (!$isLocaleLoaded) {
    changeLocale(getUserPreferredLocale())
  }

  const onLocaleClick = (lcid: string) => {
    changeLocale(lcid)
  }

</script>

<main>
  <div class="home">
    {#if $isLocaleLoaded && !$isLoadingLocale}
      <div>
        {#each locales as item}
          <label>
            <input type=radio group={$currentLocale} name="locale" value={item.key} checked={ $currentLocale === item.key } on:click={() => onLocaleClick(item.key)}>
            {$t(`locale.selector.${ item.key }`)}
          </label>
        {/each}
      </div>
      
      <h1>{$t('home.welcome')} [Locale: {$currentLocale}]</h1>
      <ItemsView />
    {:else}
        <p>Loading...</p>
    {/if}
  </div>
</main>

<style>
  .home {
    padding: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 12px;
  }
</style>