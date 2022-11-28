import { relDate } from '~/utils/dates.ts'

import Nav from '~/components/Nav/Nav.tsx'
import Persona from '~/components/Persona/Persona.tsx'
import Tags from '~/components/Tags/Tags.tsx'
import Pic from '~/islands/Pic.tsx'

export default function BlogDetail({post}) {
  return (
    <>
      <Nav title={post.title}/>
      {post.hero &&
        <Pic 
          src={post.hero.src} 
          alt={post.hero.alt}
          height={post.hero.height}
          width={post.hero.width}
        />
      }
      <main class="BlogDetail block-stack">
        <header class="block-stack">
          <Persona persona={post.persona}/>

          <time>{new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</time>
          <Tags tags={post.tags}/>
          {<p>{post.snippet}</p>}
        </header>

        <article 
          class="block-stack"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    </>
  )
}