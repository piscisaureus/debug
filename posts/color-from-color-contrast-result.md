---
type: blog
persona: argyleink
title: A color-contrast() strategy for complimentary translucent backgrounds
published_at: 2023-02-07T18:12:13.186
snippet: With relative color syntax and the color-contrast() function, we can achieve a robust and dynamic overlay effect.
hero:
  src: argyleink/supportive-translucent-bg.png
  alt: Screenshot of the final code snippet from this blog post.
  width: 3699
  height: 1992
tags: 
  - css
---

The goal I had in mind was to have maximized text contrast against any color. This meant the text color should contrast well, but also I wanted a supportive translucent background to help bump that contrast even further, for situations where it may have otherwise had low contrast.

To do this:
1. I find a good contrasting text color with `color-contrast()`. 
1. Then I find a contrasting color for that text color with `color-contrast()`.
1. Use that text contrast color as a supportive translucent background with relative color syntax `oklch(from black l c h / 40%)`

**tldr;**  
1. If the text color is white, it's supportive background should be translucent black.
1. If the text color is black, it's supportive background should be translucent white.

It's so **much easier to see**, but you can [try it here](https://codepen.io/argyleink/pen/GRBLMoY):

![](f_auto,q_auto/argyleink/dynamic-contrast.mp4 "A slider is shown changing the hue of a background color while some overlayed text adapts intelligently to the background color $$width:1280,height:960")

See how I've automated the text color and a supportive background on that text? I don't have to care about the color I'm overlaying now, the browser handles all of it dynamically!

## The essentials of the effect

I use 2 future CSS features that aren't well supported yet (but are very fun to play with):
1. `color-contrast()` - [spec](https://drafts.csswg.org/css-color-6/#colorcontrast)
1. "Relative color syntax" - [spec](https://www.w3.org/TR/css-color-5/#relative-colors)

<q class="info">Safari Tech Preview is the only browser with support for relative color syntax at the time of writing this post. Chrome Canary has color-contrast() support but won't have the dynamic supportive background (see generic bg in CSS below).</q>

First, the container background needs to be in a custom property so we can share it with other functions:

```css
section {
  --bg: hsl(var(--hue) 50% 50%);
}
```

Then, the h1 need to put it's contrasting text color into a custom property so we can share it too:

```css
h1 {
  /* pick either black or white based on --bg */
  --text: color-contrast(var(--bg) vs black, white);
  color: var(--text);
  
  /* generic semitransparent bg */
  background: hsl(0 0% 0% / 40%);
}
```

For the cherry on top, if the browser understands relative color syntax, then create a new semi-transparent color from the contrasting color of `--text`.

```css
/* if relative color syntax is supported */
@supports (background: hsl(from red h s l)) {
  h1 {
    /* pick either black or white 
       depending which contrasts with --text,
       extract it and make it 40% semitransparent */
    background: oklch(from color-contrast(var(--text) vs black,white) l c h / 40%);
  }
}
```

All of it together:

```css
@layer demo {
  section {
    --bg: hsl(var(--hue) 50% 50%);
  }
  
  h1 {
    --text: color-contrast(var(--bg) vs black, white);
    color: var(--text);
    background: hsl(0 0% 0% / 40%);
  }
  
  @supports (background: hsl(from red h s l)) {
    h1 {
      background: oklch(from color-contrast(var(--text) vs black,white) l c h / 40%);
    }
  }
}
```

## Conclusion

There you have it, **dynamically contrasting text with a supportive translucent background**. I think that's pretty rad stuff.

Here's the Codepen embedded, so in the future it'll just work 🤓

![](https://codepen.io/argyleink/embed/preview/GRBLMoY)