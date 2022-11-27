import { render } from 'https://deno.land/x/gfm/mod.ts'

import Nav from '~/components/Nav/Nav.tsx'
import Pic from '~/islands/Pic.tsx'

export default function PostDetail({post}) {
  return (
    <>
      <Nav title={post.title}/>
      {post.hero &&
        <Pic src={post.hero} alt={post.heroAlt}/>
      }

      <header>
        <time>{new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</time>

        {<p>{post.snippet}</p>}
      </header>

      <main class="markdown"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    </>
  )
}