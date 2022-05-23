/** Enum для статуса */
enum Status {
  /** Статус ошибки */
  Error,
  /** Статус нормального состояния */
  Success,
  /** Статус загрузки */
  Fetching,
}

export enum Pages {
  login = '/login',
  register = '/register'
}

export default Status
