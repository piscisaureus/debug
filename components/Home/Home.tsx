import { IPost, IBlog, INote } from '~/utils/posts.ts'

import PostItem from '~/components/Posts/Item.tsx'
import Footer from '~/components/Footer/Footer.tsx'
import TopicsAside from '~/components/Topics/Aside.tsx'

export default function Home({ posts }: { posts: IPost[] }) {
  return (
    <>
      <main class="Home">
        <TopicsAside/>
        <ul class="PostList">
          {posts.map((post) => 
            <li>
              <PostItem post={post as IBlog | INote} />
            </li>
          )}
        </ul>
        <Footer/>
      </main>
      <script dangerouslySetInnerHTML={{ __html: `
        document.querySelector('.PostList').onclick = handleActivate
        document.querySelector('.PostList').onkeyup = e => {
          if (e.key === 'Enter') handleActivate(e)
        }

        function handleActivate(e) {
          if (e.target.nodeName === 'A' || e.target.closest('a') || e.target.classList.contains('PostList')) 
            return
          window.location.href = e.target.closest('.PostItem').getAttribute('data-slug')
        }
      `}}>
      </script>

      {/*todo reduced motion*/}
      <style dangerouslySetInnerHTML={{ __html: `
        .PostList > li {
          view-timeline: list-item-scroll-effect;
        }
        .PostItem {
          animation: 1s linear list-transition forwards;
          animation-timeline: list-item-scroll-effect;
        }
        @keyframes list-transition {
          enter 0% {
            opacity: .25;
            transform: scale(0.85);
          }
          enter 50% {
            opacity: 1;
            transform: scale(1);
          }
          exit 75% {
            opacity: 1;
          }
          exit 85% {
            transform: scale(1);
          }
          exit 100% {
            opacity: .25;
            transform: scale(0.95);
          }
        }
        ` }}
      />
    </>
  )
}