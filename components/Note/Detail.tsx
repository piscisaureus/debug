import { INote } from '~/utils/posts.ts'
import Nav from '~/components/Nav/Nav.tsx'
import Note from '~/components/Note/Card.tsx'

export default function NoteDetail({post}:{post:INote}) {
  return (
    <main class="PostDetail">
      <header>
        <time>{new Date(post.publishedAt).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</time>
      </header>
      <Note post={post}/>
    </main>
  )
}