// file: src/store/items/Items.store.ts

// import a reference to Svelte's writable from 'svelte/store'
import * as SvelteStore from 'svelte/store'

// import references to our itesms tore and actions interfaces
import { 
  ItemsStateInterface, 
  ItemsStoreInterface, 
  ItemsStoreActionsInterface,
  ItemsStoreGettersInterface
} from './models'
// import a reference to our ItemInterface
import { ItemInterface } from '../../models/items/Item.interface'

const writeableItemsStore = SvelteStore.writable<ItemsStateInterface>({
  loading: false,
  items: []
})

// hook to allows us to consume the ItemsStore instance in our components
export function useItemsStore(): ItemsStoreInterface {

  // our items store actions implementation:
  const actions: ItemsStoreActionsInterface = {
    // action that we invoke to load the items from an api:
    loadItems: async () => {
      // set loading to true and clear current data:
      writeableItemsStore.update((state) => {
        state.loading = true
        state.items = []
        return state
      })

      // mock some data:
      let mockData: ItemInterface[] = [{
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

      // let's pretend we called some API end-point
      // and it takes 1 second to return the data
      // by using javascript setTimeout with 1000 for the milliseconds option
      setTimeout(() => {
        // set items data and loading to false
        writeableItemsStore.update((state) => {
          state.items = mockData
          state.loading = false
          return state
        }) 
        console.log('itemsStore: loadItems: state updated')
      }, 1000)
    },
    // action we invoke to toggle an item.selected property 
    toggleItemSelected: async (item: ItemInterface) => {
      console.log('ItemsStore: action: toggleItemSelected', item)
        // update our state
        writeableItemsStore.update((state) => {
        const itemIndex = (state.items || []).findIndex(a => a.id === item.id)
        if (itemIndex < 0) {
          console.warn('ItemsStore: action: toggleItemSelected: Could not find item in our state')
          return
        }
        // toggle selected
        state.items[itemIndex].selected = !state.items[itemIndex].selected
        // keep current loading value
        state.loading = state.loading
        return state
      }) 
    }
  }

  // our items store getters implementation:
  const loading = SvelteStore.derived(writeableItemsStore, ($state) => $state.loading)
  const items = SvelteStore.derived(writeableItemsStore, ($state) => $state.items)
  
  const getters: ItemsStoreGettersInterface = {
    loading,
    items
  }

  // return our store intance implementation
  return {
    getters,
    actions
  }
}