import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'

// import AnalyticsClient from '~/utils/analytics.ts'
import { getPosts, IPost } from '~/utils/posts.ts'

import Nav from '~/components/Nav/Nav.tsx'
import Modal from '~/islands/Modal.tsx'
import PageMeta from '~/components/PageMeta.tsx'
import HomePage from '~/components/Home/Home.tsx'

export const handler: Handlers<IPost[]> = {
  async GET(_req, ctx) {
    const posts = await getPosts()
    if (!posts) return ctx.renderNotFound()

    // if (Deno.env.get('IS_PROD')) {
    //   AnalyticsClient.hit({
    //     title: 'Home',
    //     url: _req.url,
    //     ip: ctx.remoteAddr.hostname,
    //     user_agent: _req.headers.get('User-Agent'),
    //   }).catch(error => {
    //     console.error(error);
    //   })
    // }

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
      <body page-type="home" nojs>
        <Nav/>
        <HomePage posts={posts}/>
        <Modal/>
      </body>
    </>  
  )
}