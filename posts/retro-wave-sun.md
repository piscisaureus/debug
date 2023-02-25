---
type: blog
persona: argyleink
title: Retro Wave Gradient
published_at: 2023-02-25T06:03:35.543
snippet: Quick example of how to make that striped mask on the bottom of the circle gradient.
hero:
  src: argyleink/retro-wave.png
  alt: A orange and purple gradient sun with a striped mask on the bottom half
  width: 2520
  height: 1104
tags: 
  - css
---

The mask for this circle gradient is a set of gradient hard lines. As the visible area increases from the bottom, the 7 lines of invisible area decreases. 

A receding hard line (like receding hair line.. get it‽)

![](https://codepen.io/argyleink/embed/preview/XWPjzgR)

The [#CSS](#) **Math and Magic** ™️ is that hard lines are made easy (IMO at least) with gradient [color hints](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#:~:text=the%20gradient%27s%20axis\).-,%3Ccolor%2Dhint%3E,-An%20interpolation%20hint). And the visibility and invisibility math is relative (changes of ±1%) but exist along an absolute percentage length.

```css
.retro-wave {
  background: var(--gradient-1);

  mask: linear-gradient(
    to top,
    #000 1%,     /* 1% visible */
    0%,          /* hard line */
    #0000 8%,    /* 7% masked */
    0%,
    #000 10%,    /* 2% visible */
    0%,
    #0000 16%,   /* 6% masked */
    0%,
    #000 19%,    /* 3% visible */
    0%,
    #0000 24%,   /* 5% masked */
    0%,
    #000 28%,    /* 4% visible */
    0%,
    #0000 32%,   /* 4% masked */
    0%,
    #000 37%,    /* 5% visible */
    0%,
    #0000 40%,   /* 3% masked */
    0%,
    #000 46%,    /* 6% visible */
    0%,
    #0000 48%,   /* 2% masked */
    0%,
    #000 55%,    /* 7% visible */
    0%,
    #0000 56%,   /* 1% invisible */
    0%,
    #000 57%     /* visible til end */
  );
}
```

Def loop worthy right? 
<small>Took longer to write the comments then it did the code.</small>

See how those color hints (aka "transition" hints) bottom out the fade between the colors black and transparent? Then each color just needs to consider how how long it is. I felt it was helpful to think of it like that at least.

How would you do this?

Here's the snippet unexpanded, **fer the takin'!**

```css
mask: linear-gradient(to top, #000 1%, 0%, #0000 8%, 0%, #000 10%, 0%, #0000 16%, 0%, #000 19%, 0%, #0000 24%, 0%, #000 28%, 0%, #0000 32%, 0%, #000 37%, 0%, #0000 40%, 0%, #000 46%, 0%, #0000 48%, 0%, #000 55%, 0%, #0000 56%, 0%, #000 57%);
```