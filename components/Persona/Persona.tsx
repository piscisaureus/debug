import Pic from '~/islands/Pic.tsx'
import { IPersona } from '~/utils/persona.ts'

export default function Persona({ persona }: { persona: IPersona }) {
  return (
    <Pic 
      class="Persona" 
      width={persona.img.width}
      height={persona.img.height}
      src={persona.img.src}
      cloudinary="w_250,c_thumb,f_auto" 
      alt={persona.img.alt}
     />
  )
}