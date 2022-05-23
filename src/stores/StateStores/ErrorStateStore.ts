import StateBaseStore from './StateBaseStore'
import Status from '../../enums'
import { ServerError } from '../../errors'
/** Состояние стора с ошибкой */
class ErrorStateStore extends StateBaseStore {
  constructor (error?: unknown) {
    super()
    this.status = Status.Error
    this.error = (error as ServerError)?.detail
  }
}
export default ErrorStateStore
