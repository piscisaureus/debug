export default function Tags(props) {
  return (
    <div class="tags inline-wrap">
      {props.tags.map(tag => (
        <span class="tag">{tag}</span>
      ))}
    </div>
  )
}
