import { IMention } from '~/utils/webmentions.ts'

export default function Reposts({reposts}:{reposts:IMention[]}) {
  return (
    <section>
      <div class="mention-header">
        <span class="Tag">{reposts.length}</span>
        <span> reposts</span>
      </div>
      <ul class="Reposts">
        {reposts.map(repost => (
          <li title={repost.author.name}><a href={repost.url} rel="noopener">
            <img 
              src={repost.author.photo} 
              alt={repost.author.name}
              height={24}
              width={24}
              loading="lazy"
              decoding="async"
            />
          </a></li>
        ))}
      </ul>
    </section>
  )
}
