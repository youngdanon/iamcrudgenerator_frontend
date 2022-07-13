import { createContext } from 'react'
import { UserStore } from '../stores/UserStore'

export const storeContext = createContext({
  userStore: new UserStore()
})
