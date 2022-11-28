export default function MediaScroller({media}) {
  return (
    <div class="MediaScroller">
      <overscroll-effect></overscroll-effect>
      {media.map(item => (
        <img loading="lazy" src={item.src} alt={item.alt}/>
      ))}
      <overscroll-effect></overscroll-effect>
    </div>
  )
}

