import { Handlers } from '$fresh/server.ts'
import { titleCase } from "$deno/x/case/mod.ts"
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
    webMaster: 'atom@argyleink.com (Adam Argyle)',
    copyright: new Date().getFullYear() + ' Adam Argyle',
    language: 'en',
    categories: ['CSS','HTML','JavaScript','Front-End','Design'],
    pubDate: posts[0].publishedAt,
    ttl: 60,
    custom_elements: [
      {icon: 'https://res.cloudinary.com/dnpmdb8r8/image/upload/v1669523666/argyleink/gui-skull.png'},
      {logo: 'https://res.cloudinary.com/dnpmdb8r8/image/upload/v1669523666/argyleink/gui-skull.png'},
    ]
  })
   
  for (const post of posts.slice(0, 10)) {
    feed.item({
      title:  post?.title || titleCase(post.slug.replaceAll('-', ' ')),
      description: post.content,
      url: 'https://nerd.deno.dev/'+post.slug,
      categories: post?.tags?.length != 0
        ? post.tags
        : ['note'],
      author: post.persona.name,
      pubDate: post.publishedAt,
      date: post.publishedAt,
    })
  }
   
  return feed
}