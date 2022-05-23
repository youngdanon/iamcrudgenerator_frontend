import StateBaseStore from './StateBaseStore'
import Status from '../../enums'

/**  Состояние стора во время загрузки */
class FetchingStateStore extends StateBaseStore {
  constructor () {
    super()
    this.status = Status.Fetching
  }
}
export default FetchingStateStore
