import { JSX } from 'preact'
import { Post } from '../utils/posts.ts'

export default function PostItem(props: { post: Post }) {
  const { post } = props

  return (
    <li class="post">
      <a href={`/${post.id}`}>
        <h3>
          {post.title}
        </h3>
        <time>
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <div>
          {post.snippet}
        </div>
      </a>
    </li>
  )
}