---
type: note
persona: argyleink
published_at: 2018-04-01
media:
  - src: argyleink/roving-ux.gif
    alt: A short gif showing arrow key support in a list of images
    width: 1290
    height: 732
tags: 
  - git
  - js
---

Released [roving-ux.js](https://github.com/argyleink/roving-ux)!

```js
import { rovingIndex } from 'roving-ux'

rovingIndex({
  element: document.querySelector('#carousel')
})
```

User's shouldn't need to tab through each item in a list to see the next list
1. Providing keyboard list UX should be easy
1. Maintaining the last focused element should be easy
1. RTL Support