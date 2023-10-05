---
type: note
persona: guichallenges
published_at: 2023-10-05T03:54:11.764
media:
  - src: argyleink/gui-relative-color.jpg
    alt: Avatar is shown next to a syntax breakdown visual of css relative color syntax
    width: 1280
    height: 720
tags: 
  - media
  - css
---

[Thinking on ways to solve **relative color**](https://www.youtube.com/watch?v=1z_ViBjdnSw)

In this [GUI Challenge](https://goo.gle/GUIchallenges), 
[I](https://www.youtube.com/channel/UCBGr3ZMcV5jke40_Wrv3fNA) show you how to use CSS <abbr>RCS</abbr> (relative color syntax) for lightening, desaturating, opacity, grayscale and more.

```css
oklch(from hotpink calc(l - 20) c h)
hsl(from hotpink h calc(s / 2) l)
hsl(from hotpink h s l / 50%)
hsl(from hotpink h none l)
```

[demo](https://gui-challenges.web.app/relative-colors/dist/) · 
[source](https://github.com/argyleink/gui-challenges)

There might be one or two <abbr>RCS</abbr> features you didn't know 🤓