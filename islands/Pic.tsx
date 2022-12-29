import { useState } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'

export const urlbase = 'https://res.cloudinary.com/dnpmdb8r8/image/upload'
const lqip = 'e_blur:2000,c_thumb,f_auto,q_auto:low'

export interface Pic {
  src: string;
  alt?: string;
  height?: number,
  width?: number;
  class?: string;
  style?: string;
  cloudinary?: string;
}

export default function Pic(props:Pic) {
  const [ loaded, setLoaded ] = useState(0)
  const { full, custom, placeholder } = picPaths(props)

  if (IS_BROWSER) {
    // get image size and add the props to cloudinary mods to the full src
    const preloader = new Image()
    preloader.src = custom
    preloader.onload = () => setLoaded(1)  
  }

  return (
    <img 
      loading="lazy"
      data-state={loaded ? 'loaded' : 'loading'}
      data-full={full}
      alt={props.alt}
      src={loaded ? custom : placeholder} 
      width={props.width}
      height={props.height}
      style={props.style}
      className={`Pic ${props.class || ''}`}
      decoding="async"
    />
  )
}

export function picPaths({src, cloudinary}:{src:string, cloudinary?:string}) {
  const isCloudinary = src.indexOf('argyleink/') >= 0

  if (!isCloudinary)
    return {full: src, custom: src, placeholder: src}
  else
    return {
      full: [urlbase, 'f_auto', src].join('/'),
      custom: cloudinary 
              ? [urlbase, cloudinary + ',f_auto', src].join('/') 
              : [urlbase, 'f_auto', src].join('/'),
      placeholder: [urlbase, lqip, src].join('/'),
    }
}