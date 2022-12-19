import { useEffect } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'

export default function Dialog(props) {
  useEffect(() => {
    upgrade(this.base)
  }, [])

  return (
    <dialog class="Modal" loading onClick={lightDismiss} ref={this.ref}/>
  )
}

const dialogClosingEvent = new Event('closing')
const dialogClosedEvent  = new Event('closed')
const dialogOpeningEvent = new Event('opening')
const dialogOpenedEvent  = new Event('opened')
const dialogRemovedEvent = new Event('removed')

const lightDismiss = ({target:dialog}) => {
  if (dialog.nodeName === 'DIALOG')
    dialog.close('dismiss')
}

const animationsComplete = element =>
  Promise.allSettled(
    element.getAnimations().map(animation => 
      animation.finished))

const dialogClose = async ({target:dialog}) => {
  dialog.setAttribute('inert', '')
  dialog.dispatchEvent(dialogClosingEvent)

  await animationsComplete(dialog)

  dialog.dispatchEvent(dialogClosedEvent)
}

async function upgrade(dialog) {
  // dialog.addEventListener('click', lightDismiss)
  dialog.addEventListener('close', dialogClose)

  // track opening
  const dialogAttrObserver = new MutationObserver((mutations, observer) => {
    mutations.forEach(async mutation => {
      if (mutation.attributeName === 'open') {
        const dialog = mutation.target

        const isOpen = dialog.hasAttribute('open')
        if (!isOpen) return

        dialog.removeAttribute('inert')

        // set focus
        const focusTarget = dialog.querySelector('[autofocus]')
        focusTarget
          ? focusTarget.focus()
          : dialog.querySelector('button')?.focus()

        dialog.dispatchEvent(dialogOpeningEvent)
        await animationsComplete(dialog)
        dialog.dispatchEvent(dialogOpenedEvent)
      }
    })
  })

  // track deletion
  const dialogDeleteObserver = new MutationObserver((mutations, observer) => {
    mutations.forEach(mutation => {
      mutation.removedNodes.forEach(removedNode => {
        if (removedNode.nodeName === 'DIALOG') {
          removedNode.removeEventListener('click', lightDismiss)
          removedNode.removeEventListener('close', dialogClose)
          removedNode.dispatchEvent(dialogRemovedEvent)
        }
      })
    })
  })

  dialogAttrObserver.observe(dialog, { 
    attributes: true,
  })

  dialogDeleteObserver.observe(document.body, {
    attributes: false,
    subtree: false,
    childList: true,
  })

  // remove loading attribute
  // prevent page load @keyframes playing
  await animationsComplete(dialog)
  dialog.removeAttribute('loading')
}