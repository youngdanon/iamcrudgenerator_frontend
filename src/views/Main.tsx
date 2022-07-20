import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import PageLayout from '../components/PageLayout'
import { useStores } from '../hooks/useStores'
import ProjectCard from '../components/ProjectCard'
import useModal from '../hooks/useModal'
import { runInAction } from 'mobx'

const MainPage: React.FC = () => {
  const { projectsStore } = useStores()

  useEffect(() => {
    projectsStore.fetchProjects()
  }, [])

  const { modal } = useModal()

  return (
    <MainLayout>
      <PageLayout
        buttons={[
          {
            title: 'OpenModal',
            onClick: () => {
              modal.open(
                {
                  title: 'Заголовок',
                  body: 'Текст модального окна',
                  onClose: () => modal.close()
                }
              )
            }
          }
        ]}
        title="My projects"
      >
        <div className="p-[1rem] px-[0.5rem] rounded-[8px] h-[41rem] overflow-y-scroll scrollbar ">
          <div className="flex flex-row flex-wrap gap-y-[1rem]">
            {projectsStore.projects.map((project, index) => (
              <div
                key={project.id}
                className="px-[0.5rem]
                 lg:w-[calc(100%/3)]
                 md:w-[calc(100%/2)]
                 w-full
                 "
              >
                <ProjectCard
                  createdAt={project.createdAt!}
                  id={project.id!}
                  isRunning={project.isRunning}
                  onPlayStopClick={() => {
                    runInAction(() => {
                      projectsStore.projects[index].changeIsRunning()
                    })
                  }}
                  ownerId={project.ownerId!}
                  title={project.name}
                  updatedAt={project.updatedAt!}
                />
              </div>
            ))}
          </div>
        </div>
      </PageLayout>
    </MainLayout>
  )
}

export default observer(MainPage)
