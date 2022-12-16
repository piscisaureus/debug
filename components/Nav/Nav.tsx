import ThemeSwitch from '~/components/ThemeSwitch/ThemeSwitch.tsx'
import NavFilter from '~/components/Topics/NavFilter.tsx'

export default function Nav({layout}: {layout?: string}) {
  return (
    <>
      <nav class="Nav">
        {layout === 'detail'
          ? <a href="/" class="icon-button" id="back-to-home">
              <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
                <use href="#icon.arrow"/>
              </svg>
            </a>
          : <a href="/" class="gui-skull icon-button">
              <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 447 428">
                <use href="#icon.skull"/>
              </svg>
            </a>
        }
        {layout !== 'detail' && <NavFilter/>}
        <ThemeSwitch/>
        <a href="/rss" class="icon-button">
          <div class="sr-only">Follow my RSS feed</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#icon.rss"/>
          </svg>
        </a>
        {/* <script dangerouslySetInnerHTML={{ __html: `
          document.getElementById('back-to-home')?.addEventListener('click', e => {
            if (window.history.length > 2) {
              e.preventDefault()
              window.history.back()
            }
          })
          ` }}
        /> */}
        {/* <style dangerouslySetInnerHTML={{ __html: `
          .Nav {
            animation: 1s linear nav-transition forwards;
            animation-timeline: document-timeline;
          }
          @keyframes nav-transition {
            exit 0% {
              opacity: 0;
              transform: scale(.98);
            }
            exit 2%, exit 100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          ` }}
        /> */}
      </nav>
      <script dangerouslySetInnerHTML={{ __html: `
        const nav = document.querySelector('.Nav')
        document.addEventListener('scroll', e => {
          const st = window.pageYOffset || document.documentElement.scrollTop
          
          if (st > e.target.lastScrollTop){
            nav.setAttribute('scroll-direction', 'down')
          } 
          else {
            nav.setAttribute('scroll-direction', 'up')
          }

          e.target.lastScrollTop = st <= 0 ? 0 : st
        }, false)
        ` }}
      />
    </>
  )
}