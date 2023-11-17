---
type: blog
persona: argyleink
title: Custom range input progress fill
published_at: 2023-11-17T06:26:56.332Z
snippet: Thanks to Roman Komarov's fork, I hoped for a CSS only solution to filling a range input's progress style with a gradient.
hero:
  src: argyleink/range-with-view-timeline.png
  alt: A slider input half filled with a vibrant gradient.
  width: 1930
  height: 356
tags: 
  - css
---

Roman Komarov forked a demo of mine the other day and showed how CSS [scroll driven animation](https://scroll-driven-animations.style) could map the `input[type=range]` slider's thumb pseudo element position and use it to power a percentage in a gradient mask. 

Roman explains it all very well [here on their blog](https://blog.kizu.dev/input-range-thumb/).

![](https://codepen.io/argyleink/embed/preview/RwvLBqM)

It's **super rad**. And totally triggered 2 ideas…

## FORK THE FORK!!!

The first idea I was able to finish tonight, and the 2nd I'll do sometime soon. *Ssssecretssss*

Here's my fork of their fork, repurposed their mapping to power the fill of a range slider. A task that's not so easy.

![](https://codepen.io/argyleink/embed/preview/vYbpNVm)

I left a good chunk of comments in there!

While this may not have great support at the moment, and is quite a little web of CSS to setup… it's a very promising path forward for styling `input[type=range]` and **other components with moveable parts**. 

I'll be stashing this into my CSS tricks 🪦