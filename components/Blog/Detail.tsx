import readingTime from 'https://esm.sh/reading-time'

import { IBlog } from '~/utils/posts.ts'
import { getLocaleString } from '~/utils/locale.ts'

import Persona from '~/components/Persona/Persona.tsx'
import Tags, { ITags } from '~/components/Tags/Tags.tsx'
import TableOfContents from '~/components/TableOfContents/TableOfContents.tsx'
import Mentions from '~/components/Mentions/Mentions.tsx'

import Pic from '~/components/Pic/Pic.tsx'

export default function BlogDetail({ post, toc, mentions }: { post: IBlog, toc: [], mentions:[] }) {
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
            />
          </div>
        </header>
      }
      <section class="BlogMeta block-stack">
        <Persona persona={post.persona}/>

        <h1>{post.title}</h1>
        <time>{new Date(post.publishedAt).toLocaleDateString(getLocaleString(), {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</time>
        {post.updatedAt && 
          <small>Updated <time>{new Date(post.updatedAt).toLocaleDateString(getLocaleString(), {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</time></small>
        }
        <span class="read-time">
          <svg aria-hidden class="filled-icon" width="20" height="20" viewBox="0 0 24 24">
            <use href="#icon.clock"/>
          </svg>
          {readingTime(post.content).text}
        </span>
        {tags.length > 0 && <Tags tags={tags as ITags}/>}
      </section>
      <cq-document-vi><main class="BlogDetail block-stack">
        {toc.length !== 0 && <TableOfContents toc={toc} hasMentions={mentions.length >= 1}/>}

        <article 
          class="block-stack"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {mentions?.length > 0 && 
          <section class="Mentions">
            <h2>
              Mentions <a name="comments" href="#comments">#</a>
            </h2>
            <Mentions mentions={mentions}/>
          </section>
        }
      </main></cq-document-vi>
      {/*todo reduced motion*/}
      {/* <style dangerouslySetInnerHTML={{ __html: `
        .BlogHero {
          view-timeline: hero-timeline;
        }
        .BlogHero img {
          animation: 1s linear hero-scroll-effect both;
          animation-timeline: hero-timeline;
        }
        
        .BlogMeta > .Persona {
          animation: 1s linear author-scroll-effect both;
          animation-timeline: hero-timeline;
        }
        @keyframes hero-scroll-effect {
          exit -5%, 0% {
            opacity: 1;
            transform: scale(1);
          }
          exit 50%, exit 100% {
            opacity: 0;
            transform: scale(0.9) translateY(10vh);
          }
        }
        @keyframes author-scroll-effect {
          exit -5%, 0% {
            transform: scale(1);
          }
          exit 50%, exit 100% {
            transform: scale(0.8) translateY(10vh);
          }
        }
        ` }}
      /> */}
    </>
  )
}