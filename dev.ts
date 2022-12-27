import dev from '$fresh/dev.ts'
import { watchAndBuildStyles } from '~/utils/postcss.ts'
import { watchAndBuildRSS } from '~/utils/rss.ts'

watchAndBuildStyles()
watchAndBuildRSS()
// clientId: "C1sf3cxR6Xc4ry4JknnxFpAlMc9pihBt",
//   clientSecret: "ZrBuIog1yB2jRKy9xHg7DAp35IcDfzvx7NDo1FHrO9GmpOjZAff4e0khggst7VoJ"
Deno.env.set("IS_PROD", "true")
Deno.env.set('PirschClientId', 'C1sf3cxR6Xc4ry4JknnxFpAlMc9pihBt')
Deno.env.set('PirschSecret', 'ZrBuIog1yB2jRKy9xHg7DAp35IcDfzvx7NDo1FHrO9GmpOjZAff4e0khggst7VoJ')

await dev(import.meta.url, "./main.ts")
