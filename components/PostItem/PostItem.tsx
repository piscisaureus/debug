import { Post } from '~/utils/posts.ts'
import { relDate } from '~/utils/dates.ts'

import Tags from '~/components/Tags/Tags.tsx'
import Pic from '~/islands/Pic.tsx'

export default function PostItem(props: { post: Post }) {
  const { post } = props
 
  if (post.type === 'blog') {
    return (
      <li class="post-item">
        <img class="persona" src={post.persona.avatar} width="40" alt={post.persona.avatarAlt} />
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
  else if (post.type === 'tweet') {
    return (
      <li class="post-item">
        <img class="persona" src={post.persona.avatar} width="40" alt={post.persona.avatarAlt} />
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
}