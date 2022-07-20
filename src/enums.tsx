import upArrow from './assets/icons/uparrow.svg'
import triangle from './assets/icons/triangle.svg'
import cross from './assets/icons/cross.svg'
import edit from './assets/icons/edit.svg'

export const icons = {
  upArrow,
  triangle,
  cross,
  edit,
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
  main = '/projects',
}
