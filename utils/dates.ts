import { formatDistance, isToday } from 'npm:date-fns'
// import { en } from 'npm:date-fns/locale'

export function relDate(date) {
  return isToday(new Date(date), new Date())
    ? 'today'
    : formatDistance(new Date(date), new Date()) + ' ago'
}