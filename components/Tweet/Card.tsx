import { relDate } from '~/utils/dates.ts'

import { ITweet } from '~/utils/posts.ts'
import { ITags } from '~/components/Tags/Tags.tsx'

import Pic from '~/islands/Pic.tsx'
import Tags from '~/components/Tags/Tags.tsx'
import Persona from '~/components/Persona/Persona.tsx'
import MediaScroller from '~/components/MediaScroller/MediaScroller.tsx'

export default function Tweet({post}:{post:ITweet}) {
  const tags = post.tags ? post.tags.filter(tag => !tag.includes('tweet')) : []
  const tabindex = 0

  return (
    <article tabIndex={tabindex} class="PostItem" data-tags={tags.join(' ')}>
      <Persona persona={post.persona}/>
      <header class="inline-wrap">
        <span>
          <span class="username">{post.persona.name}</span>
          <span>@{post.persona.handle}</span>
        </span>
        <time>{relDate(post.publishedAt)}</time>
      </header>
      {tags.length > 0 && <Tags tags={tags as ITags}/>}
      {post.content && <section dangerouslySetInnerHTML={{ __html: post.content }} />}
      {
        post.media?.length && post.media?.length === 1
          ? <figure>
              <Pic {...post.media[0]}/>
            </figure>
          : post.media?.length && <MediaScroller media={post.media}/>
      }
      <footer>
        <a href={`/${post.slug}`}>
          <div class="sr-only">Share a direct link to this post</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#share"/>
          </svg>
        </a>
        <a href="#">
          <div class="sr-only">Like this post</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#heart"/>
          </svg>
        </a>
      </footer>
    </article>
  )
}