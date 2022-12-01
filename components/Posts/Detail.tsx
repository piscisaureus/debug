import BlogDetail from '~/components/Blog/Detail.tsx'
import TweetDetail from '~/components/Tweet/Detail.tsx'

export default function PostDetail({post}) {
  switch (post.type) {
    case 'blog':
      return <BlogDetail post={post}/>
    case 'tweet':
      return <TweetDetail post={post}/>
    default:
      return <TweetDetail post={post}/>
  }
}