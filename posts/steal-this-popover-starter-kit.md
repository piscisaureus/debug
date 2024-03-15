---
type: blog
persona: google
title: Steal this popover code
published_at: 2024-03-15T03:45:30.763
snippet: Transition a popover in and out of the top layer penthouse
hero:
  src: argyleink/steal-this-code.png
  alt: Text emphasized alt text example
  width: 481
  height: 102
tags: 
  - css
  - html
---

Popovers are pretty rad, as are [dialogs](https://web.dev/articles/building/a-dialog-component), but animating them isn't easy.

1. the browser toggles `display`
1. the elements enter and exit the [top layer](https://developer.mozilla.org/docs/Glossary/Top_layer) <br>(aka: the DOM penthouse)

[Popovers](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/popover) are basically being [appended](https://developer.mozilla.org/docs/Web/API/Node/appendChild) or [removed](https://developer.mozilla.org/docs/Web/API/Node/removeChild), and [`display`](https://developer.mozilla.org/docs/Web/CSS/display) is toggled between `block` and `none`. 

<br>

<q class="info">Ew, how do we deal with that?</q>

## Steal this basic setup

This next section is optimized for you to steal, but you can also just [peep the Codepen](https://codepen.io/argyleink/pen/JjzqXee) and take it from there.

## HTML

Button that opens the popover:

```html
<button popovertarget="my-tooltip">?</button>
```

The `[popover]`:

```html
<p id="my-tooltip" popover>tip</p>
```

## CSS

This is a bit tricky. At least I think so.

```css
[popover] {
  &, &::backdrop {
    transition: 
      display .5s allow-discrete, 
      overlay .5s allow-discrete, 
      opacity .5s;
    opacity: 0;
  }

  &::backdrop {
    background: black;
  }

  &:popover-open {
    opacity: 1;

    &::backdrop {
      opacity: 0.5;
    }
  }

  @starting-style {
    &:popover-open,
    &:popover-open::backdrop {
      opacity: 0;
    }
  }
}
```

## CSS snippet explained

This isn't a deep dive, find [a good one from Una here](https://developer.chrome.com/blog/entry-exit-animations), but is a `2m` overview.

## Transition setup

1. sets any popover and their backdrops to `0` opacity
1. sets up a transition for that opacity
1. with a matching duration to opacity, `display` and [`overlay`](https://developer.mozilla.org/docs/Web/CSS/overlay) use a new keyword [`allow-discrete`](https://developer.mozilla.org/docs/Web/CSS/transition-behavior) that signals these properties toggle any new values **after** the duration has run

```css
[popover] {
  &, &::backdrop {
    transition: 
      display .5s allow-discrete, 
      overlay .5s allow-discrete, 
      opacity .5s;
    opacity: 0;
  }
}
```

<q>Display and entering/exiting the top-layer will now only change after opacity has finished fading</q>

## Popover showing

1. sets any popover to opacity `1` when [`:popover-open`](https://developer.mozilla.org/en-US/docs/Web/CSS/:popover-open)
1. sets the backdrop to half opacity

```css
[popover] {
  &:popover-open {
    opacity: 1;

    &::backdrop {
      opacity: 0.5;
    }
  }
}
```

## Entry animation prep

Since popovers enter the top layer, and we're using transitions, we need a way to tell the browser what styles to start the transition from. Enter [`@starting-style`](https://developer.mozilla.org/docs/Web/CSS/@starting-style)

1. When the popover is opened
1. Start the backdrop and popover with opacity 0

```css
[popover] {
  @starting-style {
    &:popover-open,
    &:popover-open::backdrop {
      opacity: 0;
    }
  }
}
```

<q>This will then transition from the starting style, to the popover showing styles.</q>

## JS

Nothing to see here.

### Try it

![](https://codepen.io/argyleink/embed/preview/JjzqXee)
