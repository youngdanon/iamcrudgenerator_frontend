import { action, makeObservable, observable, runInAction } from 'mobx'
import { ProjectService, UserService } from '../../api/services.g'
import { UserBase, UserCreate, Project } from '../../api/types.g'
import { FetchingStateStore, SuccessStateStore } from '../StateStores'
import ErrorStateStore from '../StateStores/ErrorStateStore'
import BaseStore from '../BaseStore'
import { getToken, setTokenToStorage } from '../../utils'

class UserStore extends BaseStore {
  @observable public id?: number

  @observable public email: string

  @observable public username: string

  @observable public projects?: Project[]

  @observable public token: string

  constructor () {
    super()
    makeObservable(this)
    this.token = getToken() || ''
    this.id = undefined
    this.email = ''
    this.username = ''
    this.projects = []
    this.token = getToken() || ''
  }

  @action
  setUser (user: UserBase): void {
    this.id = user.id
    this.email = user.email
    this.username = user.username
  }

  get isAuthorized () {
    return !!this.id || !!getToken()
  }

  async fetchUserInfo () {
    if (this.token) {
      try {
        const userInfo = await UserService.getCurrentUserApiV1UserMeGet(
          { headers: { Authorization: `Bearer ${this.token}` } })
        this.setUser(userInfo)
      } catch (error) {
        this.state = new ErrorStateStore(error)
      }
    } else {
      this.state = new ErrorStateStore()
    }
  }

  @action
  async tryLogin (username: string, password: string) {
    try {
      this.state = new FetchingStateStore()
      const tokenInfo = await UserService.authApiV1UserAuthPost({
        username,
        password
      })
      if (tokenInfo.access_token) {
        setTokenToStorage(tokenInfo.access_token)
        this.token = tokenInfo.access_token
      }
      const userInfo = await UserService.getCurrentUserApiV1UserMeGet(
        { headers: { Authorization: `Bearer ${this.token}` } })
      this.setUser(userInfo)
      await this.tryGetProjects()
      this.state = new SuccessStateStore()
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  @action
  async tryRegister (data: UserCreate) {
    try {
      this.state = new FetchingStateStore()
      const createdUser = await UserService.createUserApiV1UserPost(data)
      runInAction(() => {
        if (createdUser?.token?.access_token) {
          setTokenToStorage(createdUser.token.access_token)
          this.token = createdUser.token.access_token
        }
      })
      const userInfo = await UserService.getCurrentUserApiV1UserMeGet(
        { headers: { Authorization: `Bearer ${this.token}` } })
      this.setUser(userInfo)
      await this.tryGetProjects()
      this.state = new SuccessStateStore()
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  @action
  async tryGetProjects () {
    try {
      this.state = new FetchingStateStore()
      const projectsList = await ProjectService.getProjectsApiV1ProjectGet({
        headers: { Authorization: `Bearer ${this.token}` }
      })
      runInAction(() => {
        this.projects = projectsList.projects
      })
      this.state = new SuccessStateStore()
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  @action
  clearStore (): void {
    this.email = ''

    this.username = 'undefined'

    this.id = undefined

    this.token = ''

    this.projects = []

    this.state = new SuccessStateStore()
  }
}

export default UserStore
