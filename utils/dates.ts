import { formatDistance, isToday } from 'https://esm.sh/date-fns'
import * as Locales from 'https://esm.sh/date-fns/locale'
import { getLocale } from '~/utils/locale.ts'

export function relDate(date:Date) {
  const {code} = getLocale()

  return formatDistance(new Date(date), new Date(), {locale: Locales[code]})
}