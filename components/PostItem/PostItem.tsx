import Blog from '~/components/PostItem/Blog.tsx'
import Tweet from '~/components/PostItem/Tweet.tsx'

export default function PostItem({post}) {
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