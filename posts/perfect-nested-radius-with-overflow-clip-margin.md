---
type: blog
persona: argyleink
title: A use case for CSS overflow-clip-margin, nested border radii
published_at: 2023-03-07T04:25:16.399
snippet: An alternative solution for <b>nested border radius</b> that clips the content-box.
hero:
  src: argyleink/nested-border-radius.png
  alt: Text emphasized alt text example
  width: 2976
  height: 1124
tags: 
  - css
---

With a [mega viral tweet](https://twitter.com/lilykonings/status/1567317037126680576) on nesting border radii and [Andy mentioning it as well](https://twitter.com/piccalilli_/status/1630889802059874310), I felt I should blog about my thoughts real quick! Here's one of the things I learned after [requesting CSS get a nice way to draw nested radii](https://github.com/w3c/csswg-drafts/issues/7707):

```css
.the-trick-tldr {
  overflow: clip;
  overflow-clip-margin: content-box;
}
```

If you're like me, you saw that and said…

![](https://media.giphy.com/media/kc0kqKNFu7v35gPkwB/giphy.gif)

## The prob

**Nested border curves.**

When you've got a rounded card with a rounded button inside, or a rounded footer inside a rounded section, you may not have noticed, but there's a wobble in there.

See the nested radii on the left here 🙈,  
vs the radii on the right ✅:

![](https://user-images.githubusercontent.com/1134620/188928131-74bfa790-f31d-49c8-95b9-5567af367b51.png "Corners compared, one is clearly concentric $$width:384,height:264")

Click those tweets or read [the CSSWG proposal](https://github.com/w3c/csswg-drafts/issues/7707) for more about the problem space and calculations for solutions.

## Using overflow-clip-margin to solve it

In the comments of the CSSWG issue, [Oriol Brufau](https://github.com/Loirooriol) politely [mentions](https://github.com/w3c/csswg-drafts/issues/7707#issuecomment-1239884828) using [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) on the `content-box` with [`overflow-clip-margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin). And it works great, but [Caniuse](https://caniuse.com/mdn-css_properties_overflow-clip-margin) shows you how it's not really viable yet:

![](argyleink/overflow-clip-margin.png "Alt $$width:2276,height:504")

tldr;
- No Safari
- Firefox doesn't support the `content-box` value
- … Chrome only.

## Try yourself

Here's [a Codepen](https://codepen.io/argyleink/embed/preview/mdGMqOJ) where I show the problem space and offer a custom property and `overflow-clip-margin` solution, for testing and comparing.

![](https://codepen.io/argyleink/embed/preview/mdGMqOJ)

It's totally worth opening in a tab in Chrome and inspecting that card for it's funky coo `content-box` `overflow: clip` solution, and kickin the tires 🤓
