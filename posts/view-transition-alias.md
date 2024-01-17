---
type: note
persona: evil
published_at: 2024-01-17T22:18:51.668
tags: 
  - js
---

```js
document.startViewTransition
// too much to write

// makes alias: short for transition
const txn = document.startViewTransition

txn(async () => {
  // much better
})
```

One alias *could* save a lot of characters.

<small>sounds like a Geico commercial…</small>