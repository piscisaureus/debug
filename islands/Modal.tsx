import { useEffect } from "preact/hooks"

export default function Dialog() {
  useEffect(() => {
    upgrade(this.base)
    document.addEventListener('click', handleClick.bind(this))
  }, [])

  const handleClick = e => {
    if (e.target.nodeName !== 'IMG') return
    
    e.stopPropagation()
    e.preventDefault()

    const dialog = this.base
    dialog.innerHTML = e.target.outerHTML

    const dialogImg = dialog.querySelector('img')
    dialogImg.src = dialogImg.hasAttribute('data-full')
      ? dialogImg.getAttribute('data-full')
      : dialogImg.getAttribute('src')
    dialogImg.className = null
    dialog.showModal()
  }

  return (
    <dialog class="Modal" loading onClick={lightDismiss}/>
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