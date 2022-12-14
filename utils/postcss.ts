import postcss from '$deno/x/postcss/mod.js'
import cssNesting from 'https://esm.sh/postcss-nesting'
import customMediaPlugin from 'https://esm.sh/postcss-custom-media@8.x.x'
import mqRanges from 'https://esm.sh/postcss-media-minmax'
import inlineImports from 'https://esm.sh/postcss-import@15.0.1'
import importUrl from 'https://esm.sh/postcss-import-url@7.1.0'
import importGlob from 'https://esm.sh/postcss-import-ext-glob@2.1.1'
// import cssnano from 'http://esm.sh/cssnano'
import OpenProps from 'open-props'
import jitProps from 'https://esm.sh/postcss-jit-props@1.0.8'
import { debounce } from '$std/async/mod.ts'
import { CustomMedia } from 'https://esm.sh/open-props/esm/media'

const config = {
  plugins: [
    customMediaPlugin({
      importFrom: [{
        customMedia: CustomMedia
      }]
    }),
    importGlob(),
    inlineImports({
      path: ['styles'],
    }),
    importUrl(),
    cssNesting(),
    mqRanges(),
    jitProps({
      ...OpenProps,
      layer: 'base.props',
    }),
    // cssnano(),
  ]
}

export async function watchAndBuildStyles() {
  const watcher = Deno.watchFs([
    './styles/', 
    './components/', 
    './islands/',
  ])

  const protectedBuildCall = debounce(buildStyles, 200)
  
  for await (const _event of watcher)
    protectedBuildCall()
}

export async function buildStyles() {
  const css = await Deno.readTextFile("./styles/index.css")
  const result = await postcss(config.plugins)
    .process(css, { 
      from: "./static/index.css", 
      to: "./static/style.css" 
    })

  Deno.writeTextFile("./static/style.css", result.css)
  console.log('styles updated')
}