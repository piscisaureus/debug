import { IBlog, INote } from '~/utils/posts.ts'

import Blog from '~/components/Blog/Detail.tsx'
import Note from '~/components/Note/Detail.tsx'

export default function PostDetail({post, toc, mentions}: {post:IBlog | INote, toc:[], mentions:[]}) {
  switch (post.type) {
    case 'blog':
      return <Blog post={post} toc={toc} mentions={mentions}/>
    case 'note':
      return <Note post={post} mentions={mentions}/>
    default:
      return <Note post={post} mentions={mentions}/>
  }
}