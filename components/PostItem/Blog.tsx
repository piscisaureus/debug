import { Post } from '~/utils/posts.ts'
import { relDate } from '~/utils/dates.ts'

import Pic from '~/islands/Pic.tsx'
import Tags from '~/components/Tags/Tags.tsx'
import Persona from '~/components/Persona/Persona.tsx'

export default function BlogPost(props: { post: Post }) {
  const {post} = props

  return (
    <li class="post-item">
      <Persona persona={post.persona}/>
      <header class="inline-wrap">
        <span>
          <span class="username">{post.persona.name}</span>
          <span>@{post.persona.handle}</span>
        </span>
        <time>{relDate(post.publishedAt)}</time>
      </header>
      <Tags tags={post.tags}/>
      {post.hero &&
        <figure>
          <Pic src={post.hero} alt={post.heroAlt}/>
        </figure>
      }
      <p>{post.snippet}</p>
    </li>
  )
}