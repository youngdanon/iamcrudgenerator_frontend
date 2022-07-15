import { createContext } from 'react'
import { ProjectsStore } from '../stores/ProjectStores'
import { UserStore } from '../stores/UserStore'

export const storeContext = createContext({
  userStore: new UserStore(),
  projectsStore: new ProjectsStore()
})
