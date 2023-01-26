---
type: blog
persona: argyleink
title: 10 powerful ways to use CSS variables
published_at: 2023-01-26T18:40:29.096
snippet: |
  Tokens, house props, adaptive props, pseudo-private props, partial props, mixin props, swappy props, style query props, meta lang props and typed props. Oh my!
hero:
  src: argyleink/css-prop-categories.png
  alt: Three custom properties are repeated in a grid and 3D tilted a bit. They are var(--party) var(--power) and var(--mix).
  width: 1280
  height: 421
tags: 
  - css
---

CSS [custom properties](https://web.dev/learn/css/functions/#custom-properties-and-var) are AMAZING. I'm going to attempt to name and roundup all the categories and strategies of custom props that I've come across. 

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

[Open Props](https://open-props.style) offers `--surface-{1-4}` and `--text-{1,2}` house props (which adapt to light & dark). They come with use of [normalize.css](https://codepen.io/argyleink/pen/KKvRORE). A light and dark card can be created with a mix of house props and tokens, no media query required as it's baked into the prop:

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

Lastly, since media queries aren't required to make this adaptive props, [here's a neat trick](https://ishadeed.com/article/conditional-border-radius/) by [Ahmad Shadeed](https://twitter.com/shadeed9) that bakes the conditions into the math inside the prop. He's got 1 custom property that will adapt to either square corners when full screen, or rounded corners when not.

```css
.card {
   border-radius: max(0px, min(8px, calc((100vw - 4px - 100%) * 9999)));
}
```

Open Props [offers these](https://github.com/argyleink/open-props/blob/main/src/props.borders.css#L19-L24) now too, heavily inspired by Ahmad. They look like this in Open Props, which will have a `var(--radius-2)` sized rounded corners when it's not full width:

```css
/* Open Props sets them up like this */
:root {
  --radius-conditional-2: clamp(0px, calc(100vw - 100%) * 1e5, var(--radius-2));
}

/* then authors get to use them like this! */
.card {
  border-radius: var(--radius-conditional-2);
}
```

**Love it** when a custom property disguises all the implentation details away from other authors. Reminds me of NPM and installing modules or importing functions.

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
    powderblue 20%, 
    pink 20% 40%, 
    white 40% 60%, 
    pink 60% 80%, 
    powderblue 80%
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
  --stripes-angle: to bottom right;
}
```

[Snippet source](https://codepen.io/smashingmag/pen/ZdXMJx)

## 7. swap props

These props **flip n' flop so other props can swap**. Hehe, a simple example is a bool prop:

```css
.house-button {
  --_hover: 0;

  &:hover {
    --_hover: 1;
  }
}
```

How can I use this? Ask [Jhey](https://jhey.dev/), he's got plenty-o-demo's with bool swappin props. Like [this one](https://codepen.io/jh3y/pen/NWBdbRP) which includes the swap prop `--active`:

```css
a:is(:hover, :focus) {
  --active: 1;
}

:is(svg, .char) {
  transform:
    rotate(calc((var(--active, 0) * var(--r, 0)) * 1deg))
    translate(
      calc((var(--active, 0) * var(--x, 0)) * 1%),
      calc((var(--active, 0) * var(--y, 0)) * 1%)
    );
}
```

This one only transforms if `--active` is 1, because otherwise the 0 causes the math to be 0 degrees. Swappin props between 0 and 1, ugh, power.

He goes further in this [light/dark theme demo switch](https://codepen.io/jh3y/pen/poLBvgO), pivoting a color scheme and animations. Rad stuff.

![](https://codepen.io/argyleink/embed/preview/poLBvgO)

And you can't miss [Ana Tudor](https://twitter.com/anatudor)'s post on [Dry Switching with CSS Variables](https://css-tricks.com/dry-switching-with-css-variables-the-difference-of-one-declaration/). This was the first place I ever saw props used as bools to pivot behavior and UI.

There's also [Jane Ori](https://mobile.twitter.com/jane0ri) who's made many games and intense systems out of Dry Switching / swappy props: [CSS Sweeper](https://github.com/propjockey/css-sweeper), [CSS Conways Game of Life](https://github.com/propjockey/css-conways-game-of-life), and [more](https://github.com/propjockey). They've even got this wild library called [CSS Media Vars](https://github.com/propjockey/css-media-vars) which enable responsive design with named breakpoints and props, it's very cool.  

Also, there's a sweet [PostCSS](https://postcss.org/) plugin from [@CSStools](https://github.com/csstools) called [conditional values](https://www.npmjs.com/package/@csstools/postcss-conditional-values) that gives some syntactic sugar to this:

```css
.fancy-container {
	--is-fancy: true;
}

.block {
	color: csstools-if(--is-fancy pink else red);
}

/* becomes */
:root {
	--is-fancy:  ;
}

.fancy-container {
	--is-fancy: initial;
}

.block {
	--is-fancy--0: var(--is-fancy) red;
	color: var(--is-fancy--0,pink);
}
```

## 8. style query props

**Container query props!** Could be used as enums for theming, state machines, you name it. 

Here's the gist:

```css
button {
  @container style(--vibe: primary) {
    --_bg: var(--indigo-5);
    --_border: var(--indigo-4);
  }
  
  @container style(--vibe: rad) {
    --_bg: var(--gradient-11);
    border: none;
  }
  
  @container style(--size: large) {
    font-size: var(--font-size-4);
  }
}
```

[Try this](https://codepen.io/argyleink/pen/ZEjoaOv) snippet in [Canary](https://www.google.com/chrome/canary/) on Codepen!

[Manuel Matuzović](https://www.matuzo.at/about-me/) has been writing about it with a post on how [style queries work on computed custom property values](https://www.matuzo.at/blog/2023/100daysof-day83/) and how using [@property can help with style queries](https://www.matuzo.at/blog/2023/100daysof-day85/).

## 9. meta lang props

**Make your own CSS API**, in CSS! Mixins are the primary key but other strategies from this post are helpful.

Me using a quick one we'll make:

```css
.button {
  --bg: blue;
  --text-color: white;
}
```

Setting up this means setting the actual css property `color` with your new name for it `text`.

```css
* {
  background-color: var(--bg);
  color: var(--text);
}
```

There, you just created an interface into an interface. These custom properties pass through to the actual CSS property.

So, that was a pretty tame example. Here's one where I'm adding a new property that matches both padding and gaps.

```css
* {
  padding: var(--gapadding);
  gap: var(--gapadding);
}

.card {
  --gapadding: 1rem;
}
```

Here's a wild example! It's not real, but I'm pretty sure this could all be setup.

```css
.button {
  --_type: 3d-primary;
  --_accent: var(--neon-purple);
  --_accent-hover: var(--neon-pink);
  --_3d-depth-level: 2;
  --_particles: 20;
}
```

## 10. typed props

[`@property`](https://web.dev/at-property/) is another really cool custom property category of usage. These provide **type safety** and can **assist browsers in knowing your animation** intents.

```css
@property --focal-size {
  syntax: '<length-percentage>';
  initial-value: 100%;
  inherits: false;
}
```

That definition of `--focal-size` is enough to teach some browsers how to animate a gradient used into a mask. Hold alt/opt inside the codepen below, it'll transition if you are in a browser with `@property`.

![](https://codepen.io/argyleink/embed/preview/rNwWwor)

## Conclusion

Between mixins, `@property`, scoping tricks, and style queries… There still a lot of unexplored territory here and tons of power 😉

**Did I miss a category‽**