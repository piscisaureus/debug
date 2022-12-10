import { getTags } from '~/utils/posts.ts'

export default function Aside() {
  const tags = getTags()

  return (
    <aside class="TopicsAside">
      {Array.from(tags.keys()).filter(tag => tag !== 'test').map(tag => 
        <a id={tag} href={`#${tag}`}>
          {tag}
          <span>{tags.get(tag)}</span>
        </a>
      )}
      <style dangerouslySetInnerHTML={{ __html: Array.from(tags.keys()).map(topic => {
        return `
          html:has(#${topic}:target) .PostItem:not(:has([data-topic="${topic}"])) {
            display: none;
          }`
      }).join('\n')}}/>
    </aside>
  )
}