import { IBlog, INote } from '~/utils/posts.ts'

import Blog from '~/components/Blog/Detail.tsx'
import Note from '~/components/Note/Detail.tsx'

export default function PostDetail({post, toc}: {post:IBlog | INote, toc:[]}) {
  switch (post.type) {
    case 'blog':
      return <Blog post={post} toc={toc}/>
    case 'note':
      return <Note post={post}/>
    default:
      return <Note post={post}/>
  }
}