import { observable } from 'mobx'
import StateBaseStore from './StateStores/StateBaseStore'
import { SuccessStateStore } from './StateStores'

abstract class BaseStore {
  @observable state: StateBaseStore

  protected constructor () {
    this.state = new SuccessStateStore()
  }

  abstract clearStore (): void;
}
export default BaseStore
