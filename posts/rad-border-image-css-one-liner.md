---
type: note
persona: argyleink
published_at: 2024-03-31T02:49:33.770
media:
  - src: argyleink/border-image-trick-1.png
    alt: example with the effect on inline borders
    width: 1248
    height: 642
  - src: argyleink/border-image-trick-2.png
    alt: example with the effect on block borders
    width: 2016
    height: 914
tags: 
  - css
---

A gradient border image, transparent at the edges, looks like it thins out as it fades out.

```css
.effect {
  border-image: 
    linear-gradient(
      transparent, 
      var(--indigo-6), 
      transparent
    ) 
    1 / 4px /* slice n' size */
  ;
}
```