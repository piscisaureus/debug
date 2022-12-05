import { getTags } from '~/utils/posts.ts'
import { ITags } from '~/components/Tags/Tags.tsx'

export default function Aside(tags:ITags[]) {
  return (
    <aside class="TopicsAside">
      {getTags().map((tag) => 
        <a href={`#${tag}`}>(1) {tag}</a>)}
    </aside>
  )
}