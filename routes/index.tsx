import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { getPosts, IPost } from '~/utils/posts.ts'

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
      <body>
        <HomePage posts={posts}/>
        <script dangerouslySetInnerHTML={{ __html: `
          document.querySelectorAll('.PostItem').forEach((post) => {
            post.onclick = async e => {
              if (!e.target.classList.contains('PostItem')) return

              // post.style.viewTransitionName = 'post-item'
              
              if (document.startViewTransition) {
                document.startViewTransition(() => {
                  window.location.href = e.target.querySelector('footer a:first-of-type').getAttribute('href')
                })
              }
              else {
                window.location.href = e.target.querySelector('footer a:first-of-type').getAttribute('href')
              }
            }
          })
        `}}>
        </script>
      </body>
    </>  
  )
}