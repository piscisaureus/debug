import { IMention } from '~/utils/webmentions.ts'

export default function Pingbacks({pingbacks}:{pingbacks:IMention[]}) {
  return (
    <section>
      <span>{pingbacks.length} pingbacks</span>
      <ul class="Pingbacks">
        {pingbacks.map(ping => (
          <li title={ping.url}>
            <a href={ping.url}>
              {new URL(ping.url)['hostname']}  
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
