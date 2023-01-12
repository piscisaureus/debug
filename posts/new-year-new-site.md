---
type: blog
persona: argyleink
title: New Year, New Site
published_at: 2023-01-01T00:57:50.245
snippet: Read about the tech behind this new site and all the APIs I'm playing around with?
hero:
  src: argyleink/new-site-2023.png
  alt: Background grid of 2023's and the GUI Skull logo in the middle
  width: 1920
  height: 669
tags: 
  - css
  - js
---

## I've joined the indie web

Viva RSS, viva owning your content, viva to free expression. Join that [Indie Web](https://indieweb.org/) y'all 🤘🏻💀.

```js
let life = new Year().next()
```

Instead of joining a different social network, investing in some new walled garden (Mastadon 👀), I've decided to take the popular UX/UI patterns, like a social feed, and build them here, where they can't be taken away or stifled.

<q>
  Ain't no one gonna take my site.
  <cite>Adam Argyle</cite>
</q>

### the stack

After much testing and research, I chose to invest in [Deno](https://deno.land) and their [Fresh](https://fresh.deno.dev) framework. I appreciate their investment in web standards and focus on being minimal. 

![](argyleink/deno-fresh.png "The next-gen web framework built for speed, reliability and simplicity $$width:1570,height:588")

It's also a server side rendered framework, at the edge, which means I can fix my site within seconds and don't have to wait for long static build and deploy times. Deno Fresh also caches at the edge, just in time 😍

![](argyleink/fresh-features.png "A screenshot of the feature list from the Deno Fresh website $$width:1538,height:854")

SSR and progressive enhancement **FTW**.

### the styles

Fresh is pretty minimal out of the box, especially in regards to styling. It only offers a just in time atomic stylesheet setup, but I wanted to use [Open Props](https://open-props.style) (naturally). So I ended up writing my own file system watcher task that compiles [PostCSS](https://postcss.org/) and pops it out to the `static/` directory for cached serving.

```js
import { debounce } from '$std/async/mod.ts'

export async function watchAndBuildStyles() {
  const watcher = Deno.watchFs([
    './styles/', 
    './components/', 
    './islands/',
  ])

  const protectedBuildCall = debounce(buildStyles, 200)
  
  for await (const _event of watcher)
    protectedBuildCall()
}
```

This route also means I'm in full control of the stylesheet. That was very critical to me as I want to use my site as a playground for new CSS features, progressively enhancing UX when available but otherwise serving a great static experience.

Here's my list of plugins if you're curious:

```js
import cssNesting from 'npm:postcss-nesting'
import customMediaPlugin from 'npm:postcss-custom-media'
import mqRanges from 'npm:postcss-media-minmax'

import inlineImports from 'npm:postcss-import'
import importUrl from 'npm:postcss-import-url'
import importGlob from 'npm:postcss-import-ext-glob'
import cssnano from 'npm:cssnano'

import OpenProps from 'npm:open-props'
import jitProps from 'npm:postcss-jit-props'
```

A small preview of my `index.css` file. Spoiler, it's [layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) all the way, and I looooved it.

```css
@import "https://unpkg.com/open-props/normalize.min.css" layer(base.normalize);
@import "https://unpkg.com/open-props/theme.light.switch.min.css" layer(base.theme);
@import "https://unpkg.com/open-props/theme.dark.switch.min.css" layer(base.theme);
@import "utilities.css" layer(base.utilities);
@import "nojs.css" layer(base.nojs);

@import "toast.css" layer(components.toast);
@import "markdown.css" layer(components.markdown);
@import "syntax-highlighting.css" layer(components.syntax);
@import "neon.css" layer(components.p3);
@import "quotes.css" layer(components.quote);

@import-glob "../components/**/*.css" layer(components.fresh);
@import-glob "../islands/**/*.css" layer(components.fresh);

@layer base.normalize-overrides {…}
@layer overrides {…}
```

**It's 3 layers**: base, components, overrides. Named sublayers for easier debugging and organization.

With that in place, I match a classname to a component name and that's pretty much it. I have global styles and component styles, all sharing the props and [JIT Props](https://github.com/GoogleChromeLabs/postcss-jit-props) makes sure I only ship the props I use. Good stuff.

<q class="info">
  <p>Try the site in Chrome with <a href="chrome://flags/#enable-experimental-web-platform-features">#experimental-web-platform-features</a> enabled. I'll be constantly trialing new features there! I'm currently trialing <a href="https://drafts.csswg.org/scroll-animations-1/">Scroll Linked Animations</a>!</p>
</q>

### light n' dark

Hopefully you noticed there was no "flash of an unwanted color scheme" (FOAUCS) when the page loaded. 

![](f_auto,q_auto/argyleink/theme-switch-overview.mp4 "Demo of the theme switch features $$width:1922,height:1082")

So many sites strobe light my face with the light theme when the page loads (I'm generally in dark mode), and it makes me feel like a vampire who just got blasted with a sun ray. Sometime they blast me on every single page load… 😱

To make this feature, I followed my own [Theme Switch GUI Challenge](https://web.dev/building-a-theme-switch-component/)! I just integrated it into Fresh 🙂

A **few features** of it that make me happy:
1. Works without JS
1. Remembers your choice
1. Syncs with the system as it changes
1. Has a rad animation between a sun and moon with SVG and transforms
1. No FOAUCS anywhere
1. Has accessibility considerations

Also, don't miss that [adaptive favicon](https://web.dev/building-an-adaptive-favicon/) 😎

## comments and likes

I really like the idea of aggregating mentions of my site's work onto this site itself, and [WebMentions.io](https://webmention.io) let me do that. Once set, with Deno I server side fetch mentions for any sub pages and send the data to some components to handle for rendering.

I think the result is cool. I feel like it's peer to peer in nature but with a good amount of optional content filtering from the owner side.

I'm not in any [webrings](https://en.wikipedia.org/wiki/Webring) yet… should I be?

## multiple personas

Sometimes people have multiple accounts with a service so they can provide different branded feeds, maybe a personal and a business one for example. I have 6 personas I can be on my site lol:
1. `admin`: when I'm making site updates or announcements
1. `google`: when posts are related to my work at Google
1. `argyleink`: when the posts are rando Adam thoughts or comments
1. `csspodcast`: when new episodes or moments happen for the [CSS Podcast](https://pod.link/csspodcast)
1. `guichallenges`: when new episodes or moments happen for the [GUI Challenges](https://github.com/argyleink/gui-challenges)
1. `pops`: dad updates

I even have an open feature request, to myself, about co-tweeting personas. lol, taking multiple personalities to a new site level.

### 404

Make a `_404.tsx` handler in the `routes/` directory and you too can make a custom 404 page. Want to see it? Visit [https://nerdy.dev/you-wont-find-this](https://nerdy.dev/you-wont-find-this).

![](argyleink/custom-404.png "The GUI Skull is shown with a message about not finding the page $$width:766,height:373")

Open Props made this page easy to style because I could easily bring in the normalize and props [from a CDN](https://unpkg.com/open-props) and use them in the template.

### localized dates

With a little custom middleware I parse preferred languages from the request headers and then provide a getter to components on the server.

```js
req.headers.get('accept-language')
```

This feature is both for localization but also for accuracy. The dates shows how long ago the post was made, and by knowing where you are in the world I can provide a date relative to you.

![](argyleink/localized-dates.png "An example card from this site that shows the dates in Japanese $$width:818,height:206")

### logical properties

I used [logical properties](https://web.dev/learn/css/logical-properties/) everywhere, which means the site can do rad stuff like this:

![](argyleink/traditional-chinese.png "Screenshot of the website homepage in a horizontal right to left layout and translated to Chinese, lookin sharp $$width:1478,height:880")

and i didnt have to do anything, the browser adapts it for me.

![](argyleink/traditional-chinese-blog.png "Screenshot of the website blog post in a horizontal right to left layout and translated to Chinese, lookin sharp $$width:548,height:683")

Turned out Media Queries made this hard though, and [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries) saved the day. Blog post will def come out about it.

### pretty URLs

I really like minimal URLs and with Deno + Fresh it was really easy. I appreciate that it was the default.

### analytics

**No client side analytics**. 

I went with [Pirsch](https://pirsch.io/), and am happy! Cost seems right so they stay alive, great APIs and SDKs, and a really nice dashboard that's simple but powerful.

I reeeeeeally didn't want to run some open source containers on the cloud and host my own analytics… just not my kind of Tuesday night activity. Aka, I'm down with a couple extra bucks for a managed solution.

### progressive web app

This site is also a [PWA](https://web.dev/progressive-web-apps/). Go ahead, install it or add it to your homescreen. It launches with a nice splash image, is full screen, and can really feel like a system application.

I've implemented the following PWA features so far:

1. `manifest.json`
1. A service worker, mine is very lightweight
1. Custom icon
1. Custom install banner image

It's also got a great landscape layout when in fullscreen 🤓

### forced colors

Where there are shadows and colors to help distinguish UI elements, they're replaced with a transparent 1px border so that in [`forced-colors-mode`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors#:~:text=The%20forced%2Dcolors%20CSS%20media,is%20Windows%20High%20Contrast%20mode.) there are visual affordances for distinguishing elements.

![](argyleink/forced-colors.png "A screenshot of a post item detail view with forced colors enabled $$width:1206,height:1008")

I also think the retro colors are super rad. Sometimes I use this mode if a site doesn't have a dark theme, it'll force a cool retro one!

### works without javascript

The site tries to only use JavaScript to enhance the experience, not relying on it for the baseline behavior.

### uses some GUI Challenges

You'll find the [toast](https://web.dev/building-a-toast-component/), [dialog](https://web.dev/building-a-dialog-component/), [theme switch](https://web.dev/building-a-theme-switch-component/), [adaptive favicon](https://web.dev/building-an-adaptive-favicon/) and more to come.

[Checkout all the GUI Challenges](https://github.com/argyleink/gui-challenges)

### keyboard navigation

Give it a shot, try navigating around with the keyboard. There's a [skip link](https://css-tricks.com/how-to-create-a-skip-to-content-link/) in the nav bar, special scroll snap UX in the home feed, arrow key support in the filter aside, and great focus styles. 

![](f_auto,q_auto/argyleink/site-keyboard-nav-example.mp4 "A screen capture demo of the keyboard experience $$width:1920,height:1160")

### rss

**I freakin love RSS**. Peer to peer social interation, nothin in the middle, so good. I've been an RSS reader for over 10 years, it's by far the best place for me to get meaningful information. Well, now I have a feed!

The RSS feed is the backbone of the site, it's an artifact that allows the content to travel and adapt to reader's preferences. You can subscribe from an RSS reader, from Chrome using [the follow feature](https://www.engadget.com/google-chrome-rss-follow-button-android-181659150.html), or just follow along on Twitter where I syndicate the content.

[Subscribe](/rss.xml) why don't ya?!

### media

Everything is *currently* uploaded into [Cloudinary](https://cloudinary.com) and then I've created a few authoring conveniences in Fresh and when writing Markdown that utilize all their great features.

I try to be respectful with the media delivery: 
- reliable `alt` content
- [`lazy`](https://web.dev/browser-level-image-lazy-loading/) loading
- [`async`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding) decoding
- [client hints](https://web.dev/performance-optimizing-content-efficiency-client-hints/)
- multiple formats (webp, avif, etc)
- compressed
- delivered from CDNs near you
- videos always offer controls and only loop on demand

### pride moment

this can't be found in my styles:

```css
body {
  overflow-x: hidden;
}
```

🤓