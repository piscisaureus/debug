---
type: blog
persona: admin
title: A conic gradient diamond and okLCH
published_at: 2023-04-20T21:57:54.314
snippet: Two conic gradients, Open Props beta okLCH prop pack and a hue slider.
hero:
  src: argyleink/conic-diamond-header.png
  alt: Text emphasized alt text example
  width: 3510
  height: 1098
tags: 
  - css
---

You may recognize this diamond, it's certainly inspired by a classic icon: Sketch.

![](f_auto,q_auto/argyleink/conic-gradient-diamond.mp4 "Color changing conic gradient diamond $$width:1884,height:1884")

## Effect breakdown

Not sure how much this sketch will help y'all, but it totally helped me:

![](w_400/argyleink/conic-diamond-sketch.png "Sketch of the two conic gradients overlaying the diamond $$width:2442,height:2442")

Two specifically placed conic gradients show as two circles. The bottom one uses transparency to achieve the triangle effect. The top one is simpler but required a `clip-path` to notch the corners.

I also used [transition hints](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient#:~:text=An%20interpolation%20hint,two%20color%20stops.) to manage the hard stops. I think most people prefer to use double stop syntax for this, but I've really come to love transition hints.

## It's not perfect

There's a few magic numbers in there. It is responsive and holds it's fidelity, but there's definitely a better way to make this where it's less magic and more geometric. I also think it turned out a little tall.

![](https://codepen.io/argyleink/embed/preview/VwEKJjJ)

## The colors

I used [the okLCH palettes beta from Open Props](open-props-oklch-palettes-beta) for the colors. I knew they'd have all the shades I needed and I also [already had a slider demo](https://codepen.io/argyleink/pen/JjmRbvZ) that let you play with changing the hue. Put it all together on top of this diamond, easy peasy!

## Closing thoughts

I used my recently announced beta tool [gradient.style](https://gradient.style) to prototype the positions of the conic gradient. [Here is a link to the prototype gradient](https://gradient.style/#type=conic&space=oklab&conic_angle=327&conic_position=%7B%22x%22%3Anull%2C%22y%22%3Anull%7D&conic_named_position=center&stops=%7B%22kind%22%3A%22stop%22%2C%22color%22%3A%22oklch%2870%25+0.5+340%29%22%2C%22auto%22%3A0%2C%22position1%22%3A0%2C%22position2%22%3A0%7D&stops=%7B%22kind%22%3A%22hint%22%2C%22auto%22%3A17%2C%22percentage%22%3A6%7D&stops=%7B%22kind%22%3A%22stop%22%2C%22color%22%3A%22oklch%2850%25+0.5+340%29%22%2C%22auto%22%3A33%2C%22position1%22%3A0%2C%22position2%22%3A0%7D&stops=%7B%22kind%22%3A%22hint%22%2C%22percentage%22%3A12%2C%22auto%22%3A50%7D&stops=%7B%22kind%22%3A%22stop%22%2C%22color%22%3A%22oklch%2840%25+0.5+340%29%22%2C%22position1%22%3A0%2C%22position2%22%3A0%2C%22auto%22%3A66%7D&stops=%7B%22kind%22%3A%22hint%22%2C%22percentage%22%3A18%2C%22auto%22%3A83%7D&stops=%7B%22kind%22%3A%22stop%22%2C%22color%22%3A%22transparent%22%2C%22position1%22%3A0%2C%22position2%22%3A0%2C%22auto%22%3A100%7D) for the bottom half of the diamond. Hope this tool helps you learn as much as it's helped me!
