import { MiddlewareHandlerContext } from '$fresh/server.ts';
import { parse } from 'https://esm.sh/accept-language-parser'
import { Locale, setLocale } from '~/utils/locale.ts'

export function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<Locale>,
) {
  const [lang] = parse(req.headers.get('accept-language') || undefined)

  if (lang) {
    ctx.state.code = lang.code
    ctx.state.region = lang.region || 'US'
  }
  else {
    ctx.state.code = 'en'
    ctx.state.region = 'US'
  }

  setLocale({code: ctx.state.code, region: ctx.state.region})

  return ctx.next()
}