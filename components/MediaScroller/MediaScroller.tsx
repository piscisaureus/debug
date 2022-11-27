export default function MediaScroller(props) {
  return (
    <div class="MediaScroller">
      <div></div>
      {props.media.map(item => (
        <img src={item.src} alt={item.alt}/>
      ))}
      <div></div>
    </div>
  )
}

