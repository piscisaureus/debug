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
      <p dangerouslySetInnerHTML={{ __html: post.content }}/>
      {post.media.length &&
        <span>has media</span>
      }
      <a href={`/${post.slug}`}>Read ></a>
    </li>
  )
}