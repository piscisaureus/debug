---
type: blog
persona: google
title: Open Props in Next with StyleX
published_at: 2023-12-06T23:24:00.785
snippet: A guide to getting started with Next, StyleX and Open Props.
hero:
  src: argyleink/next-stylex-op.png
  alt: Next logo, StyleX logo, Open Props logo
  width: 1440
  height: 369
tags: 
  - css
  - js
---

[StyleX](https://stylexjs.com) outsourced tokens to [Open Props](https://open-props.style), so a new [React](https://react.dev/) app with StyleX, Open Props and [NextJS](https://nextjs.org/) is pretty quick to setup. Let's dive in and get y'all started.

## Spin up a new Next app

We're starting from scratch, so let's use `create-next-app` in directory of your choosing:

```shell
npx create-next-app@latest
```

I chose **yes** to TypeScript, ESLint and App Router; **no** to Tailwind CSS, `src/` directory, amd `import alias`. 

You do you though.

`cd` into the newly created Next app.

## Install StyleX

We need to add a few dependencies to the base Next app to get StyleX up and running:

```shell
npm i @stylexjs/stylex @stylexjs/open-props @stylexjs/babel-plugin @stylexjs/nextjs-plugin
```

1. `@stylexjs/stylex` is the new React styling freshness
1. `@stylexjs/open-props` is the prepackaged and typed Open Props tokens for use with StyleX
1. `@stylexjs/babel-plugin` for use with `.babelrc.js`
1. `@stylexjs/nextjs-plugin` for use with Next to know about the custom Babel configuration

## Add a .babelrc.js file

Make a new file at the root of your Next app and fill it with this configuration:

```js
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV === "development",
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: "commonJS",
          rootDir: __dirname,
        },
      },
    ],
  ],
};
```

Notice one of the dependencies we installed is in there `@stylexjs/babel-plugin`.

## Add to next.config.js

Tell Next about StyleX via the provided Next plugin `@stylexjs/nextjs-plugin`:

```js
/** @type {import('next').NextConfig} */
const stylexPlugin = require("@stylexjs/nextjs-plugin");
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx"],
}

module.exports = stylexPlugin({
  rootDir: __dirname,
})(nextConfig);
```

## Patch a next/font issue

The Babel file we added conflicts with Next and the included font strategy. I removed these references from the project, a problem to be solved at another time perhaps.

In `app/layout.tsx`, **remove** the following references to the font strategy:
1. `import { Inter } from 'next/font/google'`
1. `const inter = Inter({ subsets: ['latin'] })`
1. `className={inter.className}`

With those removed, `npm run dev` is free to compile and be loaded at `localhost:3000`.

## Bring in StyleX and Open Props

Lastly, let's write some StyleX and use Open Props for values. Open `app/page.tsx` and add the following to the top of the file:

```js
import stylex from "@stylexjs/stylex";

import { colors } from "@stylexjs/open-props/lib/colors.stylex";
```

Now we have `stylex` and it's API for creating styles for this component and `colors` from [Open Props](https://open-props.style/#colors) have been imported which hold all the color tokens.

<q>Enjoy the autocomplete from TypeScript if you have it.</q>

Next, we finally get to create some StyleX styles:

```js
const X = stylex.create({
  test: {
    color: colors.red5,
  },
});
```

I used `const X` here since Next has already created a `styles` variable from CSS modules. This is changeable later, after all the CSS modules have been replaced with StyleX. I also used the classic CSS debugging color `red` as a text color so we can easily see if things have worked. 

Test your changes by providing the classname returned by StyleX onto an element in the `Home()` function:

```js
<main className={styles.main+ ' ' +stylex(X.test)}>
```

Save and check your next app to see all the text has gone red. Success.

## More props

For a full list of the importable Open Props from the StyleX package, [check it out on Github](https://github.com/facebook/stylex/blob/main/packages/open-props/package.json#L6-L25). 

I'll share a prettier version of the list here, to save you from bouncing and reading a `package.json`:

```shell
animations
animationNames
aspects
borders
colors
colorsHSL
colorsOKLCH
colorsOKLCHHues
grayOKLCH
easings
fonts
gradients
highlights
layouts
masksCornerCuts
masksEdges
shadows
sizes
svg
zIndex
```

Since we removed the Next app font, let's fix that by using what Open Props provides:

```js
import { fonts } from "@stylexjs/open-props/lib/fonts.stylex";
```

With the font tokens loaded, we can use the `fonts.sans` token to bring in a system ui font string:

```js
const X = stylex.create({
  test: {
    color: colors.red5,
    fontFamily: fonts.sans,
  },
});
```

![](argyleink/stylex-next-result.png "A NextJS app homepage with red text and a sans serif font $$width:1213,height:602")

At this point, you're off to the races with StyleX and [their docs will help you continue styling](https://stylexjs.com/docs/learn/styling-ui/using-styles/), theming and extending your design system. You can delete the `test` style object and begin more finite control with the StyleX API.

## Outro

[Here's a StackBlitz](https://stackblitz.com/edit/next-stylex-openprops?file=app%2Fpage.tsx) with all this already setup in a new NextJS project, for reference or forking.