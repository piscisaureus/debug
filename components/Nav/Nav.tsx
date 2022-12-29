import ThemeSwitch from '~/components/ThemeSwitch/ThemeSwitch.tsx'
import NavFilter from '~/components/Topics/NavFilter.tsx'

export default function Nav({layout}: {layout?: string}) {
  return (
    <>
      {layout !== 'detail' && <a id="skip-link" href='#feed'>Skip to main feed</a>}
      <nav class="Nav">
        {layout === 'detail'
          ? <a href="/" title="Back home" class="icon-button" id="back-to-home">
              <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
                <use href="#icon.arrow"/>
              </svg>
            </a>
          : <a href="/" title="Home" class="gui-skull icon-button">
              <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 447 428">
                <use href="#icon.skull"/>
              </svg>
            </a>
        }
        {layout !== 'detail' && <NavFilter/>}
        <ThemeSwitch/>
        <a href="/rss.xml" class="icon-button">
          <div class="sr-only">Follow my RSS feed</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#icon.rss"/>
          </svg>
        </a>
      </nav>
      <script dangerouslySetInnerHTML={{ __html: `
        document.body.removeAttribute('nojs')
        const nav = document.querySelector('.Nav')

        document.addEventListener('scroll', e => {
          const st = window.pageYOffset || document.documentElement.scrollTop
          const direction = st > e.target.lastScrollTop
            ? 'down'
            : 'up'
          if (Math.abs(st - e.target.lastScrollTop) > 10)
            nav.setAttribute('scroll-direction', direction)
          e.target.lastScrollTop = st <= 0 ? 0 : st
        }, {passive: true})
        ` }}
      />
    </>
  )
}