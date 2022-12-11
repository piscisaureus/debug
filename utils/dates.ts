import { formatDistance, isToday } from 'https://esm.sh/date-fns'
// import { en } from 'https://unpkg.com/date-fns/esm/locale'

export function relDate(date:Date) {
  return isToday(new Date(date), new Date())
    ? 'today'
    : formatDistance(new Date(date), new Date()) + ' ago'
}