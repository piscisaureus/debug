import { IHero } from '~/utils/posts.ts'

const base_url = 'https://res.cloudinary.com/dnpmdb8r8/video/upload'

export default function Video(media:IHero, style?:string) {
  const {src, poster} = videoPaths(media.src)

  return (
    <video 
      src={src} 
      width={media.width} 
      height={media.height} 
      alt={media.alt} 
      poster={poster}
      controls 
      preload="true"
      loop
      muted 
      allowFullScreen
    />
  )
}

export function videoPaths(src:string) {
  const isCloudinary = src.indexOf('argyleink/') >= 0

  if (!isCloudinary)
    return {full: src, placeholder: undefined}
  else
    return {
      src:    [base_url, src].join('/'),
      poster: [base_url, src].join('/').replace('.mp4', '.jpg'),
    }
}