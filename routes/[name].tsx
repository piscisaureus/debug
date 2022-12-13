import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { titleCase } from "$deno/x/case/mod.ts"
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

import { getPost, IBlog, INote } from '~/utils/posts.ts'

import Nav from '~/components/Nav/Nav.tsx'
import Footer from '~/components/Footer/Footer.tsx'
import PageMeta from '~/components/PageMeta.tsx'
import PostDetail from '~/components/Posts/Detail.tsx'

export const handler: Handlers<IBlog | INote> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.name)
    if (!post) return ctx.renderNotFound()
    return ctx.render(post as IBlog | INote)
  }
}

export default function PostPage(props: PageProps<IBlog | INote>) {
  // todo: use locale
  const date = props.data.publishedAt.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const isBlog = props.data.type === 'blog'

  const title = isBlog
    ? props.data.title + ' · ' + date
    : titleCase(props.data.slug.replaceAll('-', ' ')) + ' · ' + date

  if (isBlog) {
    const dom = new DOMParser().parseFromString(props.data.content, 'text/html')
    dom?.querySelectorAll('h2').forEach(h2 => {
      const baseText = h2.textContent.trim()
      const finalText = baseText.substr(0, baseText.indexOf('\n'))
      console.log(finalText)
    })
  }

  return (
    <>
      <Head>
        <PageMeta title={title} />
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"/>
      </Head>
      <body page-type="detail">
        <Nav layout="detail"/>
        <PostDetail post={props.data}/>
        <Footer/>
      </body>
    </>
  )
}
