import { Post } from '~/utils/posts.ts'
import { relDate } from '~/utils/dates.ts'

import Tags from '~/components/Tags/Tags.tsx'
import Pic from '~/islands/Pic.tsx'

export default function PostItem(props: { post: Post }) {
  const { post } = props
 
  if (post.type === 'blog') {
    return (
      <li class="post-item">
        <img class="persona" src="favicon.svg" width="40" alt="A skull icon icon with a flipped up bill on a hotpink hat."/>
        <header class="inline-wrap">
          <span>
            <span class="username">Someone</span>
            <span>@{post.persona}</span>
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
        <img class="persona" src="favicon.svg" width="40" alt="A skull icon icon with a flipped up bill on a hotpink hat."/>
        <header class="inline-wrap">
          <span>
            <span class="username">Someone</span>
            <span>@{post.persona}</span>
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