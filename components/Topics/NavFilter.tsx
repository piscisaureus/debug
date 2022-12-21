import { getTags, totalPosts } from '~/utils/posts.ts'

export default function NavFilter() {
  const tags = getTags()
  const orderedKeys = Array.from(tags.keys())
    .sort((a:string, b:string) => a.localeCompare(b))
    .filter((tag:string) => !Array.from(['test','blog','note']).includes(tag))

  orderedKeys.unshift('blog')
  orderedKeys.unshift('note')

  return (
    <>
      <select id="TopicsFilterMobile" class="TopicsAsideMobile" style="inline-size: 10ch">
        <option value="all" selected>all ({totalPosts})</option>
        {orderedKeys.map((tag:string) => 
          <option value={tag}>{tag} ({tags.get(tag)})</option>
        )}
      </select>
      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelector('#TopicsFilterMobile').addEventListener('input', e => {
          const topic = e.target.value
          const topicText = e.target.options[e.target.selectedIndex].innerText
          e.target.style.inlineSize = \`\${topicText.length + 2}ch\`
          
          document.querySelectorAll('.PostList > li').forEach(li => {
            let hasTopic = li.querySelector('[data-topic="'+topic+'"]')
            li.style.display = hasTopic || topic === 'all' ? 'block' : 'none'
          })
        })
      ` }}
      />
    </>
  )
}