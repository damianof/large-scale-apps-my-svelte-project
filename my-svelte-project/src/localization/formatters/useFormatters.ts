import { useDateTimeFormatters } from './useDateTimeFormatters'
import { useNumberFormatters } from './useNumberFormatters'

export const useFormatters = () => {
  return {
    useDateTimeFormatters,
    useNumberFormatters
  }
}
