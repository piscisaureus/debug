import RSSIcon from './rss.tsx'
import TwitterIcon from './twitter.tsx'
import ShareIcon from './share.tsx'
import HeartIcon from './heart.tsx'
import GithubIcon from './github.tsx'
import ArrowIcon from './arrow.tsx'
import ClockIcon from './clock.tsx'
import SkullIcon from './skull.tsx'

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
      <symbol id="github">
        <title>Github Icon</title>
        <GithubIcon/>
      </symbol>
      <symbol id="arrow">
        <title>Arrow Icon</title>
        <ArrowIcon/>
      </symbol>
      <symbol id="clock">
        <title>Clock Icon</title>
        <ClockIcon/>
      </symbol>
      <symbol id="skull">
        <title>GUI Challenges Icon</title>
        <SkullIcon/>
      </symbol>
    </svg>
  )
}