import * as marked from 'npm:marked'
import hljs from 'npm:highlight.js/lib/core'

import javascript from 'npm:highlight.js/lib/languages/javascript'
import css from 'npm:highlight.js/lib/languages/css'
import html from 'npm:highlight.js/lib/languages/xml'

import { picPaths } from '~/islands/Pic.tsx'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', html)

marked.setOptions({
  highlight: (code, lang) => {
    if (!lang) return
    if (lang === 'html') lang = 'xml'
    return hljs.highlight(code, {language: lang}).value
  },
})

marked.use({
  renderer: {
    image: (href, title, text) => {
      if (href.includes('codepen')) {
        return `
          <iframe 
            height="300" 
            style="width: 100%;" 
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
        return `<img src="${full}" alt="${text}" title="${title}" />`
      }
      else {
        return `<img loading="lazy" src="${href}" alt="${text}" title="${title}" />`
      }
    },
  }
})

export default marked.parse