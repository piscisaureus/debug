import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { getPost, Post } from '../utils/posts.ts'

import IndexHead from '../components/IndexHead.tsx'

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
        <IndexHead post={post}/>
      </Head>
      <body>
        <h1>{props.params.name}</h1>
        {<p>{post.snippet}</p>}
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </body>
    </>
  )
}
