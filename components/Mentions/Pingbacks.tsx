import { IMention } from '~/utils/webmentions.ts'

export default function Pingbacks({pingbacks}:{pingbacks:IMention[]}) {
  return (
    <section>
      <div class="mention-header">
        <span class="Tag">{pingbacks.length}</span>
        <span> pingbacks</span>
      </div>
      <ul class="Pingbacks">
        {pingbacks.map(ping => (
          <li title={ping.url}>
            <a href={ping.url} rel="noopener">
              {new URL(ping.url)['hostname']}  
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
