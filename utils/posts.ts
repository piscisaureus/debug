import { extract } from '$std/encoding/front_matter.ts'
import { join } from '$std/path/mod.ts'

export interface Post {
  id: string;
  title: string;
  publishedAt: Date;
  snippet: string;
  content: string;
}

export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir("./posts")
  const promises = []
  // todo cache dir read

  for await (const file of files) {
    const slug = file.name.replace(".md", "")
    promises.push(getPost(slug))
  }

  const posts = await Promise.all(promises) as Post[]
  posts.sort((a, b) => 
    b.publishedAt.getTime() - a.publishedAt.getTime())
  
  return posts
}

export async function getPost(slug: string): Promise<Post | null> {
  let text: string
  // todo: pull from a cache

  try {
    text = await Deno.readTextFile(`./posts/${slug}.md`)
  } 
  catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return null
    }
    throw err
  }

  const { attrs, body } = extract(text)
  const params = attrs as Record<string, string>

  return {
    id: slug,
    title: params.title,
    publishedAt: new Date(params.published_at),
    content: body,
    snippet: params.snippet,
  }
}