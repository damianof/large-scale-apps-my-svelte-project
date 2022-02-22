import { dictionary, locale, _ } from 'svelte-i18n'
import { writable, derived } from 'svelte/store'

import { config } from '../config'
import { apiClient } from '../api-client'

const availableLocales = config.localization.locales

const userPreferredLocaleStorageKey = 'user-lcid'

const isLoadingLocale = writable(false)
const currentLocale = derived(locale, $state => $state)
const isLocaleLoaded = derived(locale, $state => typeof $state === 'string')

const changeLocale = async (lcid: string) => {
  // try to get it from locale storage
  const localeStorageKey = `lcid-data-${ lcid }`
  const cacheDataStr = localStorage.getItem(localeStorageKey)
  let cacheData: Object = null
  try {
    cacheData = JSON.parse(cacheDataStr)
  } catch (e) {
    console.warn('error parsing data', cacheDataStr)
  }

  if (cacheData) {
    // retrieve from cache
    dictionary.set({ [lcid]: cacheData as any })
    locale.set(lcid)
  } else {
    // retrieve data from API end point (or CDN etc)
    isLoadingLocale.set(true)
    const translationData = await apiClient.localization.fetchTranslation('translation', lcid)
    dictionary.set({ [lcid]: translationData })
    locale.set(lcid)
    // update our cache
    localStorage.setItem(localeStorageKey, JSON.stringify(translationData))
    isLoadingLocale.set(false)
  }

  // also save the user preference
  localStorage.setItem(userPreferredLocaleStorageKey, lcid)
}

export function useLocalization() {
  return { 
    locales: config.localization.locales,
    changeLocale,
    currentLocale,
    isLocaleLoaded,
    isLoadingLocale: derived(isLoadingLocale, $state => $state),
    t: _,

    getUserPreferredLocale() {
      // try to retrive from local storage if they have one saved
      const preferredLocale = localStorage.getItem(userPreferredLocaleStorageKey)
      if (!preferredLocale) {
        const defaultLocale = availableLocales.find(o => o.isDefault).key
        return defaultLocale
      }
      return preferredLocale
    }
  }
}
