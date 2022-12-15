import { relDate } from '~/utils/dates.ts'

import { INote } from '~/utils/posts.ts'
import { ITags } from '~/components/Tags/Tags.tsx'

import Tags from '~/components/Tags/Tags.tsx'
import Persona from '~/components/Persona/Persona.tsx'
import Media from '~/components/Posts/Media.tsx'

export default function Note({post}:{post:INote}) {
  const tabindex = 0
  post.tags = post.tags as ITags || []

  return (
    <article class="PostItem note" style={`view-transition-name: ${post.slug}`} data-slug={post.slug} tabIndex={tabindex} data-topics={post.tags.join(' ')}>
      <Persona persona={post.persona}/>
      <header class="inline-wrap">
        <span>
          <span class="username">{post.persona.name}</span>
          <span>@{post.persona.handle}</span>
        </span>
        <time>{relDate(post.publishedAt)}</time>
      </header>
      {post.tags.length > 0 && <Tags tags={post.tags}/>}
      {post.content && <section dangerouslySetInnerHTML={{ __html: post.content }} />}
      {post.media?.length && <Media media={post.media}/>}
      <footer>
        <a href={`javascript: navigator.clipboard.writeText(window.location.href + "${post.slug}");Toast("Link <b>copied!</b>")`} class="icon-button">
          <div class="sr-only">Share a direct link to this post</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#icon.share"/>
          </svg>
        </a>
        <a href="#" class="icon-button like-button">
          <div class="sr-only">Like this post</div>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href="#icon.heart"/>
          </svg>
        </a>
      </footer>
    </article>
  )
}