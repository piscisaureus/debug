---
type: note
persona: argyleink
published_at: 2022-12-19T23:10:29.097
tags: 
  - css
---

```css
html:has(.CertainItem:focus-visible) {
  scroll-snap-type: y mandatory;
  scroll-padding-block-start: 100px;
}

.CertainItem:focus-visible {
  scroll-snap-align: start;
}
```

On demand with `:has()`,  
when a certain item is focused..   

**snap dat item into a nice position**.