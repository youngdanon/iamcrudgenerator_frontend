import React from 'react'
import Card from '../components/UI/Card'
import { observer } from 'mobx-react'

const ProjectsPage: React.FC = () => {
  return (
    <Card className="w-full h-full bg-white">
      <div className="flex flex-col gap-y-[2rem] m-[1rem]">
        <h1 className="text-5xl font-bold text-left">Projects</h1>
        <hr/>
        <div className="flex flex-col gap-y-[1rem]">
        </div>
      </div>
    </Card>
  )
}
export default observer(ProjectsPage)
