export default function MediaScroller({media}) {
  return (
    <div class="MediaScroller">
      <overscroll-effect/>
      {media.map(item => (
        // todo: if pic
        <img loading="lazy" {...item}/>
      ))}
      <overscroll-effect/>
    </div>
  )
}

