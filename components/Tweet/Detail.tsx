import { ITweet } from '~/utils/posts.ts'
import Nav from '~/components/Nav/Nav.tsx'
import Tweet from '~/components/Tweet/Card.tsx'

export default function TweetDetail({post}:{post:ITweet}) {
  return (
    <>
      <Nav/>

      <main class="PostDetail">
        <header>
          <time>{new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</time>
        </header>
        <Tweet post={post}/>
      </main>
    </>
  )
}