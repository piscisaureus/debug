import { formatDistance, isToday } from 'date-fns'
import * as Locales from 'date-fns/locale'
import { getLocale } from '~/utils/locale.ts'

export function relDate(date:Date) {
  const {code} = getLocale()

  return formatDistance(new Date(date), new Date(), {locale: Locales[code]})
}