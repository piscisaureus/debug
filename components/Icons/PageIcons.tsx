import RSSIcon from './rss.tsx'
import TwitterIcon from './twitter.tsx'
import ShareIcon from './share.tsx'
import HeartIcon from './heart.tsx'

export default function PageIcons() {
  return (
    <svg style="display: none">
      <symbol id="rss">
        <title>RSS Feed</title>
        <RSSIcon/>
      </symbol>
      <symbol id="twitter">
        <title>Twitter Profile</title>
        <TwitterIcon/>
      </symbol>
      <symbol id="share">
        <title>Share Icon</title>
        <ShareIcon/>
      </symbol>
      <symbol id="heart">
        <title>Heart Icon</title>
        <HeartIcon/>
      </symbol>
    </svg>
  )
}