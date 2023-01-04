---
type: blog
persona: google
title: Gradient hue interpolation
snippet: Tell the browser to take a different route when building gradient steps.
published_at: 2022-12-29T21:48:22.970
hero:
    src: argyleink/gradient-hue-interpolation.png
    alt: A gradient from blue to purple is shown represented 4 ways, shorter, longer, increasing and decreasing.
    width: 2144
    height: 1148
tags: 
  - css
---

When a gradient needs to transition from one color to the next, it takes the [shortest](https://www.w3.org/TR/css-color-4/#hue-shorter) route it can. But what if the result of that stinks?

![](argyleink/gradient-hue-distance.png "A circle gradient representing all hues and is white in the center, where a smaller inner circle shows the difference between shorter and longer routes $$width:389,height:388")

### Hue interpolation

That's where new CSS gradient syntax from [Color 4](https://www.w3.org/TR/css-color-4) for [hue interpolation](https://www.w3.org/TR/css-color-4/#hue-interpolation) comes in. Here I specify the gradient takes the [longer](https://www.w3.org/TR/css-color-4/#hue-longer) route:

```css
.gradient-with-hue-interpolation-specified {
  background: linear-gradient(
    to right in hsl longer hue, 
    oklch(63% 0.3 317), 
    oklch(63% 0.2 255)
  );
}
```

It's almost like the browser has been Zoolander this whole time, it would only turn right 😂

![](argyleink/zoolander-left.jpg)

Here's 2 demo's that use [ColorJS](https://colorjs.io/) to help illustrate the effects of this hue interpolation choice. Aka, demo's that help the browser turn left hehe.

### Blue to Purple example
A soft intro example into the topic:

![](https://codepen.io/argyleink/embed/preview/GRGPxEJ)

### Interactive demo
This one let's you pick the colors and number of steps:

![](https://codepen.io/argyleink/embed/preview/JjZajmb)

So so many more color tools coming to the browser!