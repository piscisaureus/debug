import { getTags } from '~/utils/posts.ts'

export default function Aside() {
  return (
    <aside class="TopicsAside">
      {getTags().map((tag) => 
        <a href={`#${tag}`}>(1) {tag}</a>)}
    </aside>
  )
}