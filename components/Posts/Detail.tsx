import { IBlog, INote } from '~/utils/posts.ts'

import Blog from '~/components/Blog/Detail.tsx'
import Note from '~/components/Note/Detail.tsx'

export default function PostDetail({post}: {post:IBlog | INote}) {
  switch (post.type) {
    case 'blog':
      return <Blog post={post}/>
    case 'note':
      return <Note post={post}/>
    default:
      return <Note post={post}/>
  }
}