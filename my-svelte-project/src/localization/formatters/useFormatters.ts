import { IFormatters } from './Formatters.interface'
import { FormattersLookup } from './FormattersLookup'
import { formattersUtils } from './Formatters.utils'

interface IUseFormatters extends IFormatters {
  Utils: typeof formattersUtils
}

export const useFormatters = (locale: string): IFormatters & IUseFormatters => {
  const result: IFormatters | IUseFormatters = {
    ...FormattersLookup[locale],
    Utils: formattersUtils
  }

  return result
}
