import { Blog, Tweet } from '~/utils/posts.ts'

import BlogCard from '~/components/Blog/Card.tsx'
import TweetCard from '~/components/Tweet/Card.tsx'

export default function PostItem({post}: {post:Blog | Tweet}) {
  switch (post.type) {
    case 'blog':
      return <BlogCard post={post}/>
    case 'tweet':
      return <TweetCard post={post}/>
    default:
      return <TweetCard post={post}/>
  }
}