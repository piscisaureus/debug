import * as marked from "https://esm.sh/marked@4.2.3/lib/marked.esm.js";
import { getHighlighter } from "https://esm.sh/shiki-es";

import { picPaths } from "~/components/Pic/Pic.tsx";
import { videoPaths } from "~/components/Video/Video.tsx";

interface MarkdownImage {
  height?: number;
  width?: number;
  src?: string;
  alt?: string;
}

marked.setOptions({
  highlight: (code: string, lang: string) => {
    if (!lang) return;
    if (lang === "html") lang = "xml";
    //highlighter.codeToHtml(code, { lang });
  },
});

marked.use({
  renderer: {
    heading: (text: string, level: number, raw: string) => {
      const slug = text.toLowerCase().replaceAll(" ", "-");

      return `
        <h${level}>
          ${text}
          <a name="${slug}" href="#${slug}">#</a>
        </h${level}>
       `;
    },
    image: (href: string, title: string, text: string) => {
      let opts = {} as MarkdownImage;

      if (title?.includes("$$")) {
        const [__title, extract] = title.split("$$");

        opts = extract.split(",")
          .reduce((acc, item) => {
            const [a, b] = item.split(":");
            return { ...acc, ...{ [a]: b } };
          }, {});

        title = __title;
      }
      if (href.includes("codepen")) {
        return `
          <iframe 
            class="codepen-embed" 
            scrolling="no" 
            title="${title}" 
            src="${href}?default-tab=result&editable=true&theme-id=43079" 
            frameborder="no" 
            loading="lazy" 
            allowtransparency="true" 
            allowfullscreen="true"
          >
            See the Pen <a href="${href}">
            Hot text-emphasis</a> by Adam Argyle (<a href="https://codepen.io/argyleink">@argyleink</a>)
            on <a href="https://codepen.io">CodePen</a>.
          </iframe>
        `;
      } else if (href.includes("argyleink")) {
        if (href.includes(".mp4")) {
          const { src, poster } = videoPaths(href);

          return `<video 
            src=${src} 
            ${opts.width && `width="${opts.width}" `}
            ${opts.height && `height="${opts.height}"`}
            alt="${text} "
            poster="${poster}"
            controls 
            loop
            muted 
            playsinline 
            allowFullScreen
          />`;
        } else {
          const { full } = picPaths({ src: href });

          return `<img 
            loading="lazy" 
            src="${full}" 
            alt="${text}" 
            title="${title}" 
            decoding="async"
            ${opts.width && `width="${opts.width}" `}
            ${opts.height && `height="${opts.height}"`}
          />`;
        }
      } else {
        return `<img loading="lazy" src="${href}" alt="${text}" title="${title}" />`;
      }
    },
  },
});

export default marked.parse;
