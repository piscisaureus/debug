---
type: blog
persona: admin
title: Make some hacky noise with CSS gradients
published_at: 2024-01-22T05:08:40.947
snippet: Gradient on gradient action.
hero:
  src: argyleink/gradient-noise-stack.png
  alt: Text emphasized alt text example
  width: 1576
  height: 1396
tags: 
  - css
---

Here's an effect I stumbled on and thought was kinda cool. I found it by animating the size of the ring in a repeating radial gradient to `0px` with `@property`, really *slowly*, and notice that when it got near 0, it started to freak out.

![](f_auto,q_auto/argyleink/radial-gradient-noise.mp4 "Title $$width:1644,height:926")

Then I started to wonder.

## The Setup

Here's the mask I was working with at first, a nice reasonale `5px` and `5px` gap radial repeating mask:

```css
.noise {
  --lines: 4px;
  
  mask: repeating-radial-gradient(
    circle at center,
    #000,
    var(--lines),
    #000,
    0, /* transition hints make code easier to manage */
    #0000,
    calc(var(--lines) * 2),
    #0000 0 /* trailing 0 is part of the hard stop logic */
  );
}
```

![](https://codepen.io/argyleink/embed/preview/wvOeEwr)

Still a pretty sweet effect over some text I think!

## The Trick

BUT, when you change that `--lines` value to something super small, it starts to distort and go into subpixel rounding stuff? 

```css
.noise {
  --lines: 0.0003px;
}
```

![](https://codepen.io/argyleink/embed/preview/JjzJEMV)

And boom, noise. At certain times it looks like radial noise too. Trails of its origins.

## Animating it

I already knew that `@property` could animate the noise because of how I stumbled upon the effect. What I didn't know yet, was what were the fun knobs I could turn?!

Kick off the gradient animation fun with an `@property`:

```css
@property --lines {
  syntax: "<length>";
  inherits: false;
  initial-value: 0.00010px;
}
```

And some keyframes, *subtly* animating from one <small>tiny</small> little subpixel value to another.

```css
@keyframes liner {
  50% {
    --lines: 0.00012px;
  }
}
```

Link these things up for animation on our element:

```css
@import "https://unpkg.com/open-props/durations.min.css";

.noise {
  animation: liner var(--hour) linear infinite;
}
```

and **watch the noise**!  

![](https://codepen.io/argyleink/embed/preview/vYPZgXB)

Also, observe the absolute chaos while the power of CSS handles it like a 60fps game engine.

## Outro

The levers / what you should toy with:

1. the delta in values
1. values themselves
1. duration

Even try adding reasonable values, like `10px` lines with a reasonable duration like `.5s` or `var(--atom)`.