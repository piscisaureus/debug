import { getTags } from '~/utils/posts.ts'

export default function Aside() {
  const tags = getTags()
  const orderedKeys = Array.from(tags.keys())
    .sort((a:string, b:string) => a.localeCompare(b))
    .filter((tag:string) => !Array.from(['test','blog','note']).includes(tag))

  orderedKeys.unshift('note')
  orderedKeys.unshift('blog')

  return (
    <aside class="TopicsAside">
      <a id="all" href="#all">
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
          <use href="#icon.home"/>
        </svg>
        <span>all</span>
        <span class="TopicCount">{tags.size}</span>
      </a>
      {orderedKeys.map((tag:string) => 
        <a id={tag} href={`#${tag}`}>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href={`#icon.${tag.replaceAll(' ', '-')}`}/>
          </svg>
          <span>{tag}</span>
          <span class="TopicCount">{tags.get(tag)}</span>
        </a>
      )}
      <style dangerouslySetInnerHTML={{ __html: Array.from(tags.keys()).map(topic => {
        return `
          html:has(#${topic}:target) .PostList > li:not(:has([data-topic="${topic}"])) {
            display: none;
          }`
      }).join('\n')}}/>
    </aside>
  )
}