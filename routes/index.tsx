import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { getPosts, Post } from '~/utils/posts.ts'

import PageMeta from '~/components/PageMeta.tsx'
import Nav from '~/components/Nav/Nav.tsx'
import PostItem from '~/components/PostItem/PostItem.tsx'

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
      <style dangerouslySetInnerHTML={{ __html: `.PostItem {
          view-timeline: el-entering-and-exiting;
          animation: 1s linear fade-in-on-enter--fade-out-on-exit forwards;
          animation-timeline: el-entering-and-exiting;
        }
        @keyframes fade-in-on-enter--fade-out-on-exit {
          enter 0% {
            opacity: 0;
            transform: translateY(50%) scale(0.9);
          }
          enter 100% {
            opacity: 1;
            transform: translateY(0);
          }
          exit 0% {
            opacity: 1;
            transform: translateY(0);
          }
          exit 100% {
            opacity: 0;
            transform: translateY(-50%) scale(0.9);
          }
        }
        ` }}
        />
    </>
  )
}