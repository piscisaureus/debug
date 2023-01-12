---
type: blog
persona: google
title: Text Replace Transitions
published_at: 2023-01-10T17:34:27.381
snippet: With view transitions, even replacing text can become a custom animation.
hero:
  src: argyleink/text-replace-transitions.png
  alt: |
       setInterval(() => {
         document.startViewTransition(() => {
         h1.textContent = word[index++]
       })}, 500)
  width: 1820
  height: 626
tags: 
  - css
  - js
---

First up, the good stuff, *the final demo*, as if you skipped to the end.

![](https://codepen.io/argyleink/embed/preview/KKBWwMr)

If that's basically an error message about support, here's a recording of it running in Canary (with [this flag enabled](chrome://flags/#view-transition) 😉.

![](f_auto,q_auto/argyleink/view-transitions.mp4 "Spells out view-transitions, fade and scaling each letter change $$width:810,height:608")

**tldr;**  
[`view-transition`](https://developer.chrome.com/docs/web-platform/view-transitions/)'s let me, **with CSS**, describe how to dismiss the old text state and reveal the new text state.

## The inspo

This demo idea came from the game [Session Skate](https://store.steampowered.com/agecheck/app/861650/). In the opening credits, "SESSION" has each letter rapidly cross fade. It looked pretty coo and I instantly realized I could do this with [`view-transition`](https://developer.chrome.com/docs/web-platform/view-transitions/)'s, `setInterval()`, and `.textContent`. So I sent myself the email todo, cuz well, it was time to land a sick trick, not work.

That turned into a small prototype. Peep these barebones!

```js
setInterval(() => {
  document.startViewTransition(() => {
    h1.textContent = word[index++]
    if (index >= word.length) index = 0
  })
}, 500)
```

1. Every half a second
1. Take a quick "before" snapshot
1. Set some new text content

When the work finishes in that view transition callback, the browser interpolates between the changes for you, for free. In our case, there was a "V", now there's an "i". One letter disappeared, one letter appeared. We get a crossfade!

![](f_auto,q_auto/argyleink/view-transitions-cross.mp4 "video $$width:702,height:286")

![](https://codepen.io/argyleink/embed/preview/BaPWpmQ)

There. We matched the video game.

## Customizing the transition; aka spinkling props

Crossfades are coo (fo real y'all), but what if I want to customize how the text swaps? Perhaps with some [Open Props](https://open-props.style)?

**No prob** 🤘💀

First thing, `@import` the [easings](https://open-props.style/#easing) and [animations](https://open-props.style/#animations):

```css
@import "https://unpkg.com/open-props/easings.min.css";
@import "https://unpkg.com/open-props/animations.min.css";
```

Next, as an optimization, tell the whole page to chill and not transition when a document transition snapshot is requested.

```css
html {
  view-transition-name: none;
}
```

Now that we said what we dont want to transition, let's specify what should, the `h1`!

```css
h1 {
  /* be stable. fix that width. */
  inline-size: 1em;
  
  /* required for view-transitions  
     now it's not the whole page */
  contain: layout;
  
  /* yo browser; transition this! */
  view-transition-name: replace-effect;
}
```

Remember that `view-transition-name`, we'll be able to reference its before and after states in the next section.

### Now for the best part

Use [some of these props](https://open-props.style/#animations) to orchestrate the exit and entry of a character / the DOM snapshots. Let's start with how the old character should exit; let's see, I want it to scale out, like away from me, and fade out at the same time.

```css
@media (prefers-reduced-motion: no-preference) {
  html::view-transition-old(replace-effect) {
    animation: 
      var(--animation-fade-out),
      var(--animation-scale-down);
  }
}
```

**Delightful magic.**<br>
Now for the element entering; fade it in while sliding it up!

```css
@media (prefers-reduced-motion: no-preference) {
  html::view-transition-new(replace-effect) {
    z-index: 1;
    animation: 
      var(--animation-fade-out) reverse,
      var(--animation-slide-in-up);
  }
}
```

<q class="info">
the fade-out animation is reversed so opacity doesn't need set to 0.
</q>

Mix and match animation props in that Codepen and have some fun 🙂

![](https://codepen.io/argyleink/embed/preview/KKBWwMr)

## outro

**Fun Stuff!**. 

Make a DOM change, describe how to transition the changes. **Love it.** 

<small>
  Hope this gets picked up by other browsers 🤞 <a href="https://drafts.csswg.org/css-view-transitions-1/">Peep the spec</a>.
</small>
