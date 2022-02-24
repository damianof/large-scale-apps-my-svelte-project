import { dictionary, locale, _ } from 'svelte-i18n'
import { writable, derived } from 'svelte/store'

import { config } from '../config'
import { apiClient } from '../api-client'

// key will use to save the user preferred locale id
const userPreferredLocaleStorageKey = 'user-lcid'

const isLoadingLocale = writable(false)
const currentLocale = derived(locale, $state => $state)
const isLocaleLoaded = derived(locale, $state => typeof $state === 'string')

export const getUserPreferredLocale = () => {
  const availableLocales = config.localization.locales
  // try to retrieve from local storage if they have one saved
  const preferredLocale = localStorage.getItem(userPreferredLocaleStorageKey)
  if (!preferredLocale) {
    const defaultLocale = availableLocales.find(o => o.isDefault)?.key
    return defaultLocale
  }
  return preferredLocale
}

export const setUserPreferredLocale = (lcid: string) => {
  localStorage.setItem(userPreferredLocaleStorageKey, lcid)
}

const changeLocale = async (lcid: string) => {
  // try to get it from locale storage
  // dynamic key we use to cache the actual locale JSON data in the browser local storage
  const localeStorageKey = `lcid-data-${ lcid }`
  const localStorageConfig = config.localization.localStorageCache
  const cacheEntryStr = localStorage.getItem(localeStorageKey) || '{}'
  let cacheEntry: { appVersion: number, expiresAt: number, json: string } = { appVersion: -1, expiresAt: 0, json: '' }

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
    // retrieve from cache
    dictionary.set({ [lcid]: cacheEntry.json as any })
    locale.set(lcid)
  } else {
    // retrieve data from API end point (or CDN etc)
    isLoadingLocale.set(true)
    const translationData = await apiClient.localization.fetchTranslation('translation', lcid)
    dictionary.set({ [lcid]: translationData })
    locale.set(lcid)
    // update our cache
    const dt = new Date()
    const expiresAt = dt.setMinutes(dt.getMinutes() + Number(localStorageConfig.expirationInMinutes))
    if (localStorageConfig.enabled) {
      localStorage.setItem(localeStorageKey, JSON.stringify({
        appVersion: config.global.version,
        expiresAt: expiresAt,
        json: translationData
      }))
    }
    // set loading flag to false
    isLoadingLocale.set(false)
  }

  // also save the user preference
  setUserPreferredLocale(lcid)
}

export function useLocalization() {
  const availableLocales = config.localization.locales

  return { 
    locales: availableLocales,
    changeLocale,
    currentLocale,
    isLocaleLoaded,
    isLoadingLocale: derived(isLoadingLocale, $state => $state),
    t: _,
    getUserPreferredLocale
  }
}
