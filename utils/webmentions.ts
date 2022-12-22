const cache = new Map()
const base = 'https://webmention.io/api/mentions.jf2?'

export interface IMention {
  type: string,
  author: {
    type: string,
    name: string,
    photo: string,
    url: string,
  },
  url: string,
  published: Date,
  "wm-received": Date,
  "wm-id": number,
  "wm-source": string,
  "wm-target": string,
  content: {
    html: string,
    text: string,
  },
  "mention-of": string,
  "wm-property": string,
  "wm-private": boolean,
}

export async function allMentions():Promise<[]> {
  const domain = 'nerdy.dev'
  const token = 'HZvGv05WrxQObrjtTHRn7w'
  const path = `${base}domain=${domain}&token=${token}`

  const data = await fetch(path)
  const json = await data.json()

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