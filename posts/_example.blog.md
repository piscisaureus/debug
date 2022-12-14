---
type: blog
persona: admin
title: This is my first blog post!
published_at: 2022-11-26
snippet: This is an excerpt of my first blog post.
hero:
  src: argyleink/skull-card.png
  alt: Text emphasized alt text example
  width: 1366
  height: 768
tags: 
  - test
---

## first headline of the post
<!-- note: no code in headers -->

this should start large as the first line. then it should wrap and not be large text. that's the test at least.

<q>
  a regular quote with regular sized content
  <cite>Adam Argyle</cite>
</q>

### Images

![](w_400/argyleink/gui-skull.png "Title $$width:400,height:411")

![](https://media1.giphy.com/media/b0HYKHINjL32qEsoJt/giphy.gif?cid=ecf05e470xzt877ojokmkub40d6kk0paaufim6fm41294pjd&rid=giphy.gif&ct=g)

![](https://codepen.io/argyleink/embed/preview/YzveomK)

![](argyleink/media-ranges-looper.mp4 "Title $$width:2366,height:1080")

## lists

1.  Bird
1.  McHale
1.  Parish

-  Bird
-  McHale
-  Parish

### some random tests

```html
<div class="footer">
  2040 Foo Corporation
  <!-- comment example -->
</div>

<ol>
  <li>Bird</li>
  <li>McHale</li>
  <li>Parish</li>
</ol>
```

<q class="warning">
  i'm a **warning** quote
</q>

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

<q class="info">
  i'm an info quote that hopefully goes multiline because it rambles a bit and stuff n things
</q>

## more random stuff

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

### deeper header

*single asterisks*

#### even deeper

_single underscores_

**double asterisks**

__double underscores__

<details>
  <summary>open and close this</summary>
  
  stuff and things
</details>
