---
type: blog
persona: argyleink
title: Custom property categories
published_at: 2023-11-26
snippet: |
  CSS custom property tokens vs house vs adaptive vs private vs fragments
hero:
  src: argyleink/skull-card.png
  alt: Text emphasized alt text example
  width: 1366
  height: 768
tags: 
  - css
---

CSS [custom properties](https://web.dev/learn/css/functions/#custom-properties-and-var) are amazing. I'm going to attempt to name the categories of custom props that I've come across. 

<q class="info">be sure to comment if you know more strategies!</q>

## 1. tokens
These custom properties are generally just values, named objectively, and are used atomically.

```css
:root {
  --size-1: 1rem;
  --size-2: 1.25rem;
  --blue-1: hsl(200 50% 50%);
  --blue-2: hsl(200 50% 60%);
  --gray-0: hsl(none none 90%);
  --gray-1: hsl(none none 10%);
}
```

It's very likely these tokens will become values of other custom properties in your CSS because they **are generally static / won't change**.

## 2. house props

House, or team, props which are **applications of static tokens for named use** within the system. 

```css
:root {
  --brand: var(--blue-1);
  --card-padding: var(--size-1);
}
```

[Open Props](https://open-props.style) offers `--surface-{1-4}` and `--text-{1,2}` house props in the [normalize](https://codepen.io/argyleink/pen/KKvRORE) stylesheet. They're more of less aliases to the gray tokens. 

Usage of house props looks like this:

```css
.card {
  background: var(--surface-1);
  color: var(--text-1);
  padding: var(--card-padding);
}
```

## 3. adaptive props

Aka dynamic props; these props will be changed. Once setup for authors, they're very powerful.

Here `--text` is changed within a media query, **becoming a light and dark adaptive custom property**.

```css
/* creation */
:root {
  --text: var(--gray-0);
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: var(--gray-1);
  }
}

/* usage */
body {
  color: var(--text);
}
```

I've developed a more verbose pattern for adaptive props that I find scaled easier and is a bit more self explanatory when authoring and debugging.

```css
:root {
  /* 2 new static props */
  --text-dark-mode: var(--gray-0);
  --text-light-mode: var(--gray-1);

  /* light theme by default */
  --text: var(--text-light-mode);
}

@media (prefers-color-scheme: dark) {
  :root {
    /* dark mode applies dark static prop */
    --text: var(--text-dark-mode);
  }
}
```

Here's another example, this one of **adaptive sizing**:

```css
:root {
  --adaptive-padding: .5rem;

  @media (width >= 320px)  { --adaptive-padding: 1rem }
  @media (width >= 720px)  { --adaptive-padding: 1.25rem }
  @media (width >= 1024px) { --adaptive-padding: 1.5rem }
}
```

## 4. private props

[Lea Verou calls these pseudo-private custom properties](https://lea.verou.me/2021/10/custom-properties-with-defaults/). I appreciated the throw back to pseudo private properties in Javascript.

```js
this._foo = 'some attempt at marking private props'
```

Then us mimmicking it in CSS:

```css
.card {
  --_radius: 10px;
}
```

## 5. partial props

```css
:root {
  --h: 200;
  --s: 50%;
  --l: 50%;

  --color: hsl(var(--h) var(--s) var(--l));
}
```

## 6. mixin props

```css
.scope {
  --input-1: 10px;
  --input-2: var(--blue-1);
  --border-mixin: var(--input-1) solid var(--input-2);

  border: var(--border-mixin);
}
```

## 7. swap props

```css
.house-button {
  --_hover: 0;

  &:hover {
    --_hover: 1;
  }
}
```

## 8. meta lang props

```css
.button {
  --bg: blue;
  --text-color: white;
  --logical-padding: 1rem;
}
```

```css
* {
  background-color: var(--bg);
  color: var(--text-color);
  padding-inline: var(--logical-padding);
  padding-block: var(--logical-padding);
}
```

```css
:root {
  /* design token */
  --blue-4: color(display-p3 0 0 1);

  /* house prop */
  --brand-blue: var(--blue-4);
}
```

This is at least how I distinguish them.

