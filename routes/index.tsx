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
        <PageMeta/>
      </Head>
      <Nav/>
      <main>
        <ul class="PostItems">
          {posts.map((post) => <PostItem post={post} />)}
        </ul>
      </main>
    </>
  )
}