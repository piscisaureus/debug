export default function Footer() {
  return (
    <>
      <footer class="Footer center-center">
        <a href="https://twitter.com/argyleink" rel="me" class="icon-button">
          <div class="sr-only">Follow me on Twitter</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 30 30">
            <use href="#icon.twitter"/>
          </svg>
        </a>
        <a rel="me" href="https://front-end.social/@argyleink">
          <div class="sr-only">Follow me on Mastodon</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#icon.mastodon"/>
          </svg>
        </a>
        <a href="https://bsky.app/profile/nerdy.dev" rel="me" class="icon-button">
          <div class="sr-only">Follow me on Bluesky</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#icon.bluesky"/>
          </svg>
        </a>
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
      </footer>

      <div class="Webring">
        <p>Member of a <a href="https://CS.Sjoy.lol">CSS</a> <a href="https://en.wikipedia.org/wiki/Webring">Webring</a></p>
        <small>Try a site in the ring!</small>
        <div>
          <a href="https://webri.ng/webring/cssjoy/previous?via=https%3A%2F%2Fnerdy.dev">Previous</a>
          <a href="https://webri.ng/webring/cssjoy/random?via=https%3A%2F%2Fnerdy.dev">Random</a>
          <a href="https://webri.ng/webring/cssjoy/next?via=https%3A%2F%2Fnerdy.dev">Next</a>
        </div>
      </div>
    </>
  )
}
