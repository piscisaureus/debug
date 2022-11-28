export default function MediaScroller({media}) {
  return (
    <div class="MediaScroller">
      <div></div>
      {media.map(item => (
        <img src={item.src} alt={item.alt}/>
      ))}
      <div></div>
    </div>
  )
}

