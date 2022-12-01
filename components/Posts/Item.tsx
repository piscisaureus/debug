import Blog from '~/components/Blog/Card.tsx'
import Tweet from '~/components/Tweet/Card.tsx'

export default function PostItem({post}) {
  switch (post.type) {
    case 'blog':
      return <Blog post={post}/>
    case 'tweet':
      return <Tweet post={post}/>
    default:
      return <Tweet post={post}/>
  }
}