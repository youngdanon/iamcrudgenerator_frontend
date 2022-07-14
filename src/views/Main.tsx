import React from 'react'
import MainLayout from '../components/MainLayout'
import PageLayout from '../components/PageLayout'

const MainPage: React.FC = () => (
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
      <div>
        <h1>Main Page</h1>
      </div>
    </PageLayout>
  </MainLayout>
)

export default MainPage
