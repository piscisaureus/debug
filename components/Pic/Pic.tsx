export const urlbase = 'https://res.cloudinary.com/dnpmdb8r8/image/upload'
const optimizations = 'f_auto,w_auto,dpr_auto,q_auto'
const lqip = 'e_blur:2000,c_thumb,f_auto,w_auto,dpr_auto,q_auto:low'

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
  const { full, custom, placeholder } = picPaths(props)

  return (
    <img 
      loading="lazy"
      data-full={full}
      alt={props.alt}
      src={custom} 
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
      full: [urlbase, optimizations, src].join('/'),
      custom: cloudinary 
              ? [urlbase, cloudinary + ',' + optimizations, src].join('/') 
              : [urlbase, optimizations, src].join('/'),
      placeholder: [urlbase, lqip, src].join('/'),
    }
}