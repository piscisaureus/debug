export default function TableOfContents({toc}: {toc: []}) {
  return (
    <aside class="TableOfContents">
      <h5>Table of contents</h5>
      {toc.map(({text, level}) => (
        <a href={'#'+text.toLowerCase().replaceAll(' ', '-')}>{text}</a>
      ))}
    </aside>
  )
}