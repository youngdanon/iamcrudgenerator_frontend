import { computed, observable } from 'mobx'
import Status from '../../enums'

/** Базовый класс состояния стора */
class StateBaseStore {
  /** Статус стора */
  @observable status: Status = Status.Success

  /** Ошибка стора */
  @observable error?: string

  /** Статус загрузки */
  @computed get isLoading (): boolean {
    return this.status === Status.Fetching
  }

  /** Показатель успешности */
  @computed get isSuccess (): boolean {
    return this.status === Status.Success
  }

  /** Наличие ошибки */
  @computed get isError (): boolean {
    return this.status === Status.Error
  }
}
export default StateBaseStore
