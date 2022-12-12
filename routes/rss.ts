import { Handlers } from '$fresh/server.ts'
import { getPosts, IPost } from '~/utils/posts.ts'
import RSS from 'https://esm.sh/rss'

export const handler: Handlers<IPost[]> = {
  async GET() {
    // todo: cache
    const posts = await getPosts()
    const xml = makeRSS(posts).xml()

    if (!posts)
      return new Response("Feed not found", { status: 404 })

    return new Response(xml, {
      headers: { "Content-Type": "application/rss+xml" },
    })
  }
}

function makeRSS(posts:IPost[]) {
  const feed = new RSS({
    title: 'Adam Argyle',
    description: 'Web design & development tips & tricks',
    feed_url: 'https://nerd.deno.dev/rss',
    site_url: 'https://nerd.deno.dev',
    image_url: 'https://res.cloudinary.com/dnpmdb8r8/image/upload/v1669523666/argyleink/gui-skull.png',
    webMaster: 'Adam Argyle: atom@argyleink.com',
    copyright: new Date().getFullYear() + ' Adam Argyle',
    language: 'en',
    categories: ['CSS','HTML','JavaScript','Front-End','Design'],
    lastBuildDate: posts[0].publishedAt,
    ttl: 60,
    // custom_namespaces: {
    //   'webfeeds': 'http://webfeeds.org/rss/1.0'
    // },
    // custom_elements: [
    //   {'webfeeds:logo': 'https://res.cloudinary.com/dnpmdb8r8/image/upload/v1669523666/argyleink/gui-skull.png'},
    //   {'webfeeds:icon': 'https://res.cloudinary.com/dnpmdb8r8/image/upload/v1669523666/argyleink/gui-skull.png'},
    //   {'webfeeds:cover image': 'https://res.cloudinary.com/dnpmdb8r8/image/upload/v1669523666/argyleink/gui-skull.png'},
    //   {'webfeeds:accentColor': '#000000'},
    //   {'webfeeds:related': [
    //     {'itunes:layout': 'card'},
    //     {'itunes:target': 'browser'}
    //   ]},
    // ]
  })
   
  for (const post of posts.slice(0, 10)) {
    feed.item({
      title:  post.slug.replaceAll('-', ' '),
      description: post.content,
      url: 'https://nerd.deno.dev/'+post.slug, // link to the item
      categories: post?.tags?.length != 0
        ? post.tags
        : ['post'],
      author: post.persona.name,
      pubDate: post.publishedAt,
      date: post.publishedAt,
    })
  }
   
  return feed
}