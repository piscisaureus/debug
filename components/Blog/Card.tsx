import { relDate } from '~/utils/dates.ts'

import { IBlog } from '~/utils/posts.ts'
import { ITags } from '~/components/Tags/Tags.tsx'

import Pic from '~/islands/Pic.tsx'
import Tags from '~/components/Tags/Tags.tsx'
import Persona from '~/components/Persona/Persona.tsx'

export default function BlogPost({post}:{post:IBlog}) {
  const tags = post.tags ? post.tags.filter(tag => !tag.includes('blog')) : []
  const tabindex = 0

  return (
    <article class="PostItem" style={`view-transition-name: ${post.slug}`} tabIndex={tabindex} data-tags={post.tags?.join(' ')}>
      <Persona persona={post.persona}/>
      <header class="inline-wrap">
        <span>
          <span class="username">{post.persona.name}</span>
          <span>@{post.persona.handle}</span>
        </span>
        <time>{relDate(post.publishedAt)}</time>
      </header>
      {tags.length > 0 && <Tags tags={tags as ITags}/>}
      {post.hero &&
        <figure>
          <Pic 
            src={post.hero.src} 
            alt={post.hero.alt}
            height={post.hero.height}
            width={post.hero.width}
          />
        </figure>
      }
      <p>{post.snippet}</p>
      <footer>
        <a href={`/${post.slug}`}>Full article</a>
      </footer>
    </article>
  )
}