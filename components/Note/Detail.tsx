import { INote } from '~/utils/posts.ts'
import Note from '~/components/Note/Card.tsx'
import { getLocaleString } from '~/utils/locale.ts'

export default function NoteDetail({post}:{post:INote}) {
  return (
    <main class="PostDetail">
      <header>
        <time>{new Date(post.publishedAt).toLocaleDateString(getLocaleString(), {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</time>
      </header>
      <Note post={post}/>
    </main>
  )
}