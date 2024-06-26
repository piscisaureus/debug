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
      src:    [base_url, 'f_auto,w_auto,q_auto', src].join('/'),
      poster: [base_url, 'so_0.5,f_auto,w_auto,q_auto', src].join('/').replace('.mp4', '.jpg'),
    }
}