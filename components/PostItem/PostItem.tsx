import { Post } from '~/utils/posts.ts'

export default function PostItem(props: { post: Post }) {
  const { post } = props

  return (
    <li class="post-item">
      <a href={`/${post.id}`}>
        <h3>{post.title}</h3>
        <time>
          {new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
      </a>
      <p>{post.snippet}</p>
    </li>
  )
}