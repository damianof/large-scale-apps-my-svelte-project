<script lang="ts">
  //import { MessageFormatter } from 'svelte-i18n/types/runtime/types'
  import { Readable } from 'svelte/store'


  // expose component properties
  export let locales: { key: string }[] = []
  export let currentLocale: string = ''
  export let onLocaleClick: Function
  export let t: Function
</script>


<div class="locale-selector">
  {#each locales as item}
    <label class="cursor-pointer">
      <input type="radio" group={currentLocale} name="locale" value={item.key} checked={ currentLocale === item.key } on:click={() => onLocaleClick(item.key)} />
      { t(`locale.selector.${ item.key }`) }
    </label>
  {/each}
</div>
