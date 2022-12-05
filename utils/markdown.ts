import * as marked from 'https://unpkg.com/marked/lib/marked.esm.js'
import * as hljs from 'https://unpkg.com/@highlightjs/cdn-assets/es/highlight.js'

import { IHero } from '~/utils/posts.ts'

const highlight = hljs.default.highlight
import { picPaths } from '~/islands/Pic.tsx'

marked.setOptions({
  highlight: (code:string, lang:string) => {
    if (!lang) return
    if (lang === 'html') lang = 'xml'
    return highlight(code, {language: lang}).value
  },
})

marked.use({
  renderer: {
    image: (href:string, title:string, text:string) => {
      let opts = {} as IHero

      if (title?.includes('$$')) {
        const [__title, extract] = title.split('$$')

        opts = extract.split(',')
          .reduce((acc, item) => {
            let [a,b] = item.split(':')
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
            src="${href}?default-tab=css%2Cresult&editable=true&theme-id=43079" 
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
      else {
        return `<img loading="lazy" src="${href}" alt="${text}" title="${title}" />`
      }
    },
  }
})

export default marked.parse