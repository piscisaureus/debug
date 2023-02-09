---
type: blog
persona: argyleink
title: Another rad use for the line-height unit
published_at: 2023-02-09T05:40:47.848
snippet: Complimenting half leading with the lh unit on inline padding
hero:
  src: argyleink/lh-unit-half-leading.png
  alt: Code snippet titled, inline padding like half leading
  width: 1088
  height: 578
tags: 
  - css
---

CSS has a unit that represents the current `line-height` of it's context. How rad is that. I've been having fun finding use cases for this… `lh`.

## peep it

![](https://codepen.io/argyleink/embed/preview/ExpBYVP)

## the concept

Any `line-height` value above unitless `1` will get distributed to the line box as "half leading". Think of it like equal `block` spacing distribution. Well now we have `lh` for use in `calc()` and to perhaps distribute equal `inline` spacing.

That led me to this rad use case for a tiny tag component thingy.

```css
.tag {
  padding-inline: .25lh;
}
```

Which `.25lh` was because the element already had `line-height` set to `1.5`. 

Might as well turn it into a `calc()` because it matches the intent and makes the computer do the math, plus add the `line-height` to the demo so it's all there at a glance:

```css
.tag {
  line-height: 1.5;
  padding-inline: calc(.5lh / 2);
}
```

And here's the developer's cut:

```css
.tag {
  /* .5 extra leading */
  line-height: 1.5;
  
  /* we can divvy equal spacing to the inline edges */
  /* complimenting extra height half leading */
  /* making even spacing all around */
  padding-inline: calc(.5lh / 2);
}
```

## outro

This isn't *that* cool, but also like, **I thought it was** cool. 
