import BlogPost from '~/components/PostItem/BlogPost.tsx'
import Tweet from '~/components/PostItem/Tweet.tsx'

export default function PostItem({post}) {
  switch (post.type) {
    case 'blog':
      return <BlogPost post={post}/>
    case 'tweet':
      return <Tweet post={post}/>
  }
}