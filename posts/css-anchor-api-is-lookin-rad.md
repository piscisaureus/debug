---
type: blog
persona: google
title: CSS Anchor API is lookin rad!
published_at: 2022-12-20T23:04:09.263
snippet: Name an anchor, position stuff to it.
hero:
  src: argyleink/css-anchor-hero.png
  alt: A bar chart shown with 2 popups anchored to the smallest and largest bars.
  width: 1063
  height: 414
tags: 
  - css
---

I often feel intimidated initially by new CSS things.. I've been putting off the new [CSS Anchor](https://tabatkins.github.io/specs/css-anchor-position/) api stuff cuz it looked scary. 

But **not 15m minutes** into actually sitting with it, **and I'm stoked**.

![](argyleink/css-anchor.mp4 "Title $$width:833,height:490")

## basics

You need something to anchor to, just like you need a [named container](https://www.w3.org/TR/css-contain-3/#container-name) or a [view-timeline](https://www.w3.org/TR/scroll-animations-1/#view-timeline-name).

```css
.some-non-floating-element {
  anchor-name: --side;
}
```

Next, assign some element's positions to that anchor. Let's say we want to put a floating element underneath that non-floating one. We'd want the top of the floating thing to be touching the bottom of the anchor:

```css
.tooltippy {
  position: absolute;
  top: anchor(--side bottom);
  /* top of this touches the bottom of that */
}
```

Then, we want the left side of this tooltip to align with the left side of the anchor:

```css
.tooltippy {
  left: anchor(--side left);
  /* left of this touches the left of that */
}
```

Now it's aligned with it: left aligned and under!

## Resources

Dig in:

1. [Jhey](https://jhey.dev/links/) has a [fantanstic anchor() collection](https://codepen.io/collection/qOEKVN) on Codepen
1. He also covers anchoring in a piece on the [Chrome Developers Blog](https://developer.chrome.com/blog/) called [Popups They're Making A Resurgence](https://developer.chrome.com/blog/pop-ups-theyre-making-a-resurgence/#anchoring-under-development)
1. [Official Explainer](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/)
1. [Official Spec](https://tabatkins.github.io/specs/css-anchor-position/)
