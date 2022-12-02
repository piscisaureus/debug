export default function Tags({tags}) {
  return (
    <div class="Tags inline-wrap">
      {tags.map(tag => (
        <span class="Tag">{tag}</span>
      ))}
    </div>
  )
}
