import Pic from '~/components/Pic/Pic.tsx'
import { IPersona } from '~/utils/persona.ts'

export default function Persona({ persona, style }: { persona: IPersona, style?: string }) {
  const isVideo = persona.img.src.includes('mp4')

  return (
    isVideo
      ? <video 
          class="Persona" 
          src={'https://res.cloudinary.com/dnpmdb8r8/video/upload/w_150,q_auto,f_auto/'+persona.img.src} 
          width={persona.img.width}
          height={persona.img.height}
          muted autoplay loop playsinline
        />
      : <Pic 
          class="Persona" 
          width={persona.img.width}
          height={persona.img.height}
          src={persona.img.src}
          cloudinary="w_250" 
          alt={persona.img.alt}
          style={style}
        />
  )
}