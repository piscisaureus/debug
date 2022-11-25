import { assert, assertEquals } from '$std/testing/asserts.ts'
import { getPosts, getPost } from './posts.ts'

Deno.test("load post", async () => {
  const slug = 'first'
  const post = await getPost(slug)

  assert(post)
  assertEquals(post.id, slug)
})

Deno.test("list posts", async () => {
  const posts = await getPosts()
  assert(posts)
  assert(posts.length >= 1)

  const firstPost = posts.at(-1)
  assert(firstPost)
  assertEquals(firstPost.id, "first")
})