import BlogDetail from '~/components/PostDetail/BlogDetail.tsx'
import TweetDetail from '~/components/PostDetail/TweetDetail.tsx'

export default function PostDetail({post}) {
  switch (post.type) {
    case 'blog':
      return <BlogDetail post={post}/>
    case 'tweet':
      return <TweetDetail post={post}/>
  }
}