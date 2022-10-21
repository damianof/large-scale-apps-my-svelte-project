// file: src/config/config-files-map.ts

// import a reference to our Config interface:
import { ConfigInterface } from './models/Config.interface'

// individual environments configs:
import configMock from './config-files/mock.json'
import configLocal from './config-files/localapis.json'
import configJsonServer from './config-files/jsonserver.json'
import configBeta from './config-files/beta.json'
import configProduction from './config-files/production.json'

// example using strategy pattern:
// export const configFileMap1: { [key: string]: ConfigInterface } = {
//   mock: configMock,
//   localapis: configLocal,
//   jsonserver: configJsonServer,
//   beta: configBeta,
//   production: configProduction,
// }

// example with javascript Map()
export const configFilesMap: Map<string, ConfigInterface> = new Map<string, ConfigInterface>([
  ['mock', configMock],
  ['localapis', configLocal],
  ['jsonserver', configJsonServer],
  ['beta', configBeta],
  ['production', configProduction]
])
