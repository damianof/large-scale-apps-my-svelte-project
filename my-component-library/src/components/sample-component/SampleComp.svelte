<script lang="ts">

  // expose a property called testid
  export let testid = 'not-set'
  // expose a property called title
  export let title = 'not-set'

  // a computed property to return the css class 
  $: cssClass = (): string => {
    return `p-2 border border-green-500 ${ title }`
  }

</script>

<div data-testid={testid} class={cssClass()}>
  <span>{ title }</span>
</div>
