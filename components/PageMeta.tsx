import PageIcons from '~/components/Icons/PageIcons.tsx'

export default function PageMeta(props:any) {
  const {title, prerenderables=[]}:{title:string, prerenderables?:string[]} = props
  const description = 'Website for Adam Argyle: Teacher, Speaker, CSSWG member, and creator of Open Props and VisBug.'
  const image = 'https://res.cloudinary.com/dnpmdb8r8/image/upload/argyleink/skull-card.png'
  const gif = 'https://storage.googleapis.com/atoms-sandbox.google.com.a.appspot.com/og_gif.gif'
  const video = 'https://res.cloudinary.com/dnpmdb8r8/video/upload/argyleink/og_mp4.mp4'
  
  return (
    <>
      <title>{title}</title>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta http-equiv="Accept-CH" content="Viewport-Width, Width, Downlink, DPR"></meta>
      <meta http-equiv="delegate-ch" content="sec-ch-viewport-width https://res.cloudinary.com; sec-ch-dpr https://res.cloudinary.com; sec-ch-width https://res.cloudinary.com; sec-ch-downlink https://res.cloudinary.com;"/>
      <meta name="mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#e9ecef" media="(prefers-color-scheme: light)"/>
      <meta name="theme-color" content="#030507" media="(prefers-color-scheme: dark)"/>
      <meta name="description" content={description}/>

      <link rel="manifest" href="/manifest.json"/>
      <meta name="color-scheme" content="dark light"/>
      <meta name="view-transition" content="same-origin" />

      <OgMeta {...props} description={description} video={video} gif={gif} />

      <link rel="webmention" href="https://webmention.io/nerdy.dev/webmention" />
      <link rel="pingback" href="https://webmention.io/nerdy.dev/xmlrpc" />

      <script src="theme-switch.js"></script>

      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
      <link rel="alternate" type="application/rss+xml" href="https://nerdy.dev/rss.xml" title="RSS Feed for Adam Argyle: Web design & development tips & tricks: CSS, JS, HTML, Design, & UX."/>

      <link rel="preconnect" href="https://res.cloudinary.com/"/>
      <link rel="stylesheet" href="/style.css"/>

      <script async src="/toast.js"/>

      <script dangerouslySetInnerHTML={{ __html: `
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js');
          });
        }   
      `}}/>

      <script type="speculationrules" dangerouslySetInnerHTML={{ __html: `
        {
          "prefetch": [
            {
              "source": "list",
              "urls": [${prerenderables.map(url => `"/${url}"`).join(',')}]
            }
          ]
        }
      `}}/>
      <PageIcons/>
    </>
  )
}

function OgMeta({title, description, video, gif}:{title:string, description:string, video:string, gif:string}) {
  return (
    <>
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property='og:image' content={gif} />
      <meta property='og:video' content={video} />
      <meta property="og:url" content="https://nerdy.dev" />
      <meta property="og:site_name" content="Adam's Indie Social Feed" />

      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={gif}/>
      <meta name="twitter:video" content={video}/>
      <meta name="twitter:site" content="@argyleink"/>
      <meta name="twitter:creator" content="@argyleink"/>
    </>
  )
}