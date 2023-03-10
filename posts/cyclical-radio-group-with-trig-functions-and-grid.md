---
type: blog
persona: argyleink
title: Cyclical keyboard UX with a radio group and CSS trig functions
published_at: 2023-03-10T23:44:41.703
snippet: Radio groups naturally have cyclical roving tab index, but, I put them into a circle and now it really looks cyclical hehe.
hero:
  src: argyleink/cyclical-radio-cover.png
  alt: Screen of the demo
  width: 2198
  height: 812
tags: 
  - CSS
---

CSS [trig functions](https://web.dev/css-trig-functions/ ) can do some neat layout stuff, like circles! In this bite size blog post I quickly share how I turned the cyclical roving tab index feature of a radio group, into a circle so it can cycle seamlessly.

![](f_auto,q_auto/argyleink/cyclical-radios.mp4 "Title $$width:1476,height:1476")

<q class="info">I'm just inside a radio group usin arrow keys.</q>

## The gist

Bramus [wrote a great post](https://web.dev/css-trig-functions/ ) on the new [CSS trigonometry functions](https://developer.mozilla.org/en-US/docs/Web/CSS/sin), and it got me thinking. Those thoughts led to [this demo](https://codepen.io/argyleink/pen/OJozxrB), where I wanted the infinite cycling of focus of a radio group, to tail call itself via a circle layout.

```html
<fieldset style="--sibling-count: 8">
  <input style="--sibling-index: 1" type="radio" name="cyclical-group" checked>
  <input style="--sibling-index: 2" type="radio" name="cyclical-group">
  <input style="--sibling-index: 3" type="radio" name="cyclical-group">
  <input style="--sibling-index: 4" type="radio" name="cyclical-group">
  <input style="--sibling-index: 5" type="radio" name="cyclical-group">
  <input style="--sibling-index: 6" type="radio" name="cyclical-group">
  <input style="--sibling-index: 7" type="radio" name="cyclical-group">
  <input style="--sibling-index: 8" type="radio" name="cyclical-group">
</fieldset>
```

I also used a custom property version of [this spec proposal](https://github.com/w3c/csswg-drafts/issues/4559) I have open with the CSSWG for `sibling-count()` and `sibling-index()`, where an element could know how many siblings it has and which index it currently is. By "used a version of this proposal" I mean, I hand wrote the values 😅

```css
fieldset {
  /* divide circle by total children */
  --_offset: calc(360deg / var(--sibling-count));
  
  /* size also used for circle translateX and Y */
  --_circle-size: 25vmin;
  inline-size: var(--_circle-size);
  block-size: var(--_circle-size);
  
  /* 1x1 centered cell */
  --_cell-size: 10vmin;
  display: grid;
  place-content: center;
  grid: var(--_cell-size) / var(--_cell-size);
  
  /* stack them together in 1 cell */
  > * {
    grid-area: 1/1;
  }
}
```

<q>Get used to that nesting syntax!! woot woot!</q>

With a grid layout setup with all the radios aligned in the middle, and the radius known of the circle, we can do the math.

```css
input {
  /* take child index * circle fraction offset */
  --_angle: calc(var(--sibling-index) * var(--_offset));
  
  /* cos() translateX, sin() translateY */
  translate: 
    calc(cos(var(--_angle)) * var(--_circle-size))
    calc(sin(var(--_angle)) * var(--_circle-size))
  ;
}
```

And that's that, [individual transforms](https://web.dev/css-individual-transform-properties/) making `x` and `y` easy to set. Each radio takes it's current index and multiplies it by the ratio in offset, then uses that angle against the circle radius with `cos()` and `sin()`. 

**Rad.**

## Try it on Codepen

I used [CSS nesting](https://developer.chrome.com/articles/css-nesting/) and trig functions, so you'll need Canary with web experiements turns on, for now.

![](https://codepen.io/argyleink/embed/preview/OJozxrB)

