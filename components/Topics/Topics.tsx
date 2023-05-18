import { getTags, totalPosts } from '~/utils/posts.ts'

export default function Aside() {
  const tags = getTags()
  const orderedKeys = Array.from(tags.keys())
    .sort((a:string, b:string) => a.localeCompare(b))
    .filter((tag:string) => !Array.from(['test','blog','note']).includes(tag))

  orderedKeys.unshift('blog')
  orderedKeys.unshift('note')

  return (
    <fieldset class="TopicsAside">
      <label for="all">
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
          <use href="#icon.home"/>
        </svg>
        <span>all</span>
        <span class="TopicCount">{totalPosts}</span>
        <input checked type="radio" id="all" name="topics" value="all"/>
      </label>
      {orderedKeys.map((tag:string) => 
        <label for={tag}>
          <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
            <use href={`#icon.${tag}`}/>
          </svg>
          <span>{tag}</span>
          <span class="TopicCount">{tags.get(tag)}</span>
          <input type="radio" id={tag} name="topics" value={tag}/>
        </label>
      )}
      <style dangerouslySetInnerHTML={{ __html: Array.from(tags.keys()).map(topic => {
        return `
          html:has(#${topic}:checked) .PostList > li:not(:has([data-topic="${topic}"])) {
            display: none;
          }`
      }).join('\n')}}/>
      <script dangerouslySetInnerHTML={{ __html: `
      if (!CSS.supports('selector(:has(> *))')) {
        document.querySelector('.TopicsAside').addEventListener('change', e => {
          const topic = e.target.value
          
          document.querySelectorAll('.PostList > li').forEach(li => {
            let hasTopic = li.querySelector('[data-topic="'+topic+'"]')
            li.style.display = hasTopic || topic === 'all' ? 'block' : 'none'
          })
        })
      }
        ` }}
      />
    </fieldset>
  )
}