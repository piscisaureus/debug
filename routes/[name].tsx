import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { titleCase } from "$deno/x/case/mod.ts"
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts'

import { getPost, IBlog, INote } from '~/utils/posts.ts'

import Nav from '~/components/Nav/Nav.tsx'
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

  const tableOfContents = isBlog
    ? extractTOC(props.data.content)
    : null

  return (
    <>
      <Head>
        <PageMeta title={title} />
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"/>
      </Head>
      <body page-type="detail">
        <Nav layout="detail"/>
        <PostDetail post={props.data} toc={tableOfContents}/>
      </body>
    </>
  )
}

function extractTOC(markdown:string) {
  const dom = new DOMParser().parseFromString(markdown, 'text/html')
  const headers = dom?.querySelectorAll('h1,h2,h3,h4,h5,h6')

 const tableOfContents = Array.from(headers).map((header:Element) => {
    const baseText = header.textContent.trim()
    const text = baseText.substr(0, baseText.indexOf('\n'))
    const level = header.nodeName

    return {
      text,
      level,
    }
  })

  return tableOfContents
}
