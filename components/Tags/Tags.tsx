export default function Tags(props) {
  return (
    <div class="tags">{props.tags.map(tag => (
      <span class="tag">{tag}</span>
    ))}</div>
  )
}
