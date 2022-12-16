import { getTags, totalPosts } from '~/utils/posts.ts'

export default function Aside() {
  const tags = getTags()
  const orderedKeys = Array.from(tags.keys())
    .sort((a:string, b:string) => a.localeCompare(b))
    .filter((tag:string) => !Array.from(['test','blog','note']).includes(tag))

  orderedKeys.unshift('blog')
  orderedKeys.unshift('note')

  return (
    <aside class="TopicsAside">
      <a id="all" href="#" aria-selected="true">
        <svg aria-hidden class="filled-icon" width="24" height="24" viewBox="0 0 24 24">
          <use href="#icon.home"/>
        </svg>
        <span>all</span>
        <span class="TopicCount">{totalPosts}</span>
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
      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelector('.TopicsAside').addEventListener('click', e => {
          e.preventDefault()
          e.stopPropagation()

          const link = e.target.closest('a')
          if (!link) return

          const topic = link.id

          document.querySelector('.TopicsAside [aria-selected="true"]').removeAttribute('aria-selected')
          link.setAttribute('aria-selected', true)

          if (document.startViewTransition) {
            document.startViewTransition(() => {
              document.querySelectorAll('.PostList > li').forEach(li => {
                let hasTopic = li.querySelector('[data-topic="'+topic+'"]')
                li.style.display = hasTopic || topic === 'all' ? 'block' : 'none'
              })
            })
          }
          else {
            document.querySelectorAll('.PostList > li').forEach(li => {
              let hasTopic = li.querySelector('[data-topic="'+topic+'"]')
              li.style.display = hasTopic || topic === 'all' ? 'block' : 'none'
            })
          }
        })
        ` }}
      />
    </aside>
  )
}