---
type: blog
persona: argyleink
title: This is my first blog post!
published_at: 2022-11-26
snippet: This is an excerpt of my first blog post.
hero:
  src: argyleink/text-emphasized.png
  alt: Text emphasized alt text example
  width: 999
  height: 496
tags: 
  - test
---

<details>
  <summary>open and close this</summary>
  
  stuff and things
</details>

![](w_400/argyleink/gui-skull.png "Title $$width:400,height:411")

![](https://media1.giphy.com/media/b0HYKHINjL32qEsoJt/giphy.gif?cid=ecf05e470xzt877ojokmkub40d6kk0paaufim6fm41294pjd&rid=giphy.gif&ct=g)

![](https://codepen.io/argyleink/embed/preview/YzveomK)

1.  Bird
1.  McHale
1.  Parish

```html
<div class="footer">
  &copy; 2004 Foo Corporation
  <!-- comment example -->
</div>

<ol>
  <li>Bird</li>
  <li>McHale</li>
  <li>Parish</li>
</ol>
```

Regular Markdown syntax is not processed within code blocks. E.g.,
asterisks are just literal asterisks within a code block. This means
it's also easy to use Markdown to write about Markdown's own syntax.

```css
@layer demo {
  h1 {
    text-emphasis-style: "🔥";
    font-size: 30px;
    /* example comment */
    --some-var: linear-gradient(to right, #ff0, #333);
  }
}

@keyframes fade-in {
  to {
    rotate: 1turn;
  }
}
```

```js
const foo = () => {
  // comment
  return console.log(window)
}

import { formatDistance, isToday } from 'https://esm.sh/date-fns'
// import { en } from 'https://unpkg.com/date-fns/esm/locale'

export function relDate(date:Date) {
  return isToday(new Date(date), new Date())
    ? 'today'
    : formatDistance(new Date(date), new Date()) + ' ago'
}
```

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__
