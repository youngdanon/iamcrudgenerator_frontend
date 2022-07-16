import { action, makeObservable, observable, runInAction } from 'mobx'
import { UserService } from '../../api/services.g'
import { UserBase, UserCreate } from '../../api/types.g'
import { FetchingStateStore, StateBaseStore, SuccessStateStore } from '../StateStores'
import ErrorStateStore from '../StateStores/ErrorStateStore'
import BaseStore from '../BaseStore'
import { getToken, setTokenToStorage } from '../../utils'

class UserStore extends BaseStore {
  @observable public id?: number

  @observable public email: string

  @observable public username: string

  @observable public token: string

  constructor () {
    super()
    makeObservable(this)
    this.token = getToken() || ''
    this.id = undefined
    this.email = ''
    this.username = ''
    this.token = getToken() || ''
  }

  @action
  setUser (user: UserBase): void {
    this.id = user.id
    this.email = user.email
    this.username = user.username
  }

  get isAuthorized () {
    console.log('render isAuthorised')
    return !!this.id || !!getToken()
  }

  @action
  async fetchUserInfo () {
    if (this.token) {
      try {
        this.state = new FetchingStateStore()
        const userInfo = await UserService.getCurrentUserApiV1UserMeGet()
        this.setUser(userInfo)
        this.state = new SuccessStateStore()
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
      const userInfo = await UserService.getCurrentUserApiV1UserMeGet()
      this.setUser(userInfo)
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
      const userInfo = await UserService.getCurrentUserApiV1UserMeGet()
      this.setUser(userInfo)
      this.state = new SuccessStateStore()
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  @action
  clearStore (): void {
    this.email = ''

    this.username = ''

    this.id = undefined

    this.token = ''

    this.state = new StateBaseStore()
  }
}

export default UserStore
