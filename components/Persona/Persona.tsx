import Pic from '~/components/Pic/Pic.tsx'
import { IPersona } from '~/utils/persona.ts'

export default function Persona({ persona, style }: { persona: IPersona, style?: string }) {
  return (
    persona.img.src.includes('mp4')
      ? <video 
          class="Persona" 
          src={'https://res.cloudinary.com/dnpmdb8r8/video/upload/w_150,q_auto,f_auto/'+persona.img.src} 
          width={persona.img.width}
          height={persona.img.height}
          muted autoplay loop
        />
      : <Pic 
        class="Persona" 
        width={persona.img.width}
        height={persona.img.height}
        src={persona.img.src}
        cloudinary="w_250,c_thumb,f_auto" 
        alt={persona.img.alt}
        style={style}
       />
  )
}