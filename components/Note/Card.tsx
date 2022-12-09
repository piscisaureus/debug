import { relDate } from '~/utils/dates.ts'

import { INote } from '~/utils/posts.ts'
import { ITags } from '~/components/Tags/Tags.tsx'

import Tags from '~/components/Tags/Tags.tsx'
import Persona from '~/components/Persona/Persona.tsx'
import Media from '~/components/Posts/Media.tsx'

export default function Note({post}:{post:INote}) {
  const tags = post.tags ? post.tags.filter(tag => !tag.includes('note')) : []
  const tabindex = 0

  return (
    <article class="PostItem" style={`view-transition-name: ${post.slug}`} tabIndex={tabindex} data-tags={tags.join(' ')}>
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
      {post.media?.length && <Media media={post.media}/>}
      <footer>
        <a href={`/${post.slug}`} class="icon-button">
          <div class="sr-only">Share a direct link to this post</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#share"/>
          </svg>
        </a>
        <a href="#" class="icon-button">
          <div class="sr-only">Like this post</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#heart"/>
          </svg>
        </a>
      </footer>
    </article>
  )
}