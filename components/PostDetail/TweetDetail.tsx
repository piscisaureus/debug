import Nav from '~/components/Nav/Nav.tsx'
import Tweet from '~/components/PostItem/Tweet.tsx'

export default function TweetDetail({post}) {
  return (
    <>
      <Nav title={post.title}/>

      <main class="center-center">
        <header>
          <time>{new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</time>
        </header>
        <Tweet post={post}/>
      </main>

      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    </>
  )
}