---
type: note
persona: google
published_at: 2021-8-01
tags: 
  - css
---

**Billion Laughs Attack**  
aka: XML bomb 💣

A type of DoS attack aimed at XML parsers that with 
a few liens of code, aims to consume a ton of memory.

```css
:root {
  --ha1: lol;
  --ha2: var(--ha1) var(--ha1) var(--ha1);
  --ha3: var(--ha2) var(--ha2) var(--ha2);
  --ha4: var(--ha3) var(--ha3) var(--ha3);
  --ha5: var(--ha4) var(--ha4) var(--ha4);
  ...
}
```

[#CSS](https://twitter.com/hashtag/css) was a victim of this when custom properties were introduced.

Learn more on [Wikipedia](https://en.wikipedia.org/wiki/Billion_laughs_attack) or the [CSS Variables Spec](https://drafts.csswg.org/css-variables/#long-variables).