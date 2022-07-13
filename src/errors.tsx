/** Ошибка сервера */
export interface ServerError extends Error {
  detail?: string;
}
