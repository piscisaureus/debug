export default function Tags({tags}) {
  return (
    <div class="Tags inline-wrap">
      {tags.map(tag => (
        <span class="Tag">(1) {tag}</span>
      ))}
    </div>
  )
}
