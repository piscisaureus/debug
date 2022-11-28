import { useState } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'

const urlbase = 'https://res.cloudinary.com/dnpmdb8r8/image/upload'
const lqip = 'e_blur:2000,c_thumb,f_auto,q_auto:low'

export default function Pic(props) {
  const [loaded, setLoaded] = useState(0)

  const state = {loaded: false}

  const { full, placeholder } = picPaths(props)

  if (IS_BROWSER) {
    const preloader = new Image()
    preloader.src = full
    preloader.onload = () => setLoaded(1)  
  }

  return (
    <img 
      loading="lazy"
      data-state={loaded ? 'loaded' : 'loading'}
      alt={props.alt}
      src={loaded ? full : placeholder} 
      width={props.width}
      height={props.height}
      className={props.class}
    />
  )
}

export function picPaths({src, cloudinary}) {
  return {
    full:         [urlbase, cloudinary, src].join('/'),
    placeholder:  [urlbase, lqip, src].join('/'),
  }
}