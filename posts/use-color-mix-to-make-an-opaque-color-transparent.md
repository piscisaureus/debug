---
type: blog
persona: argyleink
title: Use color-mix() to give opacity to opaque colors
published_at: 2023-03-09T17:41:05.276
snippet: Relative color syntax is a better way, but still fun to know this trick.
hero:
  src: argyleink/rgb-color-mix.png
  alt: RGB and CMYK mixed with circles
  width: 3048
  height: 1026
tags: 
  - css
---

A very common task is to programmatically create non-opaque versions of brand colors. Comes in handy for hover effects, edge highlights, shadows, etc. Here's one way to achieve that with [`color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix).

This post was prompted by [Adam Wathan](https://twitter.com/adamwathan) on [Twitter](https://twitter.com/adamwathan/status/1633632073012457472):

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">For someone smarter than me (<a href="https://twitter.com/argyleink?ref_src=twsrc%5Etfw">@argyleink</a>?) can the new `color-mix()` function be used to adjust the opacity of a color with the right concoction of clever arguments?<br><br>color-mix(something, color-whose-opacity-i-want-to-override, some-way-to-specify-that-opacity)</p>&mdash; Adam Wathan (@adamwathan) <a href="https://twitter.com/adamwathan/status/1633632073012457472?ref_src=twsrc%5Etfw">March 9, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## The trick

Ok browser, make red 25% opacity:

```css
.make-transparent {
  background: color-mix(
    in oklab, 
    red, 
    transparent 75%
  );
}
```

To get that result, we mixed a `75%` transparent hueless color with a fully opaque `red`, the result is a `red` at `25%` opacity. `25%` because specified in the mix that the `transparent` color is `75%` dominant in the mix, leaving a remainder of `25%` opacity for the `red` color.

Also, I chose `oklab` very specifically here, it gave me the mix I expected. Other color spaces did not. *Glad I knew my color spaces.*

**Here's another one.**

Make this `10%` red, even more transparent. In fact, make it half as transparent as it is now.

```css
.make-more-transparent {
  background: color-mix(
    in srgb, 
    rgb(255 0 0 / 10%), 
    transparent 50%)
  ;
}
```

Result  is `rgb(255 0 0 / 5%)`. See on [Codepen](https://codepen.io/argyleink/pen/NWLwNxE).

### Try it

Chrome Canary, Firefox and Safari Tech Preview have `color-mix()`, we'll very likely see it cross browser by summer.

![](https://codepen.io/argyleink/embed/preview/yLxPeYj)

## The better way

[Relative color syntax](https://drafts.csswg.org/css-color-5/#relative-colors) is much cleaner for this task.

<q>It's also badass overall. Can't wait for it.</q>

Make the red 25% opacity:

```css
.make-transparent {
  background: rgb(from red r g b / 25%);
}
```

or the other example, you can either absolutely squash it by just setting it, or you can perform math on it, like cut it in half:

```css
.squash-transparency {
  background: rgb(from rgb(255 0 0 / 10%) r g b / 5%);
}
```

or

```css
.cut-transparent-in-half {
  background: rgb(from rgb(255 0 0 / 10%) r g b / calc(a / 2));
}
```

## Resources
1. Try my color-mix tool at https://color-mix.style
1. In depth `color-mix()` post at https://developer.chrome.com/blog/css-color-mix/
1. Get more familiar with colorspaces at https://developer.chrome.com/articles/high-definition-css-color-guide/