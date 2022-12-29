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

  return json.children.sort((a, b) => 
    new Date(a['wm-received']) - new Date(b['wm-received']))
}