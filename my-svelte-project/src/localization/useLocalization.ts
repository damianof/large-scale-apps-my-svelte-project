// file: src/localization/useLocalization.ts

import { dictionary, locale, _ } from 'svelte-i18n'
import { writable, derived } from 'svelte/store'

import { config } from '@/config'
import { apiClient } from '../api-client'

// get reference to out localization config
const localStorageConfig = config.localization.localStorageCache

// key that will use to save the user preferred locale id
const userPreferredLocaleStorageKey = 'user-lcid'

// create a writable reactive flag called isLoadingLocale:
const isLoadingLocale = writable(false)
// create a reactive varaible called currentLocale that will return the svelte-i18n locale value:
const currentLocale = derived(locale, ($state) => $state)
// create a reactive flag called isLocaleLoaded that will return true once svelte-i18n has loaded its state
const isLocaleLoaded = derived(locale, ($state) => typeof $state === 'string')

// helper method to retrieve the user preferred locale from localStorage
export const getUserPreferredLocale = () => {
  // get a reference from the available locales array from our config
  const availableLocales = config.localization.locales
  // try to retrive from local storage if they have one saved
  const preferredLocale = localStorage.getItem(userPreferredLocaleStorageKey)
  if (!preferredLocale) {
    // if not, use the default locale from config
    const defaultLocale = availableLocales.find((o) => o.isDefault)?.key
    return defaultLocale
  }
  return preferredLocale
}

// helper to save the user preferred locale to localStorage
export const setUserPreferredLocale = (lcid: string) => {
  localStorage.setItem(userPreferredLocaleStorageKey, lcid)
}

// helper to change the current 18n locale
const changeLocale = async (lcid: string) => {
  // try to get it from locale storage
  // dynamic key we use to cache the actual locale JSON data in the browser local storage
  const localeStorageKey = `lcid-data-${lcid}`
  // retrieve JSON as string
  const cacheEntryStr = localStorage.getItem(localeStorageKey) || '{}'
  // a variable to hold the parsed JSON data:
  let cacheEntry: { appVersion: number; expiresAt: number; json: string } = {
    appVersion: -1,
    expiresAt: 0,
    json: ''
  }

  // if localeStorage is enabled through config, then proced trying parsing the  cacheEntryStr
  if (localStorageConfig.enabled) {
    try {
      cacheEntry = JSON.parse(cacheEntryStr)
    } catch (e) {
      console.warn('error parsing data', cacheEntryStr)
    }
  }

  console.log('cacheEntry?.expiresAt - Date.now()', cacheEntry?.expiresAt - Date.now())
  console.log('typeof cacheEntry.json', typeof cacheEntry.json)

  // check if we have cacheEntry and if matches app version and also did not expire
  if (cacheEntry && cacheEntry.appVersion === config.global.version && cacheEntry.expiresAt - Date.now() > 0) {
    // use value from cache and pass it to svelte-i18n dictionary.set():
    dictionary.set({ [lcid]: cacheEntry.json as any })
    // then switch locale by invoking svelte-i18n locale.set()
    locale.set(lcid)
  } else {
    // set our loading flag to true:
    isLoadingLocale.set(true)
    // retrieve data from API end point (or CDN etc)
    const translationData = await apiClient.localization.fetchTranslation('translation', lcid)
    // use the data returned y the API and pass it to svelte-i18n dictionary.set():
    dictionary.set({ [lcid]: translationData })
    // then switch locale by invoking svelte-i18n locale.set()
    locale.set(lcid)

    // update our cache
    const dt = new Date()
    // calculate new expiration date
    const expiresAt = dt.setMinutes(dt.getMinutes() + Number(localStorageConfig.expirationInMinutes))
    if (localStorageConfig.enabled) {
      localStorage.setItem(
        localeStorageKey,
        JSON.stringify({
          appVersion: config.global.version,
          expiresAt: expiresAt,
          json: translationData
        })
      )
    }
    // set our loading flag to false
    isLoadingLocale.set(false)
  }

  // also save the user preference
  setUserPreferredLocale(lcid)
}

// export all we need as a hook
export function useLocalization() {
  const availableLocales = config.localization.locales

  return {
    locales: availableLocales,
    changeLocale,
    currentLocale,
    isLocaleLoaded,
    isLoadingLocale: derived(isLoadingLocale, ($state) => $state),
    t: _,
    getUserPreferredLocale
  }
}
