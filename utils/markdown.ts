import * as marked from "https://esm.sh/marked@4.2.3/lib/marked.esm.js"
import * as hljs from "https://esm.sh/@highlightjs/cdn-assets@11.7.0/es/highlight.js"

const highlight = hljs.default.highlight

import { picPaths } from '~/islands/Pic.tsx'
import { videoPaths } from '~/components/Video/Video.tsx'

interface MarkdownImage {
  height?: number,
  width?: number;
  src?: string;
  alt?: string;
}

marked.setOptions({
  highlight: (code:string, lang:string) => {
    if (!lang) return
    if (lang === 'html') lang = 'xml'
    return highlight(code, {language: lang}).value
  },
})

marked.use({
  renderer: {
    heading: (text:string, level:number, raw:string) => {
      const slug = text.toLowerCase().replaceAll(' ', '-')

      return `
        <h${level}>
          <a name="${slug}" href="#${slug}">#</a>
          ${text}
        </h${level}>
       `
    },
    image: (href:string, title:string, text:string) => {
      let opts = {} as MarkdownImage

      if (title?.includes('$$')) {
        const [__title, extract] = title.split('$$')

        opts = extract.split(',')
          .reduce((acc, item) => {
            const [a,b] = item.split(':')
            return {...acc, ...{[a]:b}}
          }, {})

        title = __title
      }
      if (href.includes('codepen')) {
        return `
          <iframe 
            class="codepen-embed" 
            scrolling="no" 
            title="${title}" 
            src="${href}?default-tab=result&editable=true&theme-id=43079" 
            frameborder="no" 
            loading="lazy" 
            allowtransparency="true" 
            allowfullscreen="true"
          >
            See the Pen <a href="${href}">
            Hot text-emphasis</a> by Adam Argyle (<a href="https://codepen.io/argyleink">@argyleink</a>)
            on <a href="https://codepen.io">CodePen</a>.
          </iframe>
        `
      }
      else if (href.includes('argyleink')) {
        if (href.includes('.mp4')) {
          const {src, poster} = videoPaths(href)

          return `<video 
            src=${src} 
            ${opts.width && `width="${opts.width}" `}
            ${opts.height && `height="${opts.height}"`}
            alt="${text} "
            poster="${poster}"
            controls 
            preload="true"
            loop
            muted 
            allowFullScreen
          />`
        }
        else {
          const { full } = picPaths({src: href})

          return `<img 
            loading="lazy" 
            src="${full}" 
            alt="${text}" 
            title="${title}" 
            ${opts.width && `width="${opts.width}" `}
            ${opts.height && `height="${opts.height}"`}
          />`
        }
      }
      else {
        return `<img loading="lazy" src="${href}" alt="${text}" title="${title}" />`
      }
    },
  }
})

export default marked.parse