import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { getPosts, getTags, Post } from '~/utils/posts.ts'

import PageMeta from '~/components/PageMeta.tsx'
import Nav from '~/components/Nav/Nav.tsx'
import PostItem from '~/components/Posts/Item.tsx'

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts()
    if (!posts)
      return new Response("Post not found", { status: 404 })
    return ctx.render(posts)
  }
}

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data
  const tags = getTags()

  return (
    <>
      <Head>
        <PageMeta post={{title:"Adam Argyle"}}/>
      </Head>
      <Nav/>
      {/*todo: list.tsx component*/}
      <main>
        <aside>
          {tags.map((tag) => <a href={`#${tag}`}>{tag}</a>)}
        </aside>
        <ul class="PostItems">
          {posts.map((post) => <PostItem post={post} />)}
        </ul>
      </main>
      {/*todo reduced motion*/}
      <style dangerouslySetInnerHTML={{ __html: `
        .PostItem {
          view-timeline: enter-n-exit;
          animation: 1s linear list-transition forwards;
          animation-timeline: enter-n-exit;
        }
        @keyframes list-transition {
          enter 0% {
            opacity: .25;
            transform: scale(0.75);
          }
          enter 100% {
            opacity: 1;
            transform: scale(1);
          }
          exit 75% {
            opacity: 1;
          }
          exit 100% {
            opacity: 0;
          }
        }
        ` }}
      />
    </>
  )
}