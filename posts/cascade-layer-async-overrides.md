---
type: note
persona: argyleink
published_at: 2023-02-16T15:52:44.758
tags: 
  - css
---

This felt like a future of library customization:

```css
/* <tool-tip> styles */
@import "tool-tip.css" layer(components.tooltip);

/* later, in some-new-context.css */
@layer components.tooltip {
  .some-new-context tool-tip {
    --_bg: var(--surface-1);
    --_shadow-alpha: 15%;
  }
}
```

Scope the import, then append tweaks into that scope from anywhere. Safe and sound.

**Rad stuff.**