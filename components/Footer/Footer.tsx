export default function Footer() {
  return (
    <footer class="Footer center-center">
      <a href="https://twitter.com/argyleink" class="icon-button">
        <div class="sr-only">Follow me on Twitter</div>
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 30 30">
          <use href="#icon.twitter"/>
        </svg>
      </a>
      <a href="https://github.com/argyleink" class="icon-button">
        <div class="sr-only">Follow me on Github</div>
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
          <use href="#icon.github"/>
        </svg>
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        .Footer {
          view-timeline: page-footer;
        }
        .Footer > a {
          animation: 1s linear footer-scroll-effect both;
          animation-timeline: page-footer;
        }
        @keyframes footer-scroll-effect {
          enter 0% {
            opacity: 0;
            transform: scale(0.5) translateY(10vh);
          }
          enter 100%, 100% {
            opacity: 1;
            transform: scale(1)  translateY(0);
          }
        }
        ` }}
      />
      {/* <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"/> */}
    </footer>
  )
}
