import { makeAutoObservable, runInAction } from 'mobx'
import { UserService } from '../../api/services.g'
import { UserBase, TokenBase, UserCreate } from '../../api/types.g'
import { FetchingStateStore, StateBaseStore, SuccessStateStore } from '../StateStores'
import ErrorStateStore from '../StateStores/ErrorStateStore'
import User from './User'

const tokenName = process.env.REACT_APP_TOKEN_NAME || 'token'

const getToken = () => localStorage.getItem(tokenName)
const setTokenToStorage = (token: string) => {
  localStorage.setItem(tokenName, token)
}

class UserStore {
  public email?: string

  public username?: string

  public password?: string

  public secondPassword?: string

  public data!: User

  /** Состояние стора */
  public state!: StateBaseStore

  public get user () {
    return this.data.data
  }

  public get userId () {
    return this.user.id
  }

  constructor (data?: TokenBase & UserBase) {
    makeAutoObservable(this)
    if (data) {
      this.data = new User(data)
    }
  }

  updateTokenFromStorage () {
    if (!this.user.access_token) {
      const tempToken = getToken()
      this.data = new User({ ...this.user, access_token: tempToken as string })
    }
  }

  async getUserInfo () {
    this.updateTokenFromStorage()
    if (this.user.access_token) {
      try {
        const data = await UserService.getCurrentUserApiV1UserMeGet()
        runInAction(() => {
          this.data = new User({ ...this.user, ...data })
        })
      } catch (error) {
        this.state = new ErrorStateStore(error)
      }
    } else {
      this.state = new ErrorStateStore()
    }
  }

  async tryLogin () {
    try {
      this.state = new FetchingStateStore()
      const tokenInfo = await UserService.authApiV1UserAuthPost({
        username: this.username as string,
        password: this.password as string
      })
      runInAction(() => {
        if (tokenInfo.access_token) {
          setTokenToStorage(tokenInfo.access_token)
        }
      })
      const userInfo = await UserService.getCurrentUserApiV1UserMeGet({ headers: { Authorization: `Bearer ${getToken()}` } })
      runInAction(() => {
        this.data = new User({ ...tokenInfo, ...userInfo })
      })
      this.state = new SuccessStateStore()
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  async tryRegister (data: UserCreate) {
    try {
      this.state = new FetchingStateStore()
      const createdUser = await UserService.createUserApiV1UserPost(data)
      runInAction(() => {
        if (createdUser?.token?.access_token) {
          setTokenToStorage(createdUser?.token?.access_token)
        }
      })
      const userInfo = await UserService.getCurrentUserApiV1UserMeGet({ headers: { Authorization: `Bearer ${getToken()}` } })
      runInAction(() => {
        this.data = new User({ ...createdUser.token as TokenBase, ...userInfo })
      })
      this.state = new SuccessStateStore()
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }
}

export default UserStore
