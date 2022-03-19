
/*
  interface DateTimeFormatOptions {
    formatMatcher?: "basic" | "best fit" | "best fit" | undefined;
    dateStyle?: "full" | "long" | "medium" | "short" | undefined;
    timeStyle?: "full" | "long" | "medium" | "short" | undefined;
    dayPeriod?: "narrow" | "short" | "long" | undefined;
    fractionalSecondDigits?: 0 | 1 | 2 | 3 | undefined;
  }
*/

export const useNumberFormatters = (localeId: string) => {
  const _lcid = localeId
  const _cache = new Map<string, Intl.NumberFormat>()

  const _privateGetFormatter = (style: string, currency: string | undefined, minimumFractionDigits: number, maximumFractionDigits: number) => {
    style = (style || 'decimal').trim().toLowerCase()
    currency = (currency || '').trim().toLowerCase()
   
    let cacheKey = `${ _lcid }-${ style }`
    if (currency.length) {
      cacheKey = `${ cacheKey }-${ currency }`
    }
    cacheKey = `${ minimumFractionDigits }-${ maximumFractionDigits }`

    if (!_cache.has(cacheKey)) {
      // if not in our cache yet, create it and cache it
      let options: Intl.NumberFormatOptions = {
        style,
        minimumFractionDigits, 
        maximumFractionDigits
      }
      if (currency.length > 0) {
        options.currency = currency
      }
      // cache instance
      const instance = new Intl.NumberFormat(_lcid, options)
      _cache.set(cacheKey, instance)
    }
    // return instance from cache
    return _cache.get(cacheKey) as Intl.NumberFormat
  }
  
  return {
    whole: () => {
      return _privateGetFormatter('decimal', '', 0, 0)
    },
    decimal: (minimumFractionDigits: number = 0, maximumFractionDigits: number = 2) => {
      return _privateGetFormatter('decimal', undefined, minimumFractionDigits, maximumFractionDigits)
    },
    currency: (currency: string, minimumFractionDigits: number = 0, maximumFractionDigits: number = 2) => {
      return _privateGetFormatter('currency', currency, minimumFractionDigits, maximumFractionDigits)
    },
    percent: (currency?: string, minimumFractionDigits: number = 0, maximumFractionDigits: number = 2) => {
      return _privateGetFormatter('percent', currency, minimumFractionDigits, maximumFractionDigits)
    }
  }
}
