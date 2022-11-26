const urlbase = 'https://res.cloudinary.com/dnpmdb8r8/image/upload'
const folder = 'argyleink'

export interface Image {
  id: string;
  alt: string;
  placeholder: string;
  hero: string;
  thumb: string;
}

export default function Image(props) {
  const full = [urlbase, folder, props.src].join('/')
  const placeholder = [urlbase, `w_240,e_blur:2000,c_thumb,f_auto,q_auto:low/`, folder, props.src].join('/')

  return (
    <img 
      loading="lazy"
      onLoad={()=>
        this.base.src = full
      } 
      alt={props.alt}
      src={placeholder} 
    />
  )
}