import { observable } from 'mobx'
import { StateBaseStore } from './StateStores'

abstract class BaseStore {
  @observable state: StateBaseStore

  protected constructor () {
    this.state = new StateBaseStore()
  }

  abstract clearStore (): void;
}
export default BaseStore
