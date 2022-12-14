export default function TableOfContents({toc}: {toc: []}) {
  return (
    <aside class="TableOfContents">
      {toc.map(({text, level}) => (
        <a href={'#'+text.toLowerCase().replaceAll(' ', '-')}>{text}</a>
      ))}
    </aside>
  )
}