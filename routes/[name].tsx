import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'

// import { CSS } from 'https://deno.land/x/gfm/mod.ts'
import { getPost, Post } from '~/utils/posts.ts'
import PageMeta from '~/components/PageMeta.tsx'
import PostDetail from '~/components/PostDetail/PostDetail.tsx'

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.name)
    if (!post)
      return new Response("Post not found", { status: 404 });
    return ctx.render(post)
  }
}

export default function PostPage(props: PageProps<Post>) {
  return (
    <>
      <Head>
        <PageMeta post={props.post}/>
      </Head>
      <body>
        <PostDetail post={props.data}/>
      </body>
    </>
  )
}
