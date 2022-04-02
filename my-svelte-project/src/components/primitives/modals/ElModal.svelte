<script lang="ts">
  import { fade } from "svelte/transition"
  import { ModalProps } from './ModalProps.interface'
  import ElButton from '../buttons/ElButton.svelte'
  import ElText from '../text/ElText.svelte'

  // private properties (will set through setProps method)
  let props: ModalProps = {
    testid: 'testid-not-set',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm?',
    title: 'Do you confirm this action?',
    longDesc: ''
  }

  // public setProps() method used to set the private props from our useModal hook
  export const setProps = (params: ModalProps) => {
    props = {
      ...props,
      ...params
    }
  }

  const fadeOptions = { duration: 125 }

  // private flag that indicates whether the Modal is open or closed
  let open: boolean

  // a variable that will store a reference to a "resolve" from a Promise we created in the prompt() method
  let privateResolve: (value: boolean | PromiseLike<boolean>) => void

  // public prompt() method:
  export const prompt = async (title?: string) => {
    open = true
    props.title = title || props.title
    // return a new promise that will be waited by the consuming code
    return new Promise<boolean>((resolve) => {
      // here we store a reference to the resolve returned with the Promise to the consuming code
      privateResolve = resolve
    })
  }

  const close = () => {
    open = false
  }

  // handle click from Cancel button 
  const onCancelClick = () => {
    close()
    privateResolve(false)
  }

  // handle click from Confirm button
  const onConfirmClick = () => {
    close()
    privateResolve(true)
  }

  $: cssClass = () => {
    const result = ['fixed z-10 inset-0 overflow-y-auto transform transition-all']
    // might add additional css based on conditions...
    return result.join(' ').trim()
  }
</script>

{#if open}
  <div transition:fade={fadeOptions} data-testid={props.testid} class={cssClass()} aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-gray-400 bg-opacity-75" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <!--  Modal panel -->
      <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <!-- HeroIcon -->
            <svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-5">
            <ElText id="modal-title" tag="h3" text={props.title} addCss="text-lg leading-6 font-medium"/>
            {#if props.longDesc}
            <div class="mt-2">
              <ElText tag="p" text={props.longDesc} addCss="text-sm text-gray-500"/>
            </div>
            {/if}
          </div>
        </div>
        <div class="mt-5 sm:mt-6 grid gap-3 sm:grid-cols-2 sm:grid-flow-row-dense">
          <ElButton id="modal-cancel" buttonType="secondary" disabled={false} label={props.cancelLabel} on:clicked={onCancelClick}/>
          <ElButton id="modal-confirm" buttonType="danger" disabled={false} label={props.confirmLabel} on:clicked={onConfirmClick}/>
        </div>
      </div>
    </div>
  </div>
{/if}
