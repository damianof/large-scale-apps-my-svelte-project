
/*
  interface DateTimeFormatOptions {
    formatMatcher?: "basic" | "best fit" | "best fit" | undefined;
    dateStyle?: "full" | "long" | "medium" | "short" | undefined;
    timeStyle?: "full" | "long" | "medium" | "short" | undefined;
    dayPeriod?: "narrow" | "short" | "long" | undefined;
    fractionalSecondDigits?: 0 | 1 | 2 | 3 | undefined;
  }
*/

type DayNameFormatType = 'long' | 'short' | 'narrow' | undefined
type MonthNameFormatType = 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined


export const useDateTimeFormatters = (localeId: string) => {
  const _lcid = localeId
  const _cache = new Map<string, Intl.DateTimeFormat>()

  const _cacheDayNames = new Map<string, { id: number, name: string }[]>()
  const _cacheMonthNames = new Map<string, { id: number, name: string }[]>()
  
  return {
    dateTime: (dateStyle?: string, timeStyle?: string) => {
      dateStyle = (dateStyle || '').trim().toLowerCase()
      timeStyle = (timeStyle || '').trim().toLowerCase()

      let cacheKey = `${ _lcid }-${ dateStyle }`
      if (timeStyle.length) {
        cacheKey = `${ cacheKey }-${ timeStyle }`
      }

      if (!_cache.has(cacheKey)) {
        // if not in our cache yet, create it and cache it
        let options: { dateStyle?: string, timeStyle?: string } = {}
        if (dateStyle.length) {
          options.dateStyle = dateStyle
        }
        if (timeStyle.length) {
          options.timeStyle = timeStyle
        }
        // cache instance
        const instance = new Intl.DateTimeFormat(_lcid, options as Intl.DateTimeFormatOptions)
        _cache.set(cacheKey, instance)
      }
      // return instance from cache
      return _cache.get(cacheKey) as Intl.DateTimeFormat
    },

    dayNames: (format: DayNameFormatType = 'long') => {
      if (!_cacheDayNames.has(format)) {
        // if not in our cache yet, create it and cache it
        const items: { id: number, name: string }[] = []
        for(let i = 1; i < 8; i++ ){
          const date = new Date(1970, 1, i)
          const name = date.toLocaleString(_lcid, { weekday: format })
          items.push({ id: i, name })
        }
        _cacheDayNames.set(format, items)
      }
      // return cached items
      return _cacheDayNames.get(format) as { id: number, name: string }[]
    },
    
    monthNames: (format: MonthNameFormatType = 'long') => {
      if (!_cacheMonthNames.has(format)) {
        // if not in our cache yet, create it and cache it
        const items: { id: number, name: string }[] = []
        for(let i = 0; i < 12; i++ ){
          const date = new Date(1970, i, 1)
          const name = date.toLocaleString(_lcid, { month: format })
          items.push({ id: i, name })
        }
        _cacheMonthNames.set(format, items)
      }
      // return cached items
      return _cacheMonthNames.get(format) as { id: number, name: string }[]
    }
  }
}
