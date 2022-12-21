const cache = new Map()
const base = 'https://webmention.io/api/mentions.jf2?'

export async function allMentions():Promise<[]> {
  const domain = 'nerdy.dev'
  const token = 'HZvGv05WrxQObrjtTHRn7w'
  const path = `${base}domain=${domain}&token=${token}`

  const data = await fetch(path)
  const json = await data.json()

  console.log(json.children)
  return json.children
}

export async function aMention(slug:string):Promise<[]> {
  const path = `${base}target=https://nerdy.dev/${slug}`
  const data = await fetch(path)
  let json

  if (cache.has(slug)) {
    json = cache.get(slug)
  }
  else {
    try {
      json = await data.json()
      cache.set(slug, json)
    } 
    catch (err) {
      throw err
    }
  }

  return json.children
}

aMention('https://nerdy.dev/css-anchor-api-is-lookin-rad')