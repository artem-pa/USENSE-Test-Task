export interface IExchabgeRate {
  cc: string,
  txt: string,
  rate: number
}

export interface IExchabgeRateFull extends IExchabgeRate {
  exchangedate: string,
  [prop: string]: string | number
}

export interface IExchabgeRateUsdEur {
  usd: number,
  eur: number,
  date: string
}