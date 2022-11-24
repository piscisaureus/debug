import { JSX } from 'preact'

export default function IndexHead() {
  return (
    <>
      <title>Fresh Blog</title>
      <meta charset="utf-8"/>

      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="mobile-web-app-capable" content="yes"/>
      <meta name="theme-color" content="deeppink" media="(prefers-color-scheme: light)"/>
      <meta name="theme-color" content="Canvas" media="(prefers-color-scheme: dark)"/>
      <meta name="description" content="🙂"/>
      <meta name="color-scheme" content="dark light"/>

      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>

      <style>
        @layer design, base, components, demo;

        @import 'https://unpkg.com/open-props' layer(design.system);
        @import 'https://unpkg.com/open-props/normalize.min.css' layer(base);
        @import 'https://unpkg.com/open-props/buttons.min.css' layer(base);
      </style>

      <link rel="stylesheet" href="/styles/index.css"/>
    </>
  )
}