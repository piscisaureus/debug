import { INote } from '~/utils/posts.ts'
import { getLocaleString } from '~/utils/locale.ts'

import Note from '~/components/Note/Card.tsx'
import Mentions from '~/components/Mentions/Mentions.tsx'

export default function NoteDetail({post, mentions}:{post:INote, mentions:[]}) {
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
      {mentions?.length > 0 && 
        <section class="Mentions">
          <Mentions mentions={mentions}/>
        </section>
      }
    </main>
  )
}