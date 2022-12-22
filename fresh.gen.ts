// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/_404.tsx";
import * as $2 from "./routes/_middleware.tsx";
import * as $3 from "./routes/index.tsx";
import * as $$0 from "./islands/Modal.tsx";
import * as $$1 from "./islands/Pic.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/_404.tsx": $1,
    "./routes/_middleware.tsx": $2,
    "./routes/index.tsx": $3,
  },
  islands: {
    "./islands/Modal.tsx": $$0,
    "./islands/Pic.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
