import { IBlog, ITweet } from '~/utils/posts.ts'

import Blog from '~/components/Blog/Detail.tsx'
import Tweet from '~/components/Tweet/Detail.tsx'

export default function PostDetail({post}: {post:IBlog | ITweet}) {
  switch (post.type) {
    case 'blog':
      return <Blog post={post}/>
    case 'tweet':
      return <Tweet post={post}/>
    default:
      return <Tweet post={post}/>
  }
}