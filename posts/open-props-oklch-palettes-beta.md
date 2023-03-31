---
type: blog
persona: argyleink
title: Open Props okLCH beta
published_at: 2023-03-31T06:29:59.610
snippet: 360 palettes for the price of one.
hero:
  src: argyleink/oklch-palette.png
  alt: Text emphasized alt text example
  width: 3024
  height: 1728
tags: 
  - css
---

Set a hue with a nice [named prop](#named-hues) or any [angle](https://developer.mozilla.org/en-US/docs/Web/CSS/angle), get back a **15 shade palette**.

```css
* {
  --color-hue: var(--hue-indigo);
}
```

**Boom.**  
Now `var(--color-0)` to `var(--color-15)` are indigo.

![](w_400/argyleink/indigo-palette.png "Title $$width:2346,height:382")

```css
* {
  --color-hue: 2rad;
}
```

## What to try

You don't even need any other [Open Props](https://open-props.style/) to try this beta. Snag some props that attach to `*`, and starting customizing!

<q>You'll need a browser with oklch() support.</q>

### Color palettes

Import 17 **beta Open Props**:

```css
@import "https://unpkg.com/open-props/colors-oklch.min.css";
```

Then set the hue for the palette:

```css
* {
  --color-hue: 90deg;
}
```

And build something rad. 

You now have all these available to you, with `0` as the lightest, `15` as the darkest, and `bright` as the high vibrancy palette puncher color.

```css
.dark-card {
  background: var(--color-15);
  color: var(--color-1);
  border-color: var(--color-14);
  border-top-color: var(--color-bright);
  box-shadow: var(--shadow-3);
}
```

## Named hues

Here's each of the [named props](#named-hues) in one nice preview. These make it convenient to [try out some themes for](#surface-and-text-tinting) your design.

```css
@import "https://unpkg.com/open-props/oklch-hues.min.css";
```

Which gives you named **beta hues** like this:

```css
* {
  --color-hue: var(--hue-pink);
}
```

These are handy because `oklch` has a slightly different hue angle setup than the others, so you can't just straight transfer from `hsl` or `hwb`. Yerp.

![](w_400/argyleink/oklch-palette.png "Title $$width:3024,height:1728")

See it in *your* browser here

![](https://codepen.io/argyleink/embed/preview/abarGpJ)

### Gray palettes

Grab the **beta props**:

```css
@import "https://unpkg.com/open-props/gray-oklch.min.css";
```

Without any customization, it's this neutral set:

![](w_400/argyleink/neutral-palette.png "Title $$width:2344,height:382")

**BUUUUUTTTT**  
tint them:

**Cool:**

```css
.gray-cool { 
  --gray-hue: 270; 
  --gray-chroma: .02;
}
```

![](w_400/argyleink/cool-palette.png "Title $$width:2346,height:382")

**or stone:**

```css
.gray-warm { 
  --gray-hue: 50; 
  --gray-chroma: .01;
}
```

![](w_400/argyleink/stone-palette.png "Title $$width:2344,height:380")

with just a few lines of CSS!

## Surface and text tinting

The Open Props [normalize](https://codepen.io/argyleink/pen/KKvRORE) has 4 surface colors and 2 text colors that are based on the current gray palette. You can easily tint your whole design now if you used them! 

Here's me doing it to an old demo. 

![](f_auto,q_auto/argyleink/oklch-android-palette.mp4 "Title $$width:1510,height:1132")

I'm just in devtools just changing the `hue` and `chroma` with the keyboard 🤓

```css
* {
  --gray-hue: 50deg;
  --gray-chroma: .05;
}
```

Check it out here:

![](https://codepen.io/argyleink/embed/preview/OJoYwgx)


## Lemme know!

Yellow does not generate well.. so hopefully that's not your brand color. Still trying to figure out the best way to make one-o-dem.

But yeah, you're otherwise **not stuck to a fixed set of palettes**. There's **no huge download** to just prototype. Just `oklch` kickin ass and chewin bubble gum. Though it's def funky under `10%` lightness.. and if chroma is high and lightness is `100%`, it might not be white like you'd think. 🤷 

Thoughts on this‽ 

Come hang out on the [Open Props Discord](https://discord.gg/AqA4fU886r).
