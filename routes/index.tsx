import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { getPosts, Post } from '~/utils/posts.ts'

import PageMeta from '~/components/PageMeta.tsx'
import Nav from '~/components/Nav/Nav.tsx'
import PostItem from '~/components/Posts/Item.tsx'

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts()
    return ctx.render(posts)
  }
}

export default function BlogIndexPage(props: PageProps<Post[]>) {
  const posts = props.data

  return (
    <>
      <Head>
        <PageMeta post={{title:"Adam Argyle"}}/>
      </Head>
      <Nav/>
      <main>
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
            opacity: 0;
            transform: scale(0.9);
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