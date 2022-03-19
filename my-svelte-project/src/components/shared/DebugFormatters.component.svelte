<script lang="ts">

  import { useLocalization, useFormatters } from '@/localization'

  // get what we need from useLocalization:
  const { currentLocale } = useLocalization()

  $: formatters = () => {
    return useFormatters($currentLocale)
  }

  // expose component properties
  export let show = false
</script>

{#if show}
  <div>
    <h3>Debugging formatters:</h3>
    <div>Whole: { formatters().WholeNumber.format(123456789.321654) }</div>
    <div>currency: { formatters().Currency.format(123456789.321654) }</div>
    <div>date-time: { formatters().DateTimeFormat.format(new Date()) }</div>
    <div>day names: { formatters().Utils.getDayNames($currentLocale) }</div>
    <div>month names: { formatters().Utils.getMonthNames($currentLocale) }</div>
  </div>
{/if}
