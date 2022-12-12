import PageIcons from '~/components/Icons/PageIcons.tsx'

export default function PageMeta(props) {
  const {title, prerenderables=[]}:{title:string, prerenderables?:string[]} = props
  const description = 'Website for Adam Argyle: Teacher, Speaker, CSSWG member, creator of Open Props and VisBug.'
  const image = 'https://res.cloudinary.com/dnpmdb8r8/image/upload/argyleink/skull-card.png'
  
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="mobile-web-app-capable" content="yes"/>
      <meta name="theme-color" content="deeppink" media="(prefers-color-scheme: light)"/>
      <meta name="theme-color" content="Canvas" media="(prefers-color-scheme: dark)"/>
      <meta name="description" content={description}/>

      <meta name="color-scheme" content="dark light"/>
      <OgMeta {...props} image={image} />

      <script src="theme-switch.js"></script>

      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
      <link rel="alternate" type="application/rss+xml" href="https://nerd.deno.dev/rss" title="RSS Feed for Adam Argyle: Web design & development tips & tricks"/>

      <link rel="preconnect" href="https://res.cloudinary.com/"/>
      <link rel="preconnect" href="https://www.google.com/s2/"/>
      <link rel="stylesheet" href="/style.css"/>

      <script async src="/toast.js"/>

      <script type="speculationrules" dangerouslySetInnerHTML={{ __html: `
         {
           "prerender": [
             {
               "source": "list",
               "urls": [${prerenderables.map(url => `"/${url}"`).join(',')}]
             }
           ]
         }
       `}}/>
      {/* <script src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"></script> */}
      <PageIcons/>
    </>
  )
}

function OgMeta({title, description, image}:{title:string, description:string, image:string}) {
  return (
    <>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content="https://nerd.deno.dev" />
      <meta property="og:site_name" content="Adam's Indie Social Feed" />

      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={image}/>
      <meta name="twitter:site" content="@argyleink"/>
      <meta name="twitter:creator" content="@argyleink"/>
    </>
  )
}