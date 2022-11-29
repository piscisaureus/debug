import RSSIcon from './rss.tsx'
import TwitterIcon from './twitter.tsx'
import ShareIcon from './share.tsx'
import HeartIcon from './heart.tsx'

export default function PageIcons() {
  return (
    <>
      <svg style="display: none">
        <symbol id="rss">
          <title>RSS Feed</title>
          <RSSIcon/>
        </symbol>
      </svg>
      <svg style="display: none">
        <symbol id="twitter">
          <title>Twitter Profile</title>
          <TwitterIcon/>
        </symbol>
      </svg>
      <svg style="display: none">
        <symbol id="share">
          <title>Share Icon</title>
          <ShareIcon/>
        </symbol>
      </svg>

      <svg style="display: none">
        <symbol id="heart">
          <title>Heart Icon</title>
          <HeartIcon/>
        </symbol>
      </svg>
    </>
  )
}