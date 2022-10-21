// file: src/api-client/live/index.ts

import { ApiClientInterface } from '../models'
// import module instances
import { itemsApiClient } from '../mock/items'
import { localizationApiClient } from './localization'

// create an instance of our main ApiClient that wraps the live child clients
const apiLiveClient: ApiClientInterface = {
  items: itemsApiClient,
  localization: localizationApiClient
}
// export our instance
export { apiLiveClient }
