import { extract } from 'https://deno.land/std@0.170.0/encoding/front_matter.ts'

import { ITags } from '~/components/Tags/Tags.tsx'
import parse from '~/utils/markdown.ts'
import personas, {IPersona} from '~/utils/persona.ts'

export interface IPost {
  slug: string;
  persona: IPersona;
  publishedAt: Date;
  updatedAt?: Date;
  tags?: ITags;
  content: string;
}

export interface IHero {
  height: number,
  width: number;
  src: string;
  alt?: string;
}

export interface IBlog extends IPost {
  type: 'blog',
  title: string;
  snippet?: string;
  hero: IHero;
  mentions: [];
}

export interface INote extends IPost {
  type: 'note',
  media?: IHero[];
  mentions: [];
}

const cache = new Map()
const tags = new Map()

export let totalPosts = 0

export async function getPosts(): Promise<IPost[]> {
  const files = Deno.readDir("./posts")
  const promises = []

  for await (const file of files) {
    const slug = file.name.replace(".md", "")
    if (slug.startsWith('_')) continue
    promises.push(getPost(slug))
  }

  const posts = await Promise.all(promises) as IPost[]

  posts.sort((a, b) => 
    b.publishedAt.getTime() - a.publishedAt.getTime())
  
  if (totalPosts !== posts.length) {
    totalPosts = posts.length
    tags.clear()
    setTagsInformation(posts)
  }

  return posts
}

export async function getPost(slug: string) {
  let text: string

  if (Deno.env.get("IS_PROD") && cache.has(slug)) {
    text = cache.get(slug)
  }
  else {
    try {
      text = await Deno.readTextFile(`./posts/${slug}.md`)
      cache.set(slug, text)
    } 
    catch (err) {
      if (err instanceof Deno.errors.NotFound)
        return null
      throw err
    }
  }

  const { attrs:frontmatter, body }: {attrs:any, body:string} = extract(text)
  const content = parse(body)
  const persona = personas.get(frontmatter.persona as string)

  if (!frontmatter.tags) frontmatter.tags = []
  frontmatter.tags.unshift(frontmatter.type)

  if (frontmatter.type === 'note') {
    return {
      type: 'note',
      slug,
      persona,
      publishedAt: new Date(frontmatter.published_at as string),
      updatedAt: frontmatter.updated_at ? new Date(frontmatter.updated_at as string) : null,
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
      publishedAt: new Date(frontmatter.published_at as string),
      updatedAt: frontmatter.updated_at ? new Date(frontmatter.updated_at as string) : null,
      tags: frontmatter.tags,
      title: frontmatter.title,
      content,
      snippet: parse(frontmatter.snippet),
      hero: frontmatter.hero,
    }
  }
}

function setTagsInformation(posts: IPost[]) {
  for (const post of posts)
    if (post && post.tags)
      for (const tag of post.tags)
        tags.has(tag)
          ? tags.set(tag, tags.get(tag)+1)
          : tags.set(tag, 1)
}

export function getTags() {
  return tags
}