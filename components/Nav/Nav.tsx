export default function Nav(props) {
  return (
    <nav class="page-nav">
      <img src="favicon.svg" width="40" alt="A skull icon icon with a flipped up bill on a hotpink hat."/>
      <h1>{props?.title || 'Home'}</h1>
      <a href="/rss">
        <svg class="filled-icon" width="48" height="48" viewBox="0 0 24 24">
          <use href="#rss"/>
        </svg>
      </a>
    </nav>
  )
}