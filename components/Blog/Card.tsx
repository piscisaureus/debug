import { relDate } from '~/utils/dates.ts'

import { IBlog } from '~/utils/posts.ts'
import { ITags } from '~/components/Tags/Tags.tsx'

import Pic from '~/islands/Pic.tsx'
import Tags from '~/components/Tags/Tags.tsx'
import Persona from '~/components/Persona/Persona.tsx'

export default function BlogPost({post}:{post:IBlog}) {
  const tabindex = 0

  return (
    <article class="PostItem blogpost" data-slug={post.slug} tabIndex={tabindex} style={`view-transition-name: ${post.slug}`} data-tags={post.tags?.join(' ')}>
      <Persona persona={post.persona} style={`view-transition-name: ${post.slug}-avatar`}/>
      <header class="inline-wrap">
        <span>
          <span class="username">{post.persona.name}</span>
          <span>@{post.persona.handle}</span>
        </span>
        <time>{relDate(post.publishedAt)}</time>
      </header>
      {post.tags.length > 0 && <Tags tags={post.tags as ITags}/>}
      <h2>{post.title}</h2>
      {post.hero &&
        <figure>
          <Pic 
            src={post.hero.src} 
            alt={post.hero.alt}
            height={post.hero.height}
            width={post.hero.width}
            style={`view-transition-name: ${post.slug}-hero`}
          />
        </figure>
      }
      <p 
        style={`view-transition-name: ${post.slug}-snippet`} 
        dangerouslySetInnerHTML={{ __html: post.snippet as string }} 
      />
      <footer>
        <a href={`/${post.slug}`}>Full article</a>
      </footer>
    </article>
  )
}