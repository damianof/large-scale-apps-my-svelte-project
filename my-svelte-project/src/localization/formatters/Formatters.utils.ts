
type DayNameFormatType = 'long' | 'short' | 'narrow' | undefined
type MonthNameFormatType = 'long' | 'short' | 'narrow' | 'numeric' | '2-digit' | undefined


export const formattersUtils = {

  getDayNames (localeId: string, format: DayNameFormatType = 'long') {
    const result: string[] = []
    for(let i = 1; i < 8; i++ ){
      const date = new Date(1970, 1, i)
      const name = date.toLocaleString(localeId, { weekday: format })
      result.push(name)
    }
    return result
  },
  
  getMonthNames (localeId: string, format: MonthNameFormatType = 'long') {
    const result: string[] = []
    for(let i = 0; i < 12; i++ ){
      const date = new Date(1970, i, 1)
      const name = date.toLocaleString(localeId, { month: format })
      result.push(name)
    }
    return result
  }
}