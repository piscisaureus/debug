---
type: blog
persona: argyleink
title: Learn With Jason (live in studio)
published_at: 2024-02-07T05:53:45.089
snippet: I made a brutalist noise experience with Svelte, PartyKit, audio streams, gradients and blend modes. Jason and I go through the code, giggle, and cause some visual chaos.
hero:
  src: argyleink/noisee-mind-blown.png
  alt: asdf
  width: 1280
  height: 720
tags: 
  - media
  - css
  - js
  - git
---


[Noisee](https://noisee.netlify.app/) is an ephemeral visual audio experience shared with friends [in a room](https://noisee.netlify.app/room/1337). Everyone connects a microphone, then sees their noise combined with everyone elses noise. 

Watch me rock it solo 🤘🏻💀 it's fun, and weird.

![](f_auto,q_auto/argyleink/noisee-walkthrough.mp4 "Title $$width:1920,height:1082")

You can be soft, loud, or connect a [Megaman Pocket Operator](https://teenage.engineering/store/po-128-mega-man/) like a nerd.

[![](w_800/argyleink/noisee-po-128.png "Me holding a pocket operator in the stream. $$width:225,height:127")](https://youtu.be/tSfSY3Ni3X0?t=3486)

I got to hang out [**in studio**](https://www.learnwithjason.dev/learn-with-jason-live-live-the-css-stravaganza) with [Jason Lengstorf](https://www.learnwithjason.dev/) to share the tech, and CSS, that power the app.

<div style="display: flex; flex-flow: row wrap;">
  <picture>
    <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.webp" type="image/webp">
    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.gif" alt="✨" width="100" height="100">
  </picture>
  <picture>
    <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f913/512.webp" type="image/webp">
    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f913/512.gif" alt="🤓" width="100" height="100">
  </picture>
  <picture>
    <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f913/512.webp" type="image/webp">
    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f913/512.gif" alt="🤓" width="100" height="100">
  </picture>
  <picture>
    <source srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.webp" type="image/webp">
    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.gif" alt="✨" width="100" height="100">
  </picture>
</div>

[![](https://www.learnwithjason.dev/learn-with-jason-live-live-the-css-stravaganza/w_2560/video-poster.jpg "Title $$width:2560,height:1440")](https://www.youtube.com/watch?v=tSfSY3Ni3X0)

[Binge on YouTube](https://www.youtube.com/watch?v=tSfSY3Ni3X0).

<small>See if you can find the 4 easer eggs in the app without watching the video 😈</small>

## The idea

When Jason and I brewed up this in person shindig, I wanted to have a punky moment with him, like play electric guitar. Which we did!

![](w_640/argyleink/noisee-stairway-to-heaven.png "Title $$width:640,height:360")

I also wanted it to be somethin weird, connected, and expressive. 

**How about audio over [PartyKit](https://www.partykit.io/), visualised with gradients‽**

Rad.

## Stream.start()

I came prepared with some process artifacts to help folks see the dots I connected with web tech.

The [first artifact/demo](https://codepen.io/argyleink/pen/bGZaXXq) is an introduction to [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/@property). 

![](https://codepen.io/argyleink/embed/preview/bGZaXXq)

It delightfully derailed into details about CSS [`@layer`](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) and [System Colors](https://drafts.csswg.org/css-color/#css-system-colors) like `Highlight` and `Canvas`. 

[![](w_1280/argyleink/noisee-at-property.png "Title $$width:1280,height:720")](https://youtu.be/tSfSY3Ni3X0?t=700)

But also took a trip down memory lane for an early JS feature:

```html
<button id="yo">…</button>
```

```js
yo.onclick = …
```

No `document.querySelector()` needed, **element ID's are on the `window` object**. Woot woot.

I love it for demos.

## Finally a gradient demo

Once we'd ramped up on `@property` and kickflipped off it, I had another demo ready, this one on how the gradient reacting to audio would work. 

In classic argyleink fashion, I use the gradient [transition hint](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#color-hint) to control a hard line gradient.

```css
html {
  transition: --size 1s var(--ease-spring-4);
  background-image: radial-gradient(
    circle at center, 
    black 0, 
    var(--size), 
    white 0
  );
}
```

Hook that hint up to a range input, add some springyness for flare, and you got yourself an animated hard line gradient. Ready for a brutalist experiment, or a mask if you so fancy!

![](f_auto,q_auto/argyleink/noisee-slider.mp4 "Title $$width:1024,height:578")

[Try it for yourself](https://codepen.io/argyleink/pen/vYPdBOO) if you like!

If you're interested in gradient transition hints, Jason and I visualize it on [gradient.style](https://gradient.style). I show him how to make a radial gradient, 0 out the stop positions, then [adjust the transition hint](https://gradient.style/#type=radial&space=oklab&radial_shape=circle&radial_position=%7B%22x%22%3A50%2C%22y%22%3A50%7D&radial_named_position=center&radial_size=farthest-corner&stops=%7B%22kind%22%3A%22stop%22%2C%22color%22%3A%22oklch%2870%25+0.5+340%29%22%2C%22auto%22%3A%220%22%2C%22position1%22%3A%220%22%2C%22position2%22%3A%220%22%7D&stops=%7B%22kind%22%3A%22hint%22%2C%22auto%22%3A%2250%22%2C%22percentage%22%3A64%7D&stops=%7B%22kind%22%3A%22stop%22%2C%22color%22%3A%22%230000%22%2C%22auto%22%3A%22100%22%2C%22position1%22%3A0%2C%22position2%22%3A%22100%22%7D).

[![](w_1280/argyleink/noisee-gradient-style.png "Title $$width:1280,height:720")](https://youtu.be/tSfSY3Ni3X0?t=2550)

## Connecting audio streams to CSS

The next prototype is all about hooking up transition hints to audio streams. The UX here requires a few steps:

1. Asking for mic access
1. Choosing a mic (optional, a default will be chosen)
1. Making some noise

Javascript asks for the user's mic permission with:

```js
await navigator.mediaDevices
  .getUserMedia({
    audio: {
      autoGainControl: false,
      latency: 0
    }
  })
```

Then I create an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) to interface with the streaming audio:

```js
state.stream.audio = new AudioContext()
```

Then I do some fancy work to filter out a highpass and lowpass subset of stream data. This let's me have two pieces per person to use as fun data. 

I then read values from the mic stream audio context at the animation framerate:

```js
requestAnimationFrame(readMicStream)
```

Eventually I derive a lowpass low number and a highpass high number, and set the custom properties. This also means I no longer need to transition the `@property` because I'm now setting values with [rAF](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame).

```js
html.style.setProperty('--frequency-low', low.value +'%')
html.style.setProperty('--frequency-high', high.value +'%')
```

Since the demo needs HTML5 mic access, open [this debug link](https://cdpn.io/pen/debug/BabQazP) and give the basic demo a try. Or [watch Jason and I give the demo a whirl](https://youtu.be/tSfSY3Ni3X0?t=2850).

[![](w_1280/argyleink/noisee-audio-test.png "Title $$width:3020,height:1356")](https://youtu.be/tSfSY3Ni3X0?t=2865)

## Go live while live streaming

With that proof of concept demo, I took it and ran. Spent a week or so making a sweet app that connected your mic created gradients with other people. 

[![](w_1280/argyleink/noisee-release.png "Title $$width:1540,height:922")](https://youtu.be/tSfSY3Ni3X0?t=3409)

Jason and I make the deployment URL official and sent it to the folks on the live stream. Def a highlight moment of the stream. [Tune into the recording](https://youtu.be/tSfSY3Ni3X0?t=3409), see the chaos that ensues!

![](w_1280/argyleink/noisee-chaos.png "Title $$width:2050,height:968")

[We go on](https://youtu.be/tSfSY3Ni3X0?t=3614) to discuss [Svelte](https://kit.svelte.dev/) and [PartyKit](https://partykit.dev/), diving into the [code on GitHub](https://github.com/learnwithjason/noisee).

## Four easter eggs

Can you find the 4 easter eggs without [watching us find them on video](https://youtu.be/tSfSY3Ni3X0?t=4083)?

1. Life after death
1. Turquoise
1. Give it the time of day
1. Take me with you

I had **such a blast** hangin out with Jason; and I'm happy to share *we may have shot some more video* while I was there… so maybe there's more to come!

[![](w_800/argyleink/noisee.png "Title $$width:2944,height:1010")](https://noisee.netlify.app)

Links and resources:

- https://www.learnwithjason.dev
- https://www.youtube.com/@learnwithjason
- https://www.twitch.tv/jlengstorf
- https://developer.mozilla.org/en-US/docs/Web/CSS/@property
- https://open-props.style
- https://www.learnwithjason.dev/build-custom-interfaces-using-css-open-props/
- https://gradient.style
- https://mdn.io/audiocontext
- https://kit.svelte.dev
- https://github.com/learnwithjason/noisee/tree/main
- https://developer.mozilla.org/en-US/docs/Web/CSS/system-color
- https://www.youtube.com/live/tSfSY3Ni3X0?si=3e7bYhuTrAOCQOI8