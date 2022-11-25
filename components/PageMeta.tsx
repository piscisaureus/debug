import { JSX } from 'preact'
import { Post } from '../utils/posts.ts'

export default function PageMeta(props: { post: Post }) {
  return (
    <>
      <title>{props?.post?.title || "Adam Argyle"}</title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="mobile-web-app-capable" content="yes"/>
      <meta name="theme-color" content="deeppink" media="(prefers-color-scheme: light)"/>
      <meta name="theme-color" content="Canvas" media="(prefers-color-scheme: dark)"/>
      <meta name="description" content="🙂"/>
      <meta name="color-scheme" content="dark light"/>

      <link rel="icon" href="/favicon.ico" sizes="any"/>
      <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>

      <link rel="stylesheet" href="/style.css"/>
    </>
  )
}