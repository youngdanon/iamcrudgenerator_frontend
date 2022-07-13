import BaseStore from './stores/BaseStore'

export const getToken = (): string => {
  const token = localStorage.getItem(process.env.REACT_APP_TOKEN_NAME || 'token')
  if (token) {
    return token
  }
  return ''
}

export const setTokenToStorage = (token: string): void => {
  localStorage.setItem(process.env.REACT_APP_TOKEN_NAME || 'token', token)
}

export const removeToken = (): void => {
  localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME || 'token')
}

export const clearStores = (stores: {[storeName: string]: BaseStore }): void => {
  Object.values(stores).forEach(store => {
    store.clearStore()
  })
}
