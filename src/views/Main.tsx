import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import PageLayout from '../components/PageLayout'
import { useStores } from '../hooks/useStores'

const MainPage: React.FC = () => {
  const { projectsStore } = useStores()

  useEffect(() => {
    projectsStore.fetchProjects()
  }, [])

  return (
    <MainLayout>
      <PageLayout
        title="Главная"
        buttons={[
          {
            title: 'Добавить',
            onClick: () => console.log('Добавить'),
            icon: 'upArrow'
          },
          {
            title: 'Добавить',
            onClick: () => console.log('Добавить'),
            icon: 'upArrow'
          },
          {
            title: 'Добавить',
            onClick: () => console.log('Добавить'),
            icon: 'upArrow'
          }
        ]}
      >
        {projectsStore.projects.map((project) => (
          <div key={project.id}>
            {project.id}
            {project.name}
          </div>
        ))}
      </PageLayout>
    </MainLayout>
  )
}

export default observer(MainPage)
