import { IHero } from '~/utils/posts.ts'

export interface IPersona {
  img: IHero;
  handle: string;
  name: string;
}

const personas = {
  admin: {
    img: {
      src: "argyleink/css3-8bit.gif",
      alt: "An 8-bit adam, animated and occasionally looking at you.",
      width: 512,
      height: 512,
    },
    handle: "admin",
    name: "Web Master",
  },
  google: {
    img: {
      src: "argyleink/google-avatar.jpg",
      alt: "My google avatar.",
      width: 400,
      height: 400,
    },
    handle: "Google",
    name: "DevRel",
  },
  argyleink: {
    img: {
      src: "v1673498930/argyleink/olliolli.gif",
      alt: "A series of images of an avatar doing a bunch of skateboard tricks.",
      width: 382,
      height: 382,
    },
    handle: "argyleink",
    name: "adam",
  },
  pops: {
    img: {
      src: "argyleink/pops.jpg",
      alt: "Adam pointing at some homework with my 2 kids.",
      width: 512,
      height: 512,
    },
    handle: "pops",
    name: "Dad",
  },
  csspodcast: {
    img: {
      src: "argyleink/csspodcast.jpg",
      alt: "Una and I on the cover of our show.",
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
  },
  evil: {
    img: {
      src: "argyleink/evil-adam.jpg",
      alt: "Evil cyborg Adam",
      width: 1280,
      height: 1280
    },
    handle: "atom",
    name: "evil",
  }
}

export default new Map(Object.entries(personas))