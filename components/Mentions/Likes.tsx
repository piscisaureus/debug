import { IMention } from '~/utils/webmentions.ts'

export default function Likes({likes}:{likes:IMention[]}) {
  return (
    <section>
      <div class="mention-header">
        <span class="Tag">{likes.length}</span>
        <span> likes</span>
      </div>
      <ul class="Likes">
        {likes.map(like => (
          <li title={like.author.name}><a href={like.url} rel="noopener">
            <img 
              src={like.author.photo} 
              alt={like.author.name}
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
