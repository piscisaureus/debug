import { UnknownPageProps } from '$fresh/server.ts'
import { Head } from '$fresh/runtime.ts'

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/open-props"/>
        <link rel="stylesheet" href="https://unpkg.com/open-props/normalize.min.css"/>
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            display: grid;
            place-content: center;
            place-items: center;
            gap: var(--size-fluid-3);
          }

          p {
            padding-block: var(--size-4);
            padding-inline: var(--size-6);
            background: var(--surface-2);
            box-shadow: var(--shadow-6);
            font-size: var(--font-size-3);
          }

          code {
            background: var(--surface-3);
          }
        `}}/>
      </Head>
      <img src="/favicon.svg" width='150' />
      <p>Yo, sorry, <code>{url.pathname}</code> wasn't found</p>
    </>
  )
}