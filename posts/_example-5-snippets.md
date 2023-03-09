---
type: blog
persona: admin
title: 6 CSS snippets everyone should know in 2023
published_at: 2022-11-26
snippet: This is an excerpt of my first blog post.
hero:
  src: argyleink/skull-card.png
  alt: Text emphasized alt text example
  width: 1366
  height: 768
tags: 
  - css
---

Front-end in your role in any way, then these are probably your favorite snippets for 2023 too.

## 1. a container query

```css
.panel {
  container: layers-panel / inline-size;
}

.card {
  padding: 1rem;
}

@container layers-panel (min-width: 20rem) {
  .card {
    padding: 2rem;
  }
}
```

## 2. scroll snap

```css
.snaps {
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
}

.snap-target {
  scroll-snap-align: center;
}

.snap-force-stop {
  scroll-snap-stop: always;
}
```

## 3. grid pile

```css
.pile {
  display: grid;
  place-content: center;

  > * {
    grid-area: 1/1;
  }
} 
```

## 4. quick circle

```css
.circle {
  inline-size: 25ch;
  aspect-ratio: 1;
  border-radius: 50%;
}
```

## 5. @layer

```css
/* file buttons.css */
@layer components.buttons {
  .btn.primary {
    …
  }
}
```

then from a totally different file, append to that layer a variant.

```css
/* file video-player.css */
@layer components.buttons {
  .btn.player-icon-btn {
    …
  }
}
```

## 6. padding-inline, margin-inline, inset-inline


```css
button {
  padding-inline: 2ch;
  padding-block: 1ch;
}

article > p {
  margin-block: 2ch;
}

.something::before {
  inset-inline: auto 0; /* end of the reading line */
}
```

<!-- ![](w_400/argyleink/gui-skull.png "Title $$width:400,height:411")

![](https://media1.giphy.com/media/b0HYKHINjL32qEsoJt/giphy.gif?cid=ecf05e470xzt877ojokmkub40d6kk0paaufim6fm41294pjd&rid=giphy.gif&ct=g)

![](https://codepen.io/argyleink/embed/preview/YzveomK)

![](f_auto,q_auto/argyleink/media-ranges-looper.mp4 "Title $$width:2366,height:1080")

 -->