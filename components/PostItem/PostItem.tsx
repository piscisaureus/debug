import { Post } from '~/utils/posts.ts'
import { relDate } from '~/utils/dates.ts'

import Tags from '~/components/Tags/Tags.tsx'
import Pic from '~/islands/Pic.tsx'

export default function PostItem(props: { post: Post }) {
  const { post } = props
 
  if (post.type === 'blog') {
    return (
      <li class="post-item">
        <a href={`/${post.slug}`}>{post.title}</a>
        <span>{post.persona}</span>
        <time>{relDate(post.publishedAt)}</time>
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
  else {
    return (
      <li class="post-item">
        <a href={`/${post.slug}`}>{post.persona}</a>
        <time>{relDate(post.publishedAt)}</time>
        {post.media.length &&
          <span>has media</span>
        }
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        <Tags tags={post.tags}/>
      </li>
    )
  }
}