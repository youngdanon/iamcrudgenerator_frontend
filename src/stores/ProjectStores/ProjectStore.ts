import { action, makeObservable, observable } from 'mobx'
import BaseStore from '../BaseStore'
import { Project } from '../../api/types.g'
import { StateBaseStore } from '../StateStores'

class ProjectStore extends BaseStore {
  /** Project id */
  @observable public id?: number
  /** Project owner id */
  @observable public ownerId?: number
  /** Project name */
  @observable public name: string
  /** Project create date */
  @observable public createdAt?: string
  /** Project create date */
  @observable public updatedAt?: string

  @observable public isRunning: boolean

  constructor (data: Project) {
    super()
    makeObservable(this)
    this.id = data.id
    this.ownerId = data.owner_id
    this.name = data.name
    this.createdAt = data.created_at
    this.updatedAt = data.updated_at
    this.isRunning = true
  }

  @action
  changeIsRunning (): void {
    this.isRunning = !this.isRunning
  }

  @action
  clearStore (): void {
    this.id = undefined
    this.ownerId = undefined
    this.name = ''
    this.createdAt = undefined
    this.updatedAt = undefined
    this.state = new StateBaseStore()
  }
}

export default ProjectStore
