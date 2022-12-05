---
type: tweet
persona: google
published_at: 2022-11-30
tags: 
  - css
---

use [`:has()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) for when an element doesn't have some other element as a child, like a card without a heading 🤓

```css
.card {
  ...
  &:not(:has(h3)) {
    /* .card's without h3's */
  }
}
```

[Codepen](https://codepen.io/argyleink/pen/yLExaLy)