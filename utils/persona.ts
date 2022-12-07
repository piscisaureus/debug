import { IHero } from '~/utils/posts.ts'

export interface IPersona {
  img: IHero;
  handle: string;
  name: string;
}

const personas = {
  admin: {
    img: {
      src: "argyleink/olliolli.gif",
      alt: "",
      width: 382,
      height: 382,
    },
    handle: "admin",
    name: "Web Master",
  },
  google: {
    img: {
      src: "argyleink/google-avatar.jpg",
      alt: "",
      width: 400,
      height: 400,
    },
    handle: "Google",
    name: "DevRel",
  },
  argyleink: {
    img: {
      src: "argyleink/olliolli.gif",
      alt: "",
      width: 382,
      height: 382,
    },
    handle: "argyleink",
    name: "adam",
  },
  pops: {
    img: {
      src: "argyleink/olli.jpg",
      alt: "",
      width: 382,
      height: 382,
    },
    handle: "pops",
    name: "Dad",
  },
  csspodcast: {
    img: {
      src: "argyleink/csspodcast.jpg",
      alt: "",
      width: 2000,
      height: 2000,
    },
    handle: "theCSSpodcast",
    name: "Adam",
  },
  guichallenges: {
    img: {
      src: "argyleink/adoring_tbasig.png",
      alt: "",
      width: 1211,
      height: 681,
    },
    handle: "GUIchallenges",
    name: "Adam",
  }
}

export default new Map(Object.entries(personas))