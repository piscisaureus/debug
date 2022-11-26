import dev from '$fresh/dev.ts'
import {watchAndBuildStyles} from './utils/postcss.ts'

watchAndBuildStyles()

await dev(import.meta.url, "./main.ts")
