import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { getPosts, Post } from '../utils/posts.ts'

// import Counter from '../islands/Counter.tsx'
import IndexHead from '../components/IndexHead.tsx'
import PostItem from '../components/PostItem.tsx'

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
        <IndexHead/>
      </Head>
      <main>
        <h1>Open Props</h1>
        {/*<Counter start={0} />*/}
        <ul>
          {posts.map((post) => <PostItem post={post} />)}
        </ul>
      </main>
    </>
  )
}