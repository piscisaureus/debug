import { IMention } from '~/utils/webmentions.ts'

import Pic from '~/islands/Pic.tsx'

export default function Mentions({mentions}:{mentions:IMention[]}) {
  const comments = mentions.filter(mention => ['mention-of','repost-of','in-reply-to'].includes(mention['wm-property']))
  const likes = mentions.filter(mention => ['like-of'].includes(mention['wm-property']))
  console.log(likes)
  return (
    <section class="Mentions">
      <h2>
        Web Mentions <a name="comments" href="#comments">#</a>
      </h2>
      {likes.length &&
        <section>
          <span>{likes.length} likes</span>
          <ul class="LikeList">
            {likes.map((like) => (
              <li title={like.author.name}>
                <Pic 
                  src={like.author.photo} 
                  alt={like.author.name}
                  height={24}
                  width={24}
                />
              </li>
            ))}
          </ul>
        </section>
      }
      {comments.length && comments.map((mention) => 
        <div class="Mention">
          <q>
            <div dangerouslySetInnerHTML={{ __html: mention.content.html || mention.content.text }} />
            <cite>
              <a href={mention.author.url}>
                <Pic 
                  src={mention.author.photo} 
                  alt={mention.author.name}
                  height={24}
                  width={24}
                />
              </a>
              <a href={mention.url}>{mention.author.name}</a>
            </cite>
          </q>
        </div>
      )}
    </section>
  )
}

// {
//   type: "entry",
//   author: {
//     type: "card",
//     name: "Thomas Steiner",
//     photo: "https://webmention.io/avatar/pbs.twimg.com/05796e7c6ce8b47a935fae4489812faf9813783f9c99b9b9dbb54d2de...",
//     url: "https://twitter.com/tomayac"
//   },
//   url: "https://twitter.com/tomayac/status/1605679204380598501",
//   published: "2022-12-21T21:38:49+00:00",
//   "wm-received": "2022-12-21T22:14:10Z",
//   "wm-id": 1585029,
//   "wm-source": "https://brid.gy/post/twitter/argyleink/1605679204380598501",
//   "wm-target": "https://nerdy.dev/css-anchor-api-is-lookin-rad",
//   content: {
//     html: `👀 Peepin' <a href="https://twitter.com/argyleink">@argyleink</a>'s aptly named new site <a href="ht...`,
//     text: "👀 Peepin' @argyleink's aptly named new site nerdy.dev. Love the compact overview of new features li..."
//   },
//   "mention-of": "https://nerdy.dev/css-anchor-api-is-lookin-rad",
//   "wm-property": "mention-of",
//   "wm-private": false
// }