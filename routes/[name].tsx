import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { CSS, render } from 'https://deno.land/x/gfm/mod.ts'
import 'https://esm.sh/prismjs/components/prism-css'
import 'https://esm.sh/prismjs/components/prism-diff'

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
  const html = render(post.content);

  return (
    <>
      <Head>
        <PageMeta post={post}/>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <body>
        <Nav/>
        {post.hero &&
          <img src={post.hero}/>
        }
        <h1>{post.title}</h1>
        <time>{new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</time>
        {<p>{post.snippet}</p>}
        <main class="markdown-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </body>
    </>
  )
}
