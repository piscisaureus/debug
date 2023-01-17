---
type: blog
persona: argyleink
title: Collections are coo
published_at: 2023-01-06T06:46:19.618
updated_at: 2023-01-17T02:21:00.710 
snippet: Thoughts on arrays in JS and selectors in CSS
hero:
  src: argyleink/collections-are-coo.png
  alt: CSS selector being compared to a set of JS array methods, doing the same thing.
  width: 1351
  height: 511
tags: 
  - css
  - js
---

A fun benefit of always assuming something in your code is an array or collection, is that when its empty, no worries.

```css
.button {}
```

**This is a default feature of CSS.** It beautifully handles an empty set of results, iterating over each match when they do arrive. It's rad, and most CSS selectors work under this assumption; selecting collections.

Javascript can do this empty handling too:

```js
let buttons = []
buttons.forEach(item => console.log(item)) 
// no logs
```

So can JSX, cuz "it's just Javascript" and `.map()` is an array method like `forEach()`:

```js
{buttons.map(({text}) => (
  <button>{text}</button>
))}
// no <button>'s
```

And I'm not trying to wage war on if statements, but they stink.

```js
if (buttons) {
  // do stuff
}
```

Nothing wrong with if statements, you just need to remember to put them in there, they can stack up, nest, and more… or else the dumb computer will try and do an operation on something that doesn't exist.

We *can* get all existential now, which I do enjoy:

```js
buttons?.text
````

Anyway…

My brain thinks its fun to think about how similar CSS can be to other languages and where it's got some really killer features. It's currently back on a kick about how nice it is to work with collections.

## Collections everywhere

[VisBug](https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc?hl=en) works alot this way under the hood, always assuming the user has selected multiple things or the effects of their change have multiple targets. Taught me alot about systems built on arrays.

```js
document
  .querySelectorAll('.button')
  .forEach(item => 
    console.log(item))
```

I always have a fun time in that codebase, and it's hard to crash VisBug because of it.

## Array hayday

I feel arrays are most popular in [RxJS](https://rxjs.dev) and [Functional Programming](https://github.com/fantasyland/fantasy-land). It's something I miss about those styles and tools. 

<q class="info">
  Fun fact too, RxJS had SQL alias's so you could use select() instead of map(). Don't get me started on how CSS is like SQL!
</q>

**But no one really talks about how CSS is like these.**  
<small>I guess <a href="https://www.youtube.com/watch?v=tfw0qv63ZUQ&list=PLpT5nMxKrUl9EWrkCbRDqn-H4E-l1di47">I have</a> before</small>

## Is it apples and oranges and I'm trippin?

Just look at this comparison of CSS and JS, selecting the same things!

```css
.dark .button {}
```

```js
let buttons = []
let dark_buttons = buttons.filter(button => 
  button.closest('.dark'))
```

**Peep how powerful and succinct CSS is!**

```css
.blog > h2 {
  backgroundColor: hsl(200 100% 90%);
  color: hsl(200 82% 15%);
}
```

```js
import { assignStyle, directDescendants, byAttr } from './utils.js'

blogs
  .flatMap(directDescendants)
  .filter(byAttr('nodeName', 'h2'))
  .forEach(assignStyle({
    backgroundColor: 'hsl(200 100% 90%)',
    color: 'hsl(200 82% 15%)',
  }))
```

So yeah, even though it wasn't intuitive for me at first, treating more things as collections or observables that yield values over time, I like the resilience of the code. The way it'll be evaluated and decide on its own not to run the loop. The way it doesn't care. 

**I like it when code doesn't have to care.**  

[Here's a rant I had about it in 2020.](https://twitter.com/argyleink/status/1280245921381380096?t=3cKeXNj8frLOrdBjhOVUyQ&s=19)