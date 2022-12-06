import { Post } from '~/utils/posts.ts'

import Nav from '~/components/Nav/Nav.tsx'
import PostItem from '~/components/Posts/Item.tsx'
import TopicsAside from '~/components/Topics/Aside.tsx'

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <Nav/>
      {/*todo: list.tsx component*/}
      <main class="Home">
        <TopicsAside/>
        <ul class="PostList">
          {posts.map((post) => 
            <li>
              <PostItem post={post} />
            </li>
          )}
        </ul>
      </main>
      {/*todo reduced motion*/}
      <style dangerouslySetInnerHTML={{ __html: `
        .PostItem {
          view-timeline: enter-n-exit;
          animation: 1s linear list-transition forwards;
          animation-timeline: enter-n-exit;
        }
        @keyframes list-transition {
          enter 0% {
            opacity: .25;
            transform: scale(0.75);
          }
          enter 100% {
            opacity: 1;
            transform: scale(1);
          }
          exit 75% {
            opacity: 1;
          }
          exit 100% {
            opacity: 0;
          }
        }
        ` }}
      />
    </>
  )
}