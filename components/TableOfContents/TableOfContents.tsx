export default function TableOfContents({toc, hasMentions = false}: {toc: [], hasMentions: boolean}) {
  return (
    <aside class="TableOfContents">
      <h5>Table of contents</h5>
      {toc.map(({text, level}) => (
        <a href={'#'+text.toLowerCase().replaceAll(' ', '-')}>{text}</a>
      ))}
      {hasMentions && <a href="#comments">Comments</a>}
    </aside>
  )
}