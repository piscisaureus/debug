import postcss from '$deno/x/postcss/mod.js'
import cssNesting from 'npm:postcss-nesting'
import customMediaPlugin from 'npm:postcss-custom-media'
import inlineImports from 'npm:postcss-import@15.0.1'
import importUrl from 'npm:postcss-import-url@7.1.0'
import importGlob from 'npm:postcss-import-ext-glob@2.1.1'
import cssnano from 'npm:cssnano'
import OpenProps from 'open-props'
import jitProps from 'npm:postcss-jit-props'
import { debounce } from '$std/async/mod.ts'
import { CustomMedia } from 'npm:open-props/esm/media'

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
    jitProps(OpenProps),
    cssnano(),
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