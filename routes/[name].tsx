import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'

import { getPost, Post } from '~/utils/posts.ts'
import PageMeta from '~/components/PageMeta.tsx'
import PostDetail from '~/components/Posts/Detail.tsx'
// todo: custom 404 page
export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.name)
    if (!post)
      return new Response("Post not found", { status: 404 })
    return ctx.render(post)
  }
}

export default function PostPage(props: PageProps<Post>) {
  return (
    <>
      <Head>
        <PageMeta post={props.post}/>
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
      </Head>
      <body>
        <PostDetail post={props.data}/>
      </body>
    </>
  )
}
