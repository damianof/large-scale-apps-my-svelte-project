// file: src/api-client/mock/index.ts

import { ApiClientInterface } from '../../models/api-client/ApiClient.interface'
import { itemsApiClient } from './items'
import { localizationApiClient } from './localization'

// create an instance of our main ApiClient that wraps the mock child clients
const apiMockClient: ApiClientInterface = {
  items: itemsApiClient,
  localization: localizationApiClient
}

// export our instance
export {
  apiMockClient
}
