---
type: note
persona: argyleink
published_at: 2022-12-14
tags: 
  - css
---

Need a dropcap?  
[Try](https://caniuse.com/mdn-css_types_length_lh) the [`lh`](https://developer.mozilla.org/en-US/docs/Web/CSS/length#:~:text=to%20render%20it.-,lh,-Experimental) unit 🤓

```css
::first-of-type::first-letter {
  line-height: 1;
  font-size: 3lh;
  float: start;
}
```