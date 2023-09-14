import { Handlers, AppProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'

import { recordRequest } from '~/utils/analytics.ts'
import { getPosts, IPost } from '~/utils/posts.ts'

import Nav from '~/components/Nav/Nav.tsx'
import Modal from '~/islands/Modal.tsx'
import PageMeta from '~/components/PageMeta.tsx'
import HomePage from '~/components/Home/Home.tsx'

export const handler: Handlers<IPost[]> = {
  async GET(request, context) {
    const posts = await getPosts()
    if (!posts) return context.renderNotFound()

    if (Deno.env.get('IS_PROD'))
      recordRequest('/index', {request, context})

    return context.render(posts)
  }
}

export default function BlogIndexPage(props: AppProps<IPost[]>) {
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