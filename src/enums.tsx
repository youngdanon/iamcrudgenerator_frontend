import upArrow from './assets/icons/uparrow.svg'

export const icons = {
  upArrow,
}



/** Enum для статуса */
export enum Status {
  /** Статус ошибки */
  Error,
  /** Статус нормального состояния */
  Success,
  /** Статус загрузки */
  Fetching,
}

export enum Pages {
  login = '/login',
  register = '/register',
  main = '/main'
}
