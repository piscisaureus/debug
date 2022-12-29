import { IMention } from '~/utils/webmentions.ts'

export default function Likes({likes}:{likes:IMention[]}) {
  return (
    <section>
      <span>{likes.length} likes</span>
      <ul class="Likes">
        {likes.map(like => (
          <li title={like.author.name}><a href={like.url}>
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
