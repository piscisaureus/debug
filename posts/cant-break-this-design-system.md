---
type: blog
persona: argyleink
title: Type safe CSS design systems with @property
published_at: 2023-09-01T17:59:18.415
snippet: Fail safe, reliable, & deeply nestable.
hero:
  src: argyleink/at-property-typed.png
  alt: "@property --hue {
      syntax: '<angle>';
      initial-value: 5rad;
      inherits: true;
    }

    @property --surface {
      syntax: '<color>';
      initial-value: #333;
      inherits: true;
    }"
  width: 1744
  height: 936
tags: 
  - css
---

CSS [types](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types) are a worthy investment into [type safety](https://www.baeldung.com/cs/type-safety-programming#concept-of-type-safety) in your front-end work. We're still awaiting [cross browser interop](https://caniuse.com/mdn-css_at-rules_property), but we'll get there 🙂

In case you've never seen one, here's a typed CSS variable with [`@property`](https://developer.mozilla.org/en-US/docs/Web/CSS/@property):

```css
@property --focal-size {
  syntax: '<length-percentage>';
  initial-value: 100%;
  inherits: false;
}
```

Used that one so I could [animate a gradient mask image](https://codepen.io/argyleink/pen/rNwWwor). Pretty sweet.

Here's a preview of what CSS type safety can do, and what I'll be explaining:

![](f_auto,q_auto/argyleink/typed-adaptive-surfaces.mp4 "Title $$width:1920,height:1080")

## CSS type safety basics

When learning Rust or TypeScript, a great place is to start with the type primitives. In CSS, a few of those are:

<style>
  .types-list {
    display: flex;
    flex-flow: row wrap;
    gap: var(--size-3);

    & > .Tag {
      font-family: var(--font-mono);
      font-size: var(--font-size-3);
      text-transform: unset;
    }
  }
</style>

<div class="types-list">
  <span class="Tag">&#60;angle&#62;</span>
  <span class="Tag">&#60;length&#62;</span>
  <span class="Tag">&#60;percentage&#62;</span>
  <span class="Tag">&#60;length-percentage&#62;</span>
  <span class="Tag">&#60;number&#62;</span>
  <span class="Tag">&#60;integer&#62;</span>
  <span class="Tag">&#60;color&#62;</span>
  <span class="Tag">&#60;string&#62;</span>
  <span class="Tag">&#60;time&#62;</span>
  <span class="Tag">&#60;dimension&#62;</span>
  <span class="Tag">&#60;ratio&#62;</span>
  <span class="Tag">&#60;flex&#62;</span>
  <span class="Tag">&#60;frequency&#62;</span>
  <span class="Tag">&#60;resolution&#62;</span>
  <span class="Tag">&#60;image&#62;</span>
  <span class="Tag">&#60;position&#62;</span>
  <span class="Tag">&#60;hue&#62;</span>
  <span class="Tag">&#60;url&#62;</span>
  <span class="Tag">&#60;custom-ident&#62;</span>
</div>

<q class="info">
  <div>Full list <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types">on MDN</a></div>
</q>

Peep another typed prop definition:

```css
@property --hue {
  syntax: '<angle>';
  initial-value: .5turn;
  inherits: false;
}
```

Use it just like you always would `var(--hue)` and it'll be `.5turn`. **BUT**, try and set it to a value that doesn't match its type? Fails, value will still be `.5turn`. The custom property will not allow itself to be assigned a value that doesn't match it's type, always reverting to the last known good value.

```css
.card {
  --hue: 90deg; /* ✅ */
  --hue: #f00;  /* ❌ */
  background: oklch(98% .01 var(--hue));

  /* background will always resolve 👍🏻 */
  /* --hue resolves 90deg *.
}
```

**This is CSS type safety.** It doesn't crash the page, lock a thread, and unfortunately also won't tell you in any console that there's been an attempt to set the `--hue` prop to a `<color>` and not an `<angle>`. But I think some better custom property tooling could help 😏.

## Level 2

So far I defined a custom property as an `<angle>` and used it as a background. No property nesting.

Go **a level deeper** by making a custom property include another custom property. Here `--_bg` is an `<any>` kinda (because it's an untyped custom property at this point), with a nested custom property `--hue`:

```css
.card {
  --_bg: oklch(98% .01 var(--hue));
  background: var(--_bg);

  @media (prefers-color-scheme: dark) {
    --_bg: oklch(15% .1 var(--hue));
  }
}
```

You can go many levels deep, [but not too deep](https://twitter.com/argyleink/status/1421822270943731718?s=20). AND, you can type some or all of your variables. Next, we'll make some type safe 2-level deep custom properties.

<q>Sounds like Typescript and SCSS right? Incremental adoption for tighter systems.</q>

## Design systems relevance

Let's build a **typed light and dark adaptive color scheme** starter!

![](f_auto,q_auto/argyleink/typed-adaptive-surfaces.mp4 "Title $$width:1920,height:1080")

First, a type safe brand hue. I'll be making an `<input type=text>` element that will write to this value whatever we type in it. Since it's type safe, we'll see how other custom properties that depend on it, won't break if the value of `--hue` is set to "poots" or something.

```css
@property --hue {
  syntax: '<angle>';
  initial-value: 5rad;
  inherits: true;
}
```

For brevity, I'll only be setting up the surfaces of an adaptive color scheme, it'll provide plenty of insights into the process of typing a design system. 

Here's 3 surfaces, 1 to be the background of the page `--surface`, and 2 others that are intended to either be a surface on top of the page bg or under. Their initial value isn't an exciting, but we'll get there in the next part.

```css
@property --surface {
  syntax: '<color>';
  initial-value: #333;
  inherits: true;
}

@property --surface-over {
  syntax: '<color>';
  initial-value: #444;
  inherits: true;
}

@property --surface-under {
  syntax: '<color>';
  initial-value: #222;
  inherits: true;
}
```

<q class="info">The important bit here is that they're a color type.</q>

Now, we can assign more meaningful values to the surface colors. You could use `@media (prefers-color-scheme)` if you like, but here, since I wanted to show light and dark with a switch, I'm using `:has()`:

```css
@layer demo.theme {
  html:has(#light:checked) {
    color-scheme: light;
    --surface: oklch(90% .05 var(--hue));
    --surface-over: oklch(99% .02 var(--hue));
    --surface-under: oklch(85% .075 var(--hue));
  }
  
  html:has(#dark:checked) {
    color-scheme: dark;
    --surface: oklch(20% .1 var(--hue));
    --surface-over: oklch(30% .1 var(--hue));
    --surface-under: oklch(15% .1 var(--hue));
  }
}
```

That's essentially the setup and orchestration for a type safe custom property setup. All that's left is to use them. Check out the Codepen to see all the neat ways these are valuable in creating an adaptive color scheme: box-shadows, borders, and more!

![](https://codepen.io/argyleink/embed/preview/MWZyMXG)

## The last part

The "theme tint" text input in the demo, go ahead and start typing crap into it. None of the color system will fail due to a typo or assigned value that doesn't match the type. The browser knows exactly how to fallback and handle the errors.

You could build a very very robust and large system on `@property`. The same types of type safety during development that you like with Typescript, but the types actually ship to the browser and are enforced. Rad.

Firefox is almost done with their implementation, which will make `@property` cross browser stable 🎉 

[See caniuse for availability status](https://caniuse.com/mdn-css_at-rules_property).

**Design systems are about to get a lot smarter and more stable.**