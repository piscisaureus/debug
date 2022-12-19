export interface Locale {
  code: string;
  region: string;
}

const locale = {
  code: 'en',
  region: 'US',
}

export function setLocale(props:Locale): Locale {
  locale.code = props.code
  locale.region = props.region
  return locale
}

export function getLocale(): Locale {
  return locale
}

export function getLocaleString(): string {
  return locale.code + '-' + locale.region
}