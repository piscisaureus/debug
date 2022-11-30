import { extract } from '$std/encoding/front_matter.ts'
import parse from '~/utils/markdown.ts'
import personas from '~/utils/persona.ts'

export interface Post {
  slug: string;
  persona: string; // type Persona
  publishedAt: Date;
  tags?: string[]; // type?
  content: string;
}

export interface Hero {
  height: number,
  width: number;
  src: string;
  alt?: string;
}

export interface Blog extends Post {
  type: 'blog',
  title: string;
  snippet?: string;
  hero: Hero;
}

export interface Tweet extends Post {
  type: 'tweet',
  media?: object[];
}

const cache = new Map()

export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir("./posts")
  const promises = []

  for await (const file of files) {
    const slug = file.name.replace(".md", "")
    promises.push(getPost(slug))
  }

  const posts = await Promise.all(promises) as Post[]
  posts.sort((a, b) => 
    b.publishedAt.getTime() - a.publishedAt.getTime())
  
  return posts
}

export async function getPost(slug: string) {
  let text: string

  if (cache.get(slug)) {
    console.info(`GET (CACHE): posts/${slug}`)
    text = cache.get(slug)
  }
  else {
    try {
      console.info(`GET: posts/${slug}`)
      text = await Deno.readTextFile(`./posts/${slug}.md`)
      cache.set(slug, text)
    } 
    catch (err) {
      if (err instanceof Deno.errors.NotFound)
        return null
      throw err
    }
  }

  const { attrs:frontmatter, body } = extract(text)
  const content = parse(body)
  const persona = personas[frontmatter.persona]
  frontmatter.tags.unshift(frontmatter.type)

  if (frontmatter.type === 'tweet') {
    return {
      type: 'tweet',
      slug,
      persona,
      publishedAt: new Date(frontmatter.published_at),
      tags: frontmatter.tags,
      content,
      media: frontmatter.media,
    }
  }
  else if (frontmatter.type === 'blog') {
    return {
      type: 'blog',
      slug,
      persona,
      publishedAt: new Date(frontmatter.published_at),
      tags: frontmatter.tags,
      title: frontmatter.title,
      content,
      snippet: frontmatter.snippet,
      hero: frontmatter.hero,
      heroAlt: frontmatter.hero_alt,
    }
  }
}