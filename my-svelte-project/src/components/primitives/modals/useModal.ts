// file: src/components/primitives/modals/useModal.ts
import ElModal from './ElModal.svelte'
import { ModalProps } from './ModalProps.interface'

let instance!: ElModal

/**
 * @name useModal
 * @param props The modal props
 * @returns the Modal component instance
 */
export const useModal = (props: ModalProps) => {
  if (!instance) {
    // get the modal target dom element by id
    let domTarget = document.getElementById('modal')
    // if not existing yet, create it with vanilla JS
    if (!domTarget) {
      domTarget = document.createElement('div')
      domTarget.setAttribute('id', 'modal')
      document.body.appendChild(domTarget)
    }
    // create the ElModal instance
    instance = new ElModal({ target: domTarget })
  }

  // set the Modal props
  instance.setProps(props)

  // return the instance
  return instance
}
