import readingTime from 'https://esm.sh/reading-time'

import { IBlog } from '~/utils/posts.ts'

import Persona from '~/components/Persona/Persona.tsx'
import Tags, { ITags } from '~/components/Tags/Tags.tsx'
import Pic from '~/islands/Pic.tsx'

export default function BlogDetail({ post }: { post: IBlog }) {
  const tags = post.tags ? post.tags.filter(tag => !tag.includes('blog')) : []

  return (
    <>
      {post.hero &&
        <header class="BlogHero">
          <div>
            <Pic 
              src={post.hero.src} 
              alt={post.hero.alt}
              height={post.hero.height}
              width={post.hero.width}
              style={`view-transition-name: ${post.slug}-hero`}
            />
          </div>
        </header>
      }
      <main class="BlogDetail block-stack">
        <header class="block-stack">
          <Persona persona={post.persona} style={`view-transition-name: ${post.slug}-avatar`}/>

          <h1>{post.title}</h1>
          <time>{new Date(post.publishedAt).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</time>
          <span class="read-time">
            <svg aria-hidden class="filled-icon" width="20" height="20" viewBox="0 0 24 24">
              <use href="#clock"/>
            </svg>
            {readingTime(post.content).text}
          </span>
          {tags.length > 0 && <Tags tags={tags as ITags}/>}
          {/* <p 
            style={`view-transition-name: ${post.slug}-snippet`}
            dangerouslySetInnerHTML={{ __html: post.snippet as string }}
          /> */}
        </header>

        <article 
          class="block-stack"
          style={`view-transition-name: ${post.slug}`}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/*todo: <aside> of headings (see observable settings page)*/}
      </main>
      {/*todo reduced motion*/}
      <style dangerouslySetInnerHTML={{ __html: `
        .BlogHero {
          animation: 1s linear blog-transition forwards;
          animation-timeline: hero-timeline;
          view-timeline: hero-timeline;
        }
        /* todo: don't animate avatar on mobile */
        .BlogDetail > header > img:first-child {
          animation: 1s linear blog-author forwards;
          animation-timeline: hero-timeline;
        }
        @keyframes blog-transition {
          exit -25% {
            opacity: 1;
            transform: scale(1);
          }
          exit 50%, exit 100% {
            opacity: 0;
            transform: scale(0.9) translateY(10vh);
          }
        }
        @keyframes blog-author {
          exit -25% {
            transform: scale(1);
          }
          exit 50%, exit 100% {
            transform: scale(0.8) translateY(10vh);
          }
        }
        ` }}
      />
      <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script>
    </>
  )
}