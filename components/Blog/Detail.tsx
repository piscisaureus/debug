import { Blog } from '~/utils/posts.ts'
import Nav from '~/components/Nav/Nav.tsx'
import Persona from '~/components/Persona/Persona.tsx'
import Tags from '~/components/Tags/Tags.tsx'
import Pic from '~/islands/Pic.tsx'

export default function BlogDetail({ post }: { post: Blog }) {
  return (
    <>
      <Nav title={post.title}/>
      {post.hero &&
        <header class="BlogHero">
          <div>
            <Pic 
              src={post.hero.src} 
              alt={post.hero.alt}
              height={post.hero.height}
              width={post.hero.width}
            />
          </div>
        </header>
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
      {/*todo reduced motion*/}
      <style dangerouslySetInnerHTML={{ __html: `
        .BlogHero {
          animation: 1s linear blog-transition forwards;
          animation-timeline: document-timeline;
        }
        @keyframes blog-transition {
          exit 0% {
            opacity: 1;
            transform: scale(1);
          }
          exit 50%, exit 100% {
            opacity: 0;
            transform: scale(0.9) translateY(50%);
          }
        }
        ` }}
      />
      <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    </>
  )
}