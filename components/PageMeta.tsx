import PageIcons from '~/components/Icons/PageIcons.tsx'

export default function PageMeta({title, prerenderables=[]}:{title:string, prerenderables:string[]}) {
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="mobile-web-app-capable" content="yes"/>
      <meta name="theme-color" content="deeppink" media="(prefers-color-scheme: light)"/>
      <meta name="theme-color" content="Canvas" media="(prefers-color-scheme: dark)"/>
      <meta name="description" content="🙂"/>

      <meta name="color-scheme" content="dark light"/>
      <script src="theme-switch.js"></script>

      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
      <link rel="alternate" type="application/rss+xml" href="https://nerdy.dev/rss" title="RSS Feed for Adam Argyle: Web design & development tips & tricks"/>

      <link rel="preconnect" href="https://res.cloudinary.com/"/>
      <link rel="stylesheet" href="/style.css"/>

      <script type="speculationrules" dangerouslySetInnerHTML={{ __html: `
         {
           "prerender": [
             {
               "source": "list",
               "urls": [${prerenderables.map(post => `"/${post.slug}"`).join(',')}]
             }
           ]
         }
       `}}/>
      {/* <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script> */}
      <PageIcons/>
    </>
  )
}