import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'

import { getPost, IBlog, INote, IPost } from '~/utils/posts.ts'
import PageMeta from '~/components/PageMeta.tsx'
import PostDetail from '~/components/Posts/Detail.tsx'
// todo: custom 404 page
export const handler: Handlers<IBlog | INote> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.name)
    if (!post)
      return new Response("Post not found", { status: 404 })
    return ctx.render(post as IBlog | INote)
  }
}

export default function PostPage(props: PageProps<IBlog | INote>) {
  const title = props.data.type === 'blog'
    ? props.data.title
    : props.data.publishedAt.toLocaleDateString("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

  return (
    <>
      <Head>
        <PageMeta title={title} />
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"/>
      </Head>
      <body>
        <PostDetail post={props.data}/>
      </body>
    </>
  )
}
