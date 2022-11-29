export default function Nav(props) {
  return (
    <nav class="Nav">
      <a href="/">
        <img src="favicon.svg" width="24" alt="A skull icon icon with a flipped up bill on a hotpink hat."/>
      </a>
      {/*<h1>{props?.title || 'Home'}</h1>*/}
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
    </nav>
  )
}