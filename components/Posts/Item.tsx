import { IBlog, INote } from '~/utils/posts.ts'

import BlogCard from '~/components/Blog/Card.tsx'
import NoteCard from '~/components/Note/Card.tsx'

export default function PostItem({post, index}: {post:IBlog | INote, index:Number}) {
  switch (post.type) {
    case 'blog':
      return <BlogCard post={post} index={index}/>
    case 'note':
      return <NoteCard post={post} index={index}/>
    default:
      return <NoteCard post={post} index={index}/>
  }
}