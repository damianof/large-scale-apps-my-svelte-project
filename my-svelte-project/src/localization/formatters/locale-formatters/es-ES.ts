import { IFormatters, LocaleIds } from '@/localization'

// spanish Spain
const lcid = LocaleIds.esES

export default Object.freeze({
  // date-time:
  DateTimeFormat: new Intl.DateTimeFormat(lcid, {} as Intl.DateTimeFormatOptions),

  // numbers:
  Currency: new Intl.NumberFormat(lcid, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }),
  Decimal: new Intl.NumberFormat(lcid, {
    style: 'decimal',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }),
  WholeNumber: new Intl.NumberFormat(lcid, {
    style: 'decimal',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }),
  Percent: new Intl.NumberFormat(lcid, {
    style: 'percent',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })
}) as IFormatters
