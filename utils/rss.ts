import { debounce } from '$std/async/mod.ts'
import RSS from 'https://esm.sh/rss'
import { titleCase } from "$deno/x/case/mod.ts"

import { getPosts, IPost } from '~/utils/posts.ts'
import { urlbase } from '~/components/Pic/Pic.tsx'

export async function watchAndBuildRSS() {
  const watcher = Deno.watchFs([
    './posts/',
  ])

  const protectedBuildCall = debounce(buildRSS, 200)
  
  for await (const _event of watcher)
    protectedBuildCall()
}

export async function buildRSS() {
  const posts = await getPosts()
  const xml = makeRSS(posts).xml({indent: true})

  Deno.writeTextFile("./static/rss.xml", xml)
  console.log('rss updated')
}

function makeRSS(posts:IPost[]) {
  const feed = new RSS({
    title: 'Adam Argyle',
    description: 'RSS Feed for Adam Argyle: Web design & development tips & tricks: CSS, JS, HTML, Design, & UX.',
    feed_url: 'https://nerdy.dev/rss.xml',
    site_url: 'https://nerdy.dev',
    image_url: 'https://res.cloudinary.com/dnpmdb8r8/image/upload/argyleink/rss-icon.png',
    webMaster: 'adam.is@nerdy.dev (Adam Argyle)',
    copyright: new Date().getFullYear() + ' Adam Argyle',
    language: 'en',
    categories: ['CSS','HTML','JavaScript','Front-End','Design'],
    ttl: 60,
    custom_namespaces: {
      'media': 'http://search.yahoo.com/mrss/',
    },
    custom_elements: [
      {icon: 'https://res.cloudinary.com/dnpmdb8r8/image/upload/argyleink/rss-icon.png'},
      {logo: 'https://res.cloudinary.com/dnpmdb8r8/image/upload/argyleink/skull-card.png'},
    ]
  })
   
  for (const post of posts.slice(0, 10)) {
    // @ts-ignore: Unreachable code error
    const title = post?.title || titleCase(post.slug.replaceAll('-', ' '))
    
    const futureXMLItemObject = {
      title:  title,
      description: post.content,
      url: 'https://nerdy.dev/'+post.slug+'?utm_source=rss',
      categories: post?.tags?.length != 0
        ? post.tags
        : ['note'],
      author: post.persona.name + '@' + post.persona.handle,
      date: post.publishedAt
    }

    let hero = null

    if (post?.hero) {
      hero = post.hero
    }
    else if (post?.media?.length) {
      hero = post.media[0]
    }

    if (hero) {
      const media = urlbase + '/' + hero.src

      futureXMLItemObject.enclosure = { 
        url: media,
        alt: hero.alt,
      }

      futureXMLItemObject.custom_elements = [
        {'media:thumbnail': { _attr: { url: media}}},
      ]

      if (media.includes('mp4')) {
        futureXMLItemObject.description = `
          <video style="display: none" src="${media}" alt="${hero.alt}" height="${hero.height}"  width="${hero.width}" />
        ` + futureXMLItemObject.description
      }
      else {
        futureXMLItemObject.description = `
          <img style="display: none" src="${media}" alt="${hero.alt}" height="${hero.height}"  width="${hero.width}" />
        ` + futureXMLItemObject.description
      }
    }

    feed.item(futureXMLItemObject)
  }
   
  return feed
}