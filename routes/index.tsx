import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'

import { getPosts, IPost } from '~/utils/posts.ts'

import Nav from '~/components/Nav/Nav.tsx'
import Footer from '~/components/Footer/Footer.tsx'
import PageMeta from '~/components/PageMeta.tsx'
import HomePage from '~/components/Home/Home.tsx'

export const handler: Handlers<IPost[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts()
    if (!posts)
      return new Response("Post not found", { status: 404 })
    return ctx.render(posts)
  }
}

export default function BlogIndexPage(props: PageProps<IPost[]>) {
  const posts = props.data

  return (
    <>
      <Head>
        <PageMeta title="Adam Argyle" prerenderables={posts.slice(0,5).map(post => post.slug)}/>
      </Head>
      <body page-type="home">
        <Nav/>
        <HomePage posts={posts}/>
        <Footer/>
      </body>
    </>  
  )
}