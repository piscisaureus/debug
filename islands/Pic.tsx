import { useState } from "preact/hooks"
import { IS_BROWSER } from '$fresh/runtime.ts'

const urlbase = 'https://res.cloudinary.com/dnpmdb8r8/image/upload'
const folder = 'argyleink'
const lqip = 'w_240,e_blur:2000,c_thumb,f_auto,q_auto:low'

export interface iPic {
  alt: string;
  src: string;
}

export default function Pic(props: iPic) {
  const [loaded, setLoaded] = useState(0)

  const state = {loaded: false}
  const full = [urlbase, folder, props.src].join('/')
  const placeholder = [urlbase, lqip, folder, props.src].join('/')

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
      style={!loaded && 'inline-size: 100%'}
    />
  )
}