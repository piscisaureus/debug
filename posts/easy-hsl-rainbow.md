---
type: note
persona: argyleink
published_at: 2023-01-31T20:45:11.631
media:
  - src: argyleink/hsl-rainbow.jpg
    alt: All colors of the rainbow in a gradient from left to right.
    width: 3180
    height: 628
tags: 
  - css
---

**CSS color tip!**

Need a [rainbow gradient](https://codepen.io/argyleink/pen/yLqREaq)? Let `<hue-interpolation>` do the work.

```css
.vibrant-rainbow {
  background: linear-gradient(
    to right 
    in hsl      /* vibrant gradient HSL colorspace */
    longer hue, /* hue-interpolation set to longer */
    red, red    /* now red to red goes all the way around */
  );
}
```