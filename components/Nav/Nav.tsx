export default function Nav(props) {
  return (
    <nav class="Nav">
      <a href="/">
        <img src="favicon.svg" width="24" alt="A skull icon icon with a flipped up bill on a hotpink hat."/>
      </a>
      {/*<h1>{props?.title || 'Home'}</h1>*/}
      {/*todo: theme switch */}
      <a href="https://twitter.com/argyleink">
        <div class="sr-only">Follow me on Twitter</div>
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 30 30">
          <use href="#twitter"/>
        </svg>
      </a>
      <a href="/rss">
        <div class="sr-only">Follow my RSS feed</div>
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
          <use href="#rss"/>
        </svg>
      </a>
      <style dangerouslySetInnerHTML={{ __html: `
        html {
          view-timeline: document-timeline;
        }
        .Nav {
          animation: 1s linear nav-transition forwards;
          animation-timeline: document-timeline;
        }
        @keyframes nav-transition {
          exit 0% {
            opacity: 0;
          }
          exit 10%, exit 100% {
            opacity: 1;
          }
        }
        ` }}
      />
    </nav>
  )
}