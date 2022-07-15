import { action, makeObservable, observable } from 'mobx'
import { ProjectService } from '../../api/services.g'
import BaseStore from '../BaseStore'
import { SuccessStateStore } from '../StateStores'
import ErrorStateStore from '../StateStores/ErrorStateStore'
import ProjectStore from './ProjectStore'

class ProjectsStore extends BaseStore {
  /** Array of projects */
  @observable public projects: ProjectStore[]

  constructor () {
    super()
    makeObservable(this)
    this.projects = []
  }

  async fetchProjects () {
    try {
      const projectsData = await ProjectService.getProjectsApiV1ProjectGet()
      this.projects = projectsData.projects.map(
        (data) => new ProjectStore(data)
      )
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  @action
  clearStore (): void {
    this.projects = []

    this.state = new SuccessStateStore()
  }
}

export default ProjectsStore
