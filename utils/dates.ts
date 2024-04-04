//import { formatDistance, isToday } from "date-fns/esm/index.js";
//import * as Locales from "date-fns/esm/locale/index.js";
import { getLocale } from "~/utils/locale.ts";

export function relDate(date: Date) {
  const { code } = getLocale();
  return date.toString();
  //return formatDistance(new Date(date), new Date(), {locale: Locales[code]})
}
