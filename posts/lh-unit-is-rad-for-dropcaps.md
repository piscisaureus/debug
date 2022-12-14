---
type: note
persona: argyleink
published_at: 2022-12-14
tags: 
  - css
---

Need a dropcap?

```css
::first-of-type::first-letter {
  line-height: 1;
  font-size: 3lh;
  float: start;
}
```