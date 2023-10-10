---
type: note
persona: argyleink
published_at: 2023-10-10T15:21:32.904
media:
  - src: argyleink/cq-messages-pattern.png
    alt: ".Message {
  display: flex;
  
  @container Column (width < 40ch) {
    flex-direction: column;
    text-align: center;
  }
}"
    width: 1032
    height: 802
  - src: argyleink/cq-messages-landscape.png
    alt: 2 cards are shown, each with inline layouts
    width: 1004
    height: 448
  - src: argyleink/cq-messages-portrait.png
    alt: 2 cards are shown, each with block layouts and centered text
    width: 335
    height: 431
tags: 
  - css
---

`@Container` pattern  

✅ nice inline flex layout when there's room in it's `Column` container  

if not?  

✅ switch to a nice block layout and center the text

I like the `ch` unit for this since I'm wanting to switch based on available reading length for the text 🤓