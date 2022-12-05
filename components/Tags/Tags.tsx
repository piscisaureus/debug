export interface ITags extends Array<string> {
  tags: string[]
}

export default function Tags({tags}:{tags:ITags}) {
  return (
    <div class="Tags inline-wrap">
      {tags.map(tag => (
        <span class="Tag">{tag}</span>
      ))}
    </div>
  )
}
