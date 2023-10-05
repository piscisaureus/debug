import RSSIcon from './rss.tsx'
import TwitterIcon from './twitter.tsx'
import MastodonIcon from './mastodon.tsx'
import ShareIcon from './share.tsx'
import HeartIcon from './heart.tsx'
import GithubIcon from './github.tsx'
import ArrowIcon from './arrow.tsx'
import ClockIcon from './clock.tsx'
import SkullIcon from './skull.tsx'
import HomeIcon from './home.tsx'
import NoteIcon from './note.tsx'
import BlogIcon from './blog.tsx'
import CssIcon from './css.tsx'
import JsIcon from './js.tsx'
import HtmlIcon from './html.tsx'
import MediaIcon from './media.tsx'
import GitIcon from './git.tsx'
import SpeakingIcon from './speaking.tsx'
import ToolsIcon from './tools.tsx'

export default function PageIcons() {
  return (
    <svg style="display: none">
      <symbol id="icon.rss">
        <title>RSS Feed</title>
        <RSSIcon/>
      </symbol>
      <symbol id="icon.twitter">
        <title>Twitter</title>
        <TwitterIcon/>
      </symbol>
      <symbol id="icon.mastodon">
        <title>Mastodon</title>
        <MastodonIcon/>
      </symbol>
      <symbol id="icon.share">
        <title>Share Icon</title>
        <ShareIcon/>
      </symbol>
      <symbol id="icon.heart">
        <title>Heart Icon</title>
        <HeartIcon/>
      </symbol>
      <symbol id="icon.github">
        <title>Github Icon</title>
        <GithubIcon/>
      </symbol>
      <symbol id="icon.arrow">
        <title>Arrow Icon</title>
        <ArrowIcon/>
      </symbol>
      <symbol id="icon.clock">
        <title>Clock Icon</title>
        <ClockIcon/>
      </symbol>
      <symbol id="icon.skull">
        <title>GUI Challenges Icon</title>
        <SkullIcon/>
      </symbol>
      <symbol id="icon.home">
        <title>Home Icon</title>
        <HomeIcon/>
      </symbol>
      <symbol id="icon.note">
        <title>Note Icon</title>
        <NoteIcon/>
      </symbol>
      <symbol id="icon.blog">
        <title>Blog Icon</title>
        <BlogIcon/>
      </symbol>
      <symbol id="icon.css">
        <title>CSS Icon</title>
        <CssIcon/>
      </symbol>
      <symbol id="icon.js">
        <title>JS Icon</title>
        <JsIcon/>
      </symbol>
      <symbol id="icon.html">
        <title>HTML Icon</title>
        <HtmlIcon/>
      </symbol>
      <symbol id="icon.media">
        <title>Media Icon</title>
        <MediaIcon/>
      </symbol>
      <symbol id="icon.git">
        <title>Git Icon</title>
        <GitIcon/>
      </symbol>
      <symbol id="icon.talks">
        <title>Speaking Icon</title>
        <SpeakingIcon/>
      </symbol>

      <symbol id="icon.tools">
        <title>Tools Icon</title>
        <ToolsIcon/>
      </symbol>
    </svg>
  )
}