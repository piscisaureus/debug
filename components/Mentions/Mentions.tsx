import { IMention } from '~/utils/webmentions.ts'

import Likes from './Likes.tsx'
import Reposts from './Reposts.tsx'

export default function Mentions({mentions}:{mentions:IMention[]}) {
  const comments = mentions
    .filter(mention => ['mention-of','in-reply-to'].includes(mention['wm-property']))
    .filter(mention => mention?.content?.html)
  const reposts = mentions.filter(mention => ['repost-of'].includes(mention['wm-property']))
  const likes = mentions.filter(mention => ['like-of'].includes(mention['wm-property']))
  const tweet = mentions.find(mention => mention.url.includes('https://twitter.com/argyleink'))
  const mastodon = mentions.find(mention => mention.url.includes('https://front-end.social/@argyleink'))

  return (
    <><div class="join-convo">
      <p>Join the conversation on</p>
      {tweet && 
        <a href={tweet.url} title="Twitter">
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 30 30">
            <use href="#icon.twitter"/>
          </svg>
        </a>}
      {mastodon && 
        <a href={mastodon.url} title="Mastodon">
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 30 30">
            <use href="#icon.mastodon"/>
          </svg>
        </a>}
    </div>
      <div class="block-stack">
        {likes.length >= 1 && <Likes likes={likes}/>}
        {reposts.length >= 1 && <Reposts reposts={reposts}/>}
      </div>
      {comments.length >= 1 && comments.map((mention) => 
        <div class="Mention">
          <q>
            <div dangerouslySetInnerHTML={{ __html: mention.content.html || mention.content.text }} />
            <cite>
              <a href={mention.author.url}>
                <img 
                  src={mention.author.photo} 
                  alt={mention.author.name}
                  height={24}
                  width={24}
                  loading="lazy"
                  decoding="async"
                />
              </a>
              <a href={mention.url}>{mention.author.name}</a>
            </cite>
          </q>
        </div>
      )}
    </>
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