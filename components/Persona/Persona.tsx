import Pic from '~/islands/Pic.tsx'

export default function Persona({ persona }) {
  return (
    <Pic 
      class="Persona" 
      width="50" 
      src={'w_250,c_thumb,f_auto/'+persona.avatar} 
      alt={persona.avatarAlt}
     />
  )
}