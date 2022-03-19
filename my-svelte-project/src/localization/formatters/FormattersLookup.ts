// file: src/localization/formatters/FormattersLookup.ts

import { IFormatters } from './Formatters.interface'
import { LocaleIds } from '../constants'

import enUS from './locale-formatters/en-US'
import esES from './locale-formatters/es-ES'
import itIT from './locale-formatters/it-IT'
import frFR from './locale-formatters/fr-FR'

/**
 * @name Formatters
 * @description
 * Lookup for datetime/number formatters by culture locale code (i.e. 'en-US' etc)
 */
export const FormattersLookup: {
  [locale: string]: IFormatters
} = {
  [LocaleIds.enUS]: enUS,
  [LocaleIds.esES]: esES,
  [LocaleIds.itIT]: itIT,
  [LocaleIds.frFR]: frFR
}
