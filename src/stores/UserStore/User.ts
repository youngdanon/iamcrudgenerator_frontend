import { makeAutoObservable } from 'mobx'
import { UserBase, TokenBase } from '../../api/types.g'

class User {
  constructor (public data: TokenBase & UserBase) {
    makeAutoObservable(this)
  }
}
export default User
