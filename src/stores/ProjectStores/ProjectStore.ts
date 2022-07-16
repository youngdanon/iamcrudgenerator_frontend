import { action, makeObservable, observable } from 'mobx'
import BaseStore from '../BaseStore'
import { Project } from '../../api/types.g'
import { StateBaseStore } from '../StateStores'

class ProjectStore extends BaseStore {
  /** Project id */
  @observable public id?: number
  /** Project owner id */
  @observable public owner_id?: number
  /** Project name */
  @observable public name: string
  /** Project create date */
  @observable public created_at?: string
  /** Project create date */
  @observable public updated_at?: string

  constructor (data: Project) {
    super()
    makeObservable(this)
    this.id = data.id
    this.owner_id = data.owner_id
    this.name = data.name
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }

  @action
  clearStore (): void {
    this.id = undefined
    this.owner_id = undefined
    this.name = ''
    this.created_at = undefined
    this.updated_at = undefined
    this.state = new StateBaseStore()
  }
}

export default ProjectStore
