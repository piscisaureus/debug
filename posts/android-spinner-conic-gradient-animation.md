---
type: blog
persona: argyleink
title: Conic gradient Android spinner
published_at: 2023-02-19T05:03:10.038
snippet: Recreate an indeterminate spinner from Spotify, building off a tip from last week 🤘🏻💀
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

Only a few lines of code need changed to mimmick the Spotify spinner with [the previous work](/gradient-outline-circular-chart).

The conic gradient _used to be_ pink to cyan (up to the angle), then transparent after that:

```css
#pie {
  background-image: conic-gradient(deeppink, cyan var(--ng), #0000 0);
}
```

The spinner doesn't need the gradient, so we can go with one less color. Also, the transparency needs to be first, and end with white, so reverse the order of the color stops.

```css
#spinner {
  background-image: conic-gradient(#0000 270deg, white 0);
}
```

![](argyleink/quarter-turn-conic.png "One quarter of a conic gradient is shown $$width:1282,height:436")

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

![](f_auto,q_auto/argyleink/android-spinner.mp4 "A spinner not around a play button, but animating and looking the exact same $$width:300,height:300")

The Open Props [easings](https://open-props.style/#easing) were clutch in the effect. Notice how sharp that ease out is, that's definitely custom. With [Open Props](https://open-props.style/) I was able to try on a few of the more extreme ease-out props until I found one that matches what I saw on Android. 

<q class="info">
  ICYMI; Open Props has 5 variants for each of the standard easings in CSS. For example, ease-out-1 is the most subtle ease out, while ease-out-5 is dramatic.
</q>

**That's it!** 🤓

## Try it

Here's [the Codepen](https://codepen.io/argyleink/pen/qBMEYbP) for you to try it out and see it for yourself.

![](https://codepen.io/argyleink/embed/preview/qBMEYbP)