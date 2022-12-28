import Pic from '~/islands/Pic.tsx'

export default function LikeList({likes}:{likes:[]}) {
  return (
    <section>
      <span>{likes.length} likes</span>
      <ul class="LikeList">
        {likes.map(like => (
          <li title={like.author.name}>
            <Pic 
              src={like.author.photo} 
              alt={like.author.name}
              height={24}
              width={24}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
