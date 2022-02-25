// file: src/components/items/children/Item.rendering.test.ts

// Note: we have set jest environment to be jsdom in our jest.config.js
// Alternatively, you can override the jest test environment within the test file with:
// /**
//  * @jest-environment jsdom
//  */

// Import additional unit test assertions from jest-dom (i.e. toBeInTheDocument etc)
// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
import '@testing-library/jest-dom'

// import a reference to testing library "render"
import { render, screen, prettyDOM } from '@testing-library/svelte'

// import reference to our interface
import type { ItemInterface } from '../../../models/items/Item.interface'
// import reference to your Item component:
import component from './Item.component.svelte'

test('renders an Item text correctly', () => {
  // our data to pass to our component:
  const item: ItemInterface = {
    id: 1,
    name: 'Unit test item 1',
    selected: false
  }

  // using testing library "render" to get the element by text
  const { getByText } = render(component, {
    testid: 'unit-test-item',
    item: item // passing the data through the item property
  })

  // get element by matching rendered text
  //const elByText = getByText('Unit test item 1 [false]')
  const elByText = screen.getByTestId(`unit-test-item`)

  // test by expecting the element to exist in the component
  expect(elByText).toBeInTheDocument()

  const children = elByText.children
  expect(children).toHaveLength(2)
  expect(children.item(0)?.innerHTML).toEqual('*')
  expect(children.item(1)?.innerHTML).toContain('Unit test item 1')
})

test('renders an Item indicator correctly', () => {
  // our data to pass to our component:
  const item: ItemInterface = {
    id: 1,
    name: 'Unit test item 2',
    selected: false
  }

  // using testing library "render" to get the element by text
  const { getByText } = render(component, {
    item: item // passing the data through the item property
  })

  // get element by matching rendered text
  const elByText = getByText(/\*/i)

  // test by expecting the element to exist in the component
  expect(elByText).toBeInTheDocument()
})

test('has expected css class when selected is true', () => {
  // our data to pass to our component:
  const item: ItemInterface = {
    id: 1,
    name: 'Unit test item 3',
    selected: true /* note this is true */
  }

  // using testing library "render"
  const { getByRole } = render(component, {
    item: item // passing the data through the item property
  })

  // get a reference to the <li> element
  // by matching the role attribute (note that in the ItemComponent code we have <li role="button" ...)
  const liElement = getByRole('button')

  // Note that you could use testing library prettyDOM function to console.log the element if we want to visually inspect what has been rendered:
  // console.log('liElement', prettyDOM(liElement) )
  console.log(`liElement.className "${liElement?.className}"`)

  // check that the element class attribute has the expected value
  expect(liElement).toHaveClass('selected')
})

test('has expected css class when selected is false', () => {
  // our data to pass to our component:
  const item: ItemInterface = {
    id: 1,
    name: 'Unit test item 4',
    selected: false /* note this is false */
  }

  // using testing library "render"
  const { getByRole } = render(component, {
    item: item // passing the data through the item property
  })

  // get a reference to the <li> element
  // by matching the role attribute (note that in the ItemComponent code we have <li role="button" ...)
  const liElement = getByRole('button')

  // check that the element class attribute does not contain 'selected'
  expect(liElement).not.toHaveClass('selected')
})
