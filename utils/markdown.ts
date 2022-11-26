import * as marked from 'npm:marked'
import hljs from 'npm:highlight.js/lib/core'

import javascript from 'npm:highlight.js/lib/languages/javascript'
import css from 'npm:highlight.js/lib/languages/css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)

marked.setOptions({
  highlight: (code, lang, cb) =>
    hljs.highlight(code, {language: lang}).value
})

export default marked.parse