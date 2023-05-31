import { IPost, IBlog, INote } from '~/utils/posts.ts'

import PostItem from '~/components/Posts/Item.tsx'
import Footer from '~/components/Footer/Footer.tsx'
import Topics from '~/components/Topics/Topics.tsx'

export default function Home({ posts }: { posts: IPost[] }) {
  return (
    <>
      <main class="Home">
        <Topics/>
        <ul class="PostList" id="feed">
          {posts.map((post, index) => 
            <li>
              <PostItem post={post as IBlog | INote} index={index} />
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
          if (e.target.nodeName === 'A' || e.target.nodeName === 'IMG' || e.target.nodeName === 'VIDEO' || e.target.nodeName === 'SUMMARY' || e.target.closest('a') || e.target.classList.contains('PostList')) 
            return
          window.location.href = e.target.closest('.PostItem').getAttribute('data-slug')
        }
      `}}>
      </script>
    </>
  )
}