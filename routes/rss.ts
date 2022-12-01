import { HandlerContext } from '$fresh/server.ts'
import { getPosts, Post } from '~/utils/posts.ts'
import RSS from 'npm:rss'

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    // todo: cache
    const posts = await getPosts()
    const xml = makeRSS(posts).xml()

    if (!posts)
      return new Response("Feed not found", { status: 404 })

    return new Response(xml, {
      headers: { "Content-Type": "application/json" },
    })
  }
}

function makeRSS(posts) {
  let feed = new RSS({
    title: 'Adam Argyle',
    description: 'description',
    feed_url: 'https://a.nerdy.dev/rss',
    site_url: 'https://a.nerdy.dev',
    image_url: 'https://a.nerdy.dev/favicon.svg',
    // docs: 'http://example.com/rss/docs.html',
    // managingEditor: 'Dylan Greene',
    webMaster: 'Adam Argyle',
    copyright: new Date().getFullYear() + ' Adam Argyle',
    language: 'en',
    categories: ['CSS','HTML','JavaScript','Front-End','Design'],
    pubDate: new Date(),
    ttl: '60',
  });
   
  /* loop over data and add to feed */
  for (let post of posts) {
    feed.item({
      title:  post.slug,
      // description: 'use this for the content. It can include html.',
      url: 'https://a.nerdy.dev/'+post.slug, // link to the item
      // guid: '1123', // optional - defaults to url
      categories: post.tags, // optional - array of item categories
      author: post.persona.name, // optional - defaults to feed author property
      date: post.publishedAt, // any format that js Date can parse.
      // lat: 33.417974, //optional latitude field for GeoRSS
      // long: -111.933231, //optional longitude field for GeoRSS
      // enclosure: {url:'...', file:'path-to-file'}, // optional enclosure
      // custom_elements: [
      //   {'itunes:author': 'John Doe'},
      //   {'itunes:subtitle': 'A short primer on table spices'},
      //   {'itunes:image': {
      //     _attr: {
      //       href: 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg'
      //     }
      //   }},
      //   {'itunes:duration': '7:04'}
      // ]
    });
  }
   
  return feed
}