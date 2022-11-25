import dev from '$fresh/dev.ts'
import {watchAndBuildStyles} from './utils/styles.build.ts'

watchAndBuildStyles()

await dev(import.meta.url, "./main.ts")
