export interface IFormatters {
  // datetime formatter
  DateTimeFormat: Intl.DateTimeFormat

  // number formatters
  Currency: Intl.NumberFormat
  Decimal: Intl.NumberFormat
  WholeNumber: Intl.NumberFormat
  Percent: Intl.NumberFormat

  // You can add more as needed here, even custom ones
  //Custom: ICustomFormatter
}
