import { extract } from '$std/encoding/front_matter.ts'
import { join } from '$std/path/mod.ts'
import parse from '~/utils/markdown.ts'
import personas from '~/utils/persona.ts'

interface Post {
  slug: string;
  persona: string; // type Persona
  publishedAt: Date;
  tags?: string[]; // type?
  content: string;
}

export interface Blog extends Post {
  type: 'blog',
  title: string;
  snippet?: string;
  hero?: string;
  heroAlt?: string;
}

export interface Tweet extends Post {
  type: 'tweet',
  media?: object[];
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

export async function getPost(slug: string) {
  let text: string
  // todo: pull from a cache

  try {
    text = await Deno.readTextFile(`./posts/${slug}.md`)
  } 
  catch (err) {
    if (err instanceof Deno.errors.NotFound)
      return null
    throw err
  }

  const { attrs:frontmatter, body } = extract(text)
  const content = parse(body)
  const persona = personas[frontmatter.persona]

  const tags = frontmatter.tags
    .split(',')
    .map(tag => tag.trim())
  tags.unshift(frontmatter.type)
  
  if (frontmatter.type === 'tweet') {
    return {
      type: 'tweet',
      slug,
      persona,
      publishedAt: new Date(frontmatter.published_at),
      tags,
      content,
      media: [frontmatter.media_1],
    }
  }
  else if (frontmatter.type === 'blog') {
    return {
      type: 'blog',
      slug,
      persona,
      publishedAt: new Date(frontmatter.published_at),
      tags,
      title: frontmatter.title,
      content,
      snippet: frontmatter.snippet,
      hero: frontmatter.hero,
      heroAlt: frontmatter.hero_alt,
    }
  }
}