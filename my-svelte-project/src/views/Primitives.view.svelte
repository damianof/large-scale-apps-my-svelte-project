<script lang="ts">
  import ElText from '@/components/primitives/text/ElText.svelte'
  import ElButton from '@/components/primitives/buttons/ElButton.svelte'
  import ElToggle from '@/components/primitives/toggles/ElToggle.svelte'
  import { useModal } from '@/components/primitives/modals/useModal'
  import * as SvelteStore from 'svelte/store'

  // add some state to test the toggle button
  const writeableStore = SvelteStore.writable({
    toggleItemState: [
      {
        id: 'toggle-a',
        checked: true
      }, {
        id: 'toggle-b',
        checked: false
      }, {
        id: 'toggle-c',
        checked: false
      }
    ]
  })
  const state = SvelteStore.derived(writeableStore, ($writeableStore) => $writeableStore)
  
  const onButtonClicked = async (event: CustomEvent<{ id: string }>) => {
    console.log('PrimitivesView: onButtonClicked', event.detail.id)
    // handle a new button with id "open-modal" (we'll be adding shortly)
    if (event.detail.id === 'open-modal') {
      // here we invoke our useModal with the custom labels for the buttons
      const modal = useModal({ cancelLabel: 'Cancel', confirmLabel: 'Ok' })
      // then we invoke modal.prompt() and await it
      const result = await modal.prompt('Do you want to delete this record?')
      // the result will be true if the user click on COnfirm, or false if click on Cancel
      console.log('----- PrimitivesView: onButtonClicked: modal prompt result', result)  
    }
  }

  const onToggleClicked = (event: CustomEvent<{ id: string }>) => {
    const id = event.detail.id
    console.log(`You clicked the "${id}" toggle`)
    writeableStore.update((state) => {
      const stateItem = state.toggleItemState.find(item => item.id === id)
      if (stateItem) {
        // toggle the value of the ElToggle that was clicked
        stateItem.checked = !stateItem.checked
      }
      return state
    })
  }
</script>

<div class="primitives">

  <ElText tag="h1" addCss="text-gray-500" text="Primitives"/>
  <ElText tag="h2" addCss="text-gray-500" text="ElText examples:"/>
  <div class="p-6 border">
    <ElText tag="h2" addCss="text-red-500" text="Here ElText will render a &lth2&gt element"/>
    <ElText tag="p" addCss="text-red-700" text="Here ElText will render a &ltp&gt element"/>
  </div>

  <ElText tag="h2" addCss="text-gray-500" text="ElButton examples:"/>
  <div class="p-6 border">
    <ElButton id="my-button-1" disabled={false} label="This is a button" on:clicked={onButtonClicked}/>
    <ElButton id="my-button-2" disabled={true} label="This is a disabled button" addCss="ml-2" on:clicked={onButtonClicked}/>
    <ElButton id="open-modal" disabled={false} label="Open modal" on:clicked={onButtonClicked}/>
  </div>

  <ElText tag="h2" addCss="text-gray-500" text="ElToggle examples:"/>
  <div class="p-6 border">
    <ElToggle id="toggle-a" checked={$state.toggleItemState.find(item => item.id === 'toggle-a').checked} disabled={false} on:clicked={onToggleClicked} />
    <ElToggle id="toggle-b" checked={$state.toggleItemState.find(item => item.id === 'toggle-b').checked} disabled={true} addCss="ml-2" on:clicked={onToggleClicked} />
    <ElToggle id="toggle-c" checked={$state.toggleItemState.find(item => item.id === 'toggle-c').checked} disabled={false} addCss="ml-2" on:clicked={onToggleClicked} />
  </div>
  
</div>
