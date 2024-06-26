// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_name_ from "./routes/[name].tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_middleware from "./routes/_middleware.tsx";
import * as $follows from "./routes/follows.tsx";
import * as $index from "./routes/index.tsx";
import * as $rss from "./routes/rss.tsx";
import * as $Modal from "./islands/Modal.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/[name].tsx": $_name_,
    "./routes/_404.tsx": $_404,
    "./routes/_middleware.tsx": $_middleware,
    "./routes/follows.tsx": $follows,
    "./routes/index.tsx": $index,
    "./routes/rss.tsx": $rss,
  },
  islands: {
    "./islands/Modal.tsx": $Modal,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
