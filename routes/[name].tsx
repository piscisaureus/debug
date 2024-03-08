import { Handlers, PageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'
import { titleCase } from "$deno/x/case/mod.ts"
import { DOMParser } from '$deno/x/deno_dom/deno-dom-wasm.ts'

import { recordRequest } from '~/utils/analytics.ts'
import { getPost, IBlog, INote } from '~/utils/posts.ts'
import { getLocaleString } from '~/utils/locale.ts'
import { aMention } from '~/utils/webmentions.ts'

import Nav from '~/components/Nav/Nav.tsx'
import Modal from '~/islands/Modal.tsx'
import PageMeta from '~/components/PageMeta.tsx'
import PostDetail from '~/components/Posts/Detail.tsx'
import Footer from '~/components/Footer/Footer.tsx'

export const handler: Handlers<IBlog | INote> = {
  async GET(request, context) {
    const post = await getPost(context.params.name)
    if (!post) return context.renderNotFound()
    post.mentions = await aMention(post.slug)

    if (Deno.env.get('IS_PROD'))
      recordRequest('/'+post.slug, {request, context})

    return context.render(post as IBlog | INote)
  }
}

export default function PostPage(props: PageProps<IBlog | INote>) {
  const date = props.data.publishedAt.toLocaleDateString(getLocaleString(), {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const isBlog = props.data.type === 'blog'

  const title = isBlog
    ? props.data.title + ' · ' + date
    : titleCase(props.data.slug.replaceAll('-', ' '))
      .replaceAll('Css', 'CSS').replaceAll('Gui', 'GUI').replaceAll('Html', 'HTML')
       + ' · ' + date

  const tableOfContents = isBlog
    ? extractTOC(props.data.content)
    : null

  return (
    <>
      <Head>
        <PageMeta title={title} />
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"/>
      </Head>
      <body page-type="detail" nojs>
        <Nav layout="detail"/>
        <PostDetail 
          post={props.data} 
          toc={tableOfContents}
          mentions={props.data.mentions}
        />
        <Footer/>
        <Modal/>
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
