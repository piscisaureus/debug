import { IHero } from '~/utils/posts.ts'

import Pic from '~/islands/Pic.tsx'
import Video from '~/components/Video/Video.tsx'
import MediaScroller from '~/components/MediaScroller/MediaScroller.tsx'

export default function Media({media}: {media: IHero[]}) {
  if (media.length > 1) 
    return <MediaScroller media={media}/>

  return <>{
    media.map(item =>
      item.src.includes('mp4')
        ? <figure><Video {...item}/></figure>
        : <figure><Pic {...item}/></figure>
    )
  }</>
}