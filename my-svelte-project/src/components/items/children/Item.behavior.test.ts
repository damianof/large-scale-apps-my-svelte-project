// file: src/components/items/children/Item.behavior.test.ts

// import references to testing library "render" and "fireEvent"
import { render, fireEvent } from '@testing-library/svelte'

// import reference to our interface
import type { ItemInterface } from '@/models'
// import reference to your Item component:
import ItemComponent from './Item.component.svelte'

describe('Item.component: behavior', () => {

  // Note: This is as an async test as we are using `fireEvent`
  it('click event invokes onItemSelect handler as expected', async () => {
    // our data to pass to our component:
    const item: ItemInterface = {
      id: 1,
      name: 'Unit test item 1',
      selected: false
    }

    // using testing library "render" to get the element by text
    const { component, getByRole } = render(ItemComponent, {
      item: item // passing the data through the item property
    })

    // get a reference to the <li> element
    // by matching the role attribute (note that in the ItemComponent code we have <li role="button" ...)
    const liElement = getByRole('button')

    // create a spy function with jest.fn()
    const mockOnItemSelect = jest.fn()
    // wire up the spy function on the event that is dispatched as 'selectEvent"
    component.$on('selectItem', mockOnItemSelect)
    // trigger click on the <li> element:
    // Note: In svelte testing library we have to use await when firing events
    // because we must wait for the next `tick` to allow for Svelte to flush all pending state changes.
    await fireEvent.click(liElement)

    // check test result (should have been called once)
    expect(mockOnItemSelect).toHaveBeenCalledTimes(1)
  })

})
