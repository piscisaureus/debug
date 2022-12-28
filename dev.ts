import dev from '$fresh/dev.ts'
import { watchAndBuildStyles } from '~/utils/postcss.ts'
import { watchAndBuildRSS } from '~/utils/rss.ts'

watchAndBuildStyles()
watchAndBuildRSS()

await dev(import.meta.url, "./main.ts")
