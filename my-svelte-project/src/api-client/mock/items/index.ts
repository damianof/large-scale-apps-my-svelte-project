// file: src/api-client/mock/items/index.ts

import { config } from '../../../config' // <-- add this line

import { 
  ItemsApiClientUrlsInterface, 
  ItemsApiClientInterface, 
  ItemsApiClientModel 
} from '../../../models/api-client/items'


// instantiate the ItemsApiClient pointing at the url that returns static json mock data
const itemsApiClient: ItemsApiClientInterface = new ItemsApiClientModel({ 
  urls: config.items.apiUrls,
  mockDelay: 1000 // simulate a delay so we can see our loader
})

// export our instance
export {
  itemsApiClient
}
