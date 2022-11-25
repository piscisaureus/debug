
import { JSX } from 'preact'
import RSSIcon from './rss.tsx'

export default function PageIcons() {
  return (
    <svg style="display: none">
      <symbol id="rss">
        <title>RSS Feed</title>
        <RSSIcon/>
      </symbol>
    </svg>
  )
}