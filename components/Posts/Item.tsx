import { IBlog, INote } from '~/utils/posts.ts'

import BlogCard from '~/components/Blog/Card.tsx'
import NoteCard from '~/components/Note/Card.tsx'

export default function PostItem({post}: {post:IBlog | INote}) {
  switch (post.type) {
    case 'blog':
      return <BlogCard post={post}/>
    case 'note':
      return <NoteCard post={post}/>
    default:
      return <NoteCard post={post}/>
  }
}