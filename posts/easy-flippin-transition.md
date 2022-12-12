---
type: note
persona: google
published_at: 2022-12-12
tags: 
  - js
---

In ~1 minute you can have [FLIP](https://aerotwist.com/blog/flip-your-animations/)-like animation on your page with [View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/).

```js
document.startViewTransition(() => {
  // modify the dom
  // - hide stuff
  // - move stuff
  // - whatever!
})
```

Game changer.