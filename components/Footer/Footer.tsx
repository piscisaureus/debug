export default function Footer() {
  return (
    <footer class="Footer center-center">
      <a href="https://twitter.com/argyleink" rel="me" class="icon-button">
        <div class="sr-only">Follow me on Twitter</div>
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 30 30">
          <use href="#icon.twitter"/>
        </svg>
      </a>
      <a rel="me" href="https://front-end.social/@argyleink" style="display: none">Mastodon</a>
      <a href="https://github.com/argyleink" rel="me" class="icon-button">
        <div class="sr-only">Follow me on Github</div>
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
          <use href="#icon.github"/>
        </svg>
      </a>
      <span class="h-card" style="display: none">
        <a class="p-name u-url" href="https://nerdy.dev">Adam Argyle</a>
        <img class="u-photo" src="https://nerdy.dev/favicon.svg"/>
        <p class="p-note">
          <a href="https://web.dev/authors/adamargyle/">CSS DevRel</a> @Google on Chrome, <a href="https://w3.org/groups/wg/css/participants/">@CSSWG</a>, co-host <a href="https://pod.link/thecsspodcast">@CSS Podcast</a>, host <a href="https://goo.gle/GUIchallenges">@GUI Challenges</a>. Web design & development tips & tricks: CSS, JS, HTML, Design, & UX.</p> 
      </span>
      {/* <style dangerouslySetInnerHTML={{ __html: `
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
      /> */}
      {/* <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"/> */}
    </footer>
  )
}
