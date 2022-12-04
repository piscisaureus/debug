import { HandlerContext } from '$fresh/server.ts'
import { getPosts, Post } from '~/utils/posts.ts'
import RSS from 'https://esm.sh/rss'

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
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

function makeRSS(posts:Post[]) {
  let feed = new RSS({
    title: 'Adam Argyle',
    description: 'Web design & development tips & tricks',
    feed_url: 'https://a.nerdy.dev/rss',
    site_url: 'https://a.nerdy.dev',
    image_url: 'https://res.cloudinary.com/dnpmdb8r8/image/upload/v1669523666/argyleink/gui-skull.png',
    webMaster: 'Adam Argyle',
    copyright: new Date().getFullYear() + ' Adam Argyle',
    language: 'en',
    categories: ['CSS','HTML','JavaScript','Front-End','Design'],
    pubDate: new Date(),
    ttl: '60',
  })
   
  for (let post of posts.slice(0, 10)) {
    feed.item({
      title:  post.slug,
      description: post.content,
      url: 'https://a.nerdy.dev/'+post.slug, // link to the item
      categories: post.tags,
      author: post.persona.name,
      date: post.publishedAt,
    })
  }
   
  return feed
}