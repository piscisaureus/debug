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
These custom properties are **generally just global values**, named objectively, and are used atomically.

They create team alignment by naming what are otherwise "magic numbers." They often follow naming conventions.

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

**Usage of tokens** looks like:

```css
.card {
  background: var(--surface-1);
  color: var(--text-1);
  padding: var(--card-padding);
}
```

It's very likely these tokens will become values of other custom properties in your CSS because they **are generally static and aren't overwritten later.**.

```js
OpenProps === tokens
```

## 2. house props

House props are **named for project reusability**. They also create team alignment, jargon, and can be adaptive (see [#3](#3.-adaptive-props)).

```css
:root {
  --brand: var(--blue-1);
  --card-padding: var(--size-1);
  --surface: #eee;

  @media (prefers-color-scheme: dark) {
    --surface: #111;  
  }
}
```

**Usage of house props** looks like:

```css
.card {
  border-color: var(--brand);
  padding: var(--card-padding);
  background: var(--surface);
}
```

[Open Props](https://open-props.style) offers `--surface-{1-4}` and `--text-{1,2}` house props (which adapt to light & dark). They come with use of [normalize.css](https://codepen.io/argyleink/pen/KKvRORE). A light and dark card can be created with a mix of house props and tokens:

```css
.card {
  background: var(--surface-2); /* surface-1 is the page bg */
  color: var(--text-1);
  border-radius: var(--radius-2);
  padding: var(--size-3);
  box-shadow: var(--shadow-2);
}
```

## 3. adaptive props

Aka dynamic house props; **these will change**, you expect them to change. They need setup though, orchestrated and empowered with CSS conditionals.

```css
:root {
  --text: var(--gray-0);
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: var(--gray-10);
  }
}
```

**Usage of adaptive props** looks like:

```css
body {
  color: var(--text);
}
```

I've got a tinyyyy bit more verbose pattern for adaptive props; create static house props with names that make their usage obvious (no magic values).

```css
:root {
  /* 2 static props */
  --text-dark-mode: var(--gray-0);
  --text-light-mode: var(--gray-10);

  /* 1 adaptive prop: defaults to light static prop */
  --text: var(--text-light-mode);

  @media (prefers-color-scheme: dark) {
    /* adaptive prop set to dark static prop */
    --text: var(--text-dark-mode);
  }
}
```

Here's another example; **adaptive sizing**

```css
:root {
  --adaptive-padding: .5rem;

  @media (width >= 320px)  { --adaptive-padding: 1rem }
  @media (width >= 720px)  { --adaptive-padding: 1.25rem }
  @media (width >= 1024px) { --adaptive-padding: 1.5rem }
}
```

## 4. pseudo-private props

[Lea Verou calls these pseudo-private custom properties](https://lea.verou.me/2021/10/custom-properties-with-defaults/). I appreciated the throw back to pseudo private properties in Javascript.

```js
this._foo = 'please dont change this'
```

Then us mimmicking it in CSS:

```css
.card {
  --_radius: 10px;
}
```

Which makes them like **static tokens** or **house props**, but **scoped instead of global**. 

[Vanilla Extract](https://vanilla-extract.style) offers scoped custom properties, they use this "pseudo-private" technique in the CSS output.

```css
.button__1qipc2y2 {
  --_1qipc2y0: #4263eb;
  --_1qipc2y1: #edf2ff;
  background-color: var(--_1qipc2y0);
  color: var(--_1qipc2y1);
}

.button__1qipc2y2:active {
  --_1qipc2y0: #3b5bdb;
  --_1qipc2y1: white;
}
```

[A tweet about this.](https://twitter.com/argyleink/status/1559408336851742720?s=20&t=vz9YNAbMi6zlcLjaBDtaKQ)

## 5. partial props
Prop puzzle pieces. **Parts of a full usable prop**. Here, brand color channels as partial props.

```css
:root {
  --h: 200;
  --s: 50%;
  --l: 50%;
}
```

**Usage of partial props** to make [adaptive props](#3.-adaptive-props) looks like:

```css
:root {
  --brand: hsl(var(--h) var(--s) var(--l));
  --text: hsl(var(--h) 30% 5%);
  --surface: hsl(var(--h) 25% 99%);
}

@media (prefers-color-scheme: dark) {
  :root {
    --brand: hsl(var(--h) calc(var(--s) / 2) calc(var(--l) / 2));
    --text: hsl(var(--h) 10% 90%);
    --surface: hsl(var(--h) 20% 10%);
  }
}
```

## 6. mixin props
I first saw this usage of CSS vars [on Smashing Magazine](https://www.smashingmagazine.com/2019/07/css-custom-properties-cascade/#custom-functions-and-parameters) by [Miriam Suzanne](https://www.oddbird.net/authors/miriam/). Great distillation of it in this [Codepen](https://codepen.io/miriamsuzanne/pen/BEvjbm).

I think of basic mixin props as a collection of [partial props](#5.-partial-props) placed on shorthands (`background-image`, `border`, `border-image`, `mask-image`, etc) . This makes the partial props like params into a greater "mixin" prop, function thing.

```css
* {
  --input-1: 1px;
  --input-2: var(--blue-5);
  --border-mixin: var(--input-1) solid var(--input-2);
}
```

**Usage of basic mixin props** looks like:

```css
.card {
  border: var(--border-mixin);
}

.card.variant {
  --input-2: var(--purple-5);
}
```

[Mia](https://www.oddbird.net/authors/miriam/) adds a nice hook feature by setting "required" prop parameters to `initial`. Then, any element that specifies this required prop, triggers the mixin to be valid, applying its effect.

```css
* {
  /* define the mixin with a required parameter */
  --stripes: linear-gradient(
    var(--stripes-angle),
    powderblue 20%, pink 20% 40%, white 40% 60%, pink 60% 80%, powderblue 80%
  );

  /* reset the required parameter on each element */
  --stripes-angle: initial;  
  
  /* apply the results everywhere */
  /* (will only display when a valid angle is given) */
  background-image: var(--stripes);
}
```

**Usage of mixin props** looks like:

```css
.stripes {
  /* providing a valid angle causes the "mixin" to work */
  --stripes-angle: 35deg;
}
```

[Snippet source](https://codepen.io/smashingmag/pen/ZdXMJx)

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

