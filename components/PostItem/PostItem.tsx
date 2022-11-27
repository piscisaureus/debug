import { Post } from '~/utils/posts.ts'
import Blog from '~/components/PostItem/Blog.tsx'
import Tweet from '~/components/PostItem/Tweet.tsx'

export default function PostItem(props: { post: Post }) {
  const { post } = props
 
  if (post.type === 'blog') {
    return (
      <Blog post={post}/>
    )  
  }
  else if (post.type === 'tweet') {
    return (
      <Tweet post={post}/>
    )
  }
}