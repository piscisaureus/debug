---
type: tweet
persona: google
published_at: 2022-11-30
tags: 
  - css
---

use `:has()` for when an element doesn't have some other element as a child, like a card without a heading 🤓

```css
.card {
  ...
  &:not(:has(h3)) {
    /* .card's without h3's */
  }
}
```

try on [Codepen](https://codepen.io/argyleink/pen/yLExaLy)!