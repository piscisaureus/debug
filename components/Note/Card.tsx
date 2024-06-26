import { relDate } from '~/utils/dates.ts'

import { INote } from '~/utils/posts.ts'
import { ITags } from '~/components/Tags/Tags.tsx'

import Tags from '~/components/Tags/Tags.tsx'
import Persona from '~/components/Persona/Persona.tsx'
import Media from '~/components/Posts/Media.tsx'

export default function Note({post,addTabIndex = true,index}:{post:INote, addTabIndex:Boolean, index:Number}) {
  const tabindex = 0
  post.tags = post.tags as ITags || []
  const shouldVT = index < 10

  return (
    <article class="PostItem note h-entry" data-index={index} data-slug={post.slug} style={shouldVT && `view-transition-name: ${post.slug}`} tabIndex={addTabIndex && tabindex} data-topics={post.tags.join(' ')}>
      <Persona persona={post.persona}/>
      <header class="inline-wrap">
        <span class="truncate">
          <span class="username p-author">{post.persona.name}</span>
          <span>@{post.persona.handle}</span>
        </span>
        <time class="dt-published">{relDate(post.publishedAt)}</time>
      </header>
      {post.tags.length > 0 && <Tags tags={post.tags}/>}
      {post.content && <section class="e-content" dangerouslySetInnerHTML={{ __html: post.content }} />}
      {post.media?.length && <Media media={post.media}/>}
      <footer>
        <a class="nojs" href={`/${post.slug}`} class="u-url">Full note</a>
        <a href={`javascript: navigator.clipboard.writeText(window.location.href + "${post.slug}");Toast("Link <b>copied!</b>")`} class="icon-button share-button">
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