---
type: blog
persona: argyleink
title: Conic gradient Android spinner
published_at: 2021-11-26
snippet: Building on the circular gradient stroke chart, we can recreate this indeterminate Android spinner.
hero:
  src: argyleink/conic-spinner-hero-bg.png
  alt: Abstract spinner image with many in inbetween states
  width: 1280
  height: 480
tags: 
  - css
---

Last week I shared a [circular chart effect](/gradient-outline-circular-chart) using a [conic gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient) and a [radial gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient) mask. Then I saw this:

![](f_auto,q_auto/argyleink/android-spotify-spinner.mp4 "Spinner shown rotating indefinitely around a play button $$width:1004,height:558")

We can **use the same work from the chart** to make this spinner, see!

![](f_auto,q_auto/argyleink/android-spinner.mp4 "A spinner not around a play button, but animating and looking the exact same $$width:300,height:300")

## Gradient changes

Start by [reviewing the previous post on the chart](/gradient-outline-circular-chart). Once you've ramped up, let's look at the few lines of code I changed to mimmick the Spotify spinner.

The conic gradient used to be this, a gradient from pink to cyan, then transparent after that:

```css
#pie {
  background-image: conic-gradient(deeppink, cyan var(--ng), #0000 0);
}
```

The spinner doesn't need the gradient and also need the transparency to be reverse. So this change starts transparent and then ends with solid white.

```css
#spinner {
  background-image: conic-gradient(#0000 var(--ng), white 0);
}
```

## Adding animation

Here's my favorite way to make an infinite rotation animation in CSS:

```css
@keyframes rotate {
  to {
    rotate: 1turn;
  }
}
```

With those keyframes we can create an infinite animation:

```css
@import "https://unpkg.com/open-props/easings.min.css";

#spinner {
  animation: rotate .8s var(--ease-out-4) infinite;
}
```

The Open Props [easings](https://open-props.style/#easing) were clutch in the effect. Notice how sharp that ease out is, that's definitely custom. With [Open Props](https://open-props.style/) I was able to try on a few of the more extreme ease-out functions until I found one that matches what I saw on Android.

## Try it

Here's the Codepen for you to try it out and see it for yourself:

![](https://codepen.io/argyleink/embed/preview/qBMEYbP)