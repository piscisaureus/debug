import { getTags } from '~/utils/posts.ts'

export default function Aside() {
  const tags = getTags()

  return (
    <aside class="TopicsAside">
      {Array.from(tags.keys()).filter(tag => tag !== 'test').map(tag => 
        <a href={`#${tag}`}>
          {tag}
          <span>{tags.get(tag)}</span>
        </a>
      )}
    </aside>
  )
}