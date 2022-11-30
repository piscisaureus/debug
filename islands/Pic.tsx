import { useState } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'

const urlbase = 'https://res.cloudinary.com/dnpmdb8r8/image/upload'
const lqip = 'e_blur:2000,c_thumb,f_auto,q_auto:low'

export interface Pic {
  height: number,
  width: number;
  src: string;
  alt?: string;
  class?: string;
}

export default function Pic(props:Pic) {
  const [ loaded, setLoaded ] = useState(0)
  const { full, placeholder } = picPaths(props)

  if (IS_BROWSER) {
    // get image size and add the props to cloudinary mods to the full src
    const preloader = new Image()
    preloader.src = full
    preloader.onload = () => setLoaded(1)  
  }

  // todo: look to see if it's a cloudinary image

  return (
    <img 
      loading="lazy"
      data-state={loaded ? 'loaded' : 'loading'}
      alt={props.alt}
      src={loaded ? full : placeholder} 
      width={props.width}
      height={props.height}
      className={`Pic ${props.class || ''}`}
    />
  )
}

export function picPaths({src, cloudinary}:{src:string, cloudinary?:string}) {
  return {
    full: cloudinary 
            ? [urlbase, cloudinary, src].join('/') 
            : [urlbase, src].join('/'),
    placeholder: [urlbase, lqip, src].join('/'),
  }
}