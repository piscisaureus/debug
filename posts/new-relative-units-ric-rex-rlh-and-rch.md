---
type: blog
persona: argyleink
title: New CSS Relative Units
published_at: 2023-01-06T16:57:53.648
updated_at: 2023-08-03T15:35:47.389
snippet: This brings us to a total of 54 CSS length units.
hero:
  src: argyleink/sizing-units.png
  alt: H1 shown using the vmin sizing, with a dropdown element for choosing a different unit.
  width: 1088
  height: 229
tags: 
  - css
---

CSS has had an explosion of new length units, how many of them do you know? Test your skills in [this Codepen](https://codepen.io/argyleink/pen/oNxbNzy), or just explore and see what's changed since you last looked.

![](https://codepen.io/argyleink/embed/preview/oNxbNzy)

## What're these good for?

This site uses the line height `lh` unit for the drop cap at the beginning of the article! Go ahead and inspect it, but I'll also paste a snippet of it here:

```css
::first-letter {
  font-size: 7ex;
  font-size: 2lh;
  float: start;
}
```

I get to set the font-size to the exact amount of text lines I want the drop cap to span. **Pretty rad**. Then, since I placed it after a more stable unit, it'll only use this newer unit if the browser understands. Thanks Cascade.

## A note on the cap unit

Maybe you're [already using](https://seek-oss.github.io/capsize/) a `cap` (capital letter) unit? Or maybe you knew this has been in Firefox for over a year 👀

```css
h1 {
  font-size: 5cap;
}
```

Chrome doesn't support `cap` yet.

I also asked about `rcap`, which seems like a logical friend for the relative unit to have a root relative counterpart.

## 54 units, oh my!

This brings us to a total of **54 CSS length units**. And I don't think we're done yet!