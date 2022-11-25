import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'

import { getPost, Post } from '~/utils/posts.ts'
import PageMeta from '~/components/PageMeta.tsx'
import Nav from '~/components/Nav/Nav.tsx'

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.name)
    if (!post)
      return new Response("Post not found", { status: 404 });
    return ctx.render(post)
  }
}

export default function PostPage(props: PageProps<Post>) {
  const post = props.data

  return (
    <>
      <Head>
        <PageMeta post={post}/>
      </Head>
      <body>
        <Nav/>
        <h1>{props.params.name}</h1>
        <time>{new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</time>
        {<p>{post.snippet}</p>}
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </body>
    </>
  )
}
