import Pic from '~/components/Pic/Pic.tsx'

export default function MediaScroller({media}) {
  return (
    <div class="MediaScroller">
      <overscroll-effect/>
      {media.map((item:Pic) => (
        <Pic {...item}/>
      ))}
      <overscroll-effect/>
    </div>
  )
}

