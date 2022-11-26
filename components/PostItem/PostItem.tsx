import { Post } from '~/utils/posts.ts'
import { relDate } from '~/utils/dates.ts'
import Pic from '~/islands/Pic.tsx'

export default function PostItem(props: { post: Post }) {
  const { post } = props

  return (
    <li class="post-item">
      <a href={`/${post.id}`}>
        <h3>{post.title}</h3>
        <time>{relDate(post.publishedAt)}</time>
      </a>
      {post.hero &&
        <figure>
          <Pic src={post.hero} alt={post.heroAlt}/>
        </figure>
      }
      <p>{post.snippet}</p>
    </li>
  )
}