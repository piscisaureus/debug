const domain = 'nerdy.dev'
const token = 'HZvGv05WrxQObrjtTHRn7w'
const base = 'https://webmention.io/api/mentions.jf2?'

export async function allMentions():Promise<[]> {
  const path = `${base}domain=${domain}&token=${token}`
  const data = await fetch(path)
  const json = await data.json()

  console.log(json.children)
  return json.children
}

export async function aMention(url:string):Promise<[]> {
  const path = `${base}target=${url}`
  const data = await fetch(path)
  const json = await data.json()

  console.log(json.children)
  return json.children
}
allMentions()
aMention('https://nerdy.dev/css-anchor-api-is-lookin-rad')