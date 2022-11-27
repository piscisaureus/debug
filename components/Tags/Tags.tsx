export default function Tags(props) {
  return (
    <div class="Tags inline-wrap">
      {props.tags.map(tag => (
        <span class="Tag">{tag}</span>
      ))}
    </div>
  )
}
