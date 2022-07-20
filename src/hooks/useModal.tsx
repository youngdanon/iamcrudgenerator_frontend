import ReactDOM from 'react-dom/client'
import React from 'react'
import ModalLayout, { ModalLayoutProps } from '../components/ModalLayout'

interface ModalProps extends ModalLayoutProps{
  body: React.ReactNode
  footer?: React.ReactNode
  title?: string
  onClose: () => void
  hiddenHeader?: boolean
}

class Modal {
  id: string

  root?: ReactDOM.Root

  rootElement: HTMLElement | null

  modalContainer?: HTMLDivElement

  constructor () {
    this.id = `modal_${Date.now()}`
    this.rootElement = document.getElementById('root')
  }

  close (): void {
    this.root?.unmount()
    this.modalContainer?.remove()
  }

  open (config: ModalProps): void {
    if (this.rootElement) {
      this.modalContainer = this.rootElement?.appendChild(document.createElement('div'))
      this.modalContainer.id = this.id
      this.root = ReactDOM.createRoot(this.modalContainer)
      this.root?.render(
        <ModalLayout {...config} />
      )
    }
  }
}

/** хук создания модального окна */
const useModal: () => { modal: Modal } = () => ({
  modal: new Modal()
})

export default useModal
