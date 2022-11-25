import postcss from '$deno/x/postcss/mod.js'
import postcssNesting from 'npm:postcss-nesting'
import postcssImport from 'npm:postcss-import'
import importUrl from 'npm:postcss-import-url'
import importGlob from 'npm:postcss-import-ext-glob'
import cssnano from 'npm:cssnano'

const config = {
  plugins: [
    importGlob(),
    postcssImport({
      path: ['styles'],
    }),
    importUrl(),
    postcssNesting(),
    cssnano(),
  ]
}

export async function watchAndBuildStyles() {
  const watcher = Deno.watchFs('./styles/')
  
  for await (const event of watcher)
    buildStyles()
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