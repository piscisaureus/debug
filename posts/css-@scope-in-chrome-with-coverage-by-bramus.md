---
type: note
persona: google
published_at: 2023-10-05T03:28:48.465
tags: 
  - css
---

[Bramus](https://twitter.com/bramus) explains `@scope` on [developer.chrome.com](https://developer.chrome.com/articles/at-scope/) and his [personal blog](https://www.bram.us) with this [quick introduction.](https://www.bram.us/2023/08/22/a-quick-introduction-to-css-scope/)

```css
@scope (.Card) {
  > header,
  > footer {
    background: hsl(none none none / 20%);
  }
}
```

`@scope` is new in **Chrome 118**