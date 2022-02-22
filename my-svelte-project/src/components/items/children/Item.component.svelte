<script lang="ts">
  // import createEventDispatcher from Svelte:
  import { createEventDispatcher } from 'svelte'
  // import a reference to our ItemInterace
  import type { ItemInterface } from '../../../models/items/Item.interface'

  // expose a property called testid
  export let testid: string = 'not-set'
  // expose a property called item
  export let item: ItemInterface = {
    id: -1,
    name: '',
    selected: false
  }

  // create an instance of Svelte event dispatcher
  const dispatch = createEventDispatcher()

  // a computed property to return a different css class based on the selected value
  $: cssClass = (): string => {
    let css = 'item'
    if (item.selected) {
      css += ' selected'
    }
    return css.trim()
  }

  // item click handler
  function handleClick (item: ItemInterface) {
    // dispatch a 'selectItem' even through Svelte dispatch
    dispatch('selectItem', {
      item
    })
  }
</script>

<li role="button" data-testid={testid} class={cssClass()} on:click={() => handleClick(item)}>
  <div class="selected-indicator">*</div>
  <div class="name">{item.name} [{item.selected}]</div>
</li>

<style>
  li.item {
    padding: 5px;
    outline: solid 1px #eee;
    display: flex;
    align-items: center;
    height: 30px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  li.item .name {
    margin-left: 6px;
  }
  li.item .selected-indicator {
    font-size: 2em;
    line-height: 0.5em;
    margin: 10px 8px 0 8px;
    color: lightgray;
  }
  li.item.selected .selected-indicator {
    color: skyblue;
  }
  li.item:hover {
    background-color: #eee;
  }
</style>
