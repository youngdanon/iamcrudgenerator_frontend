import React from 'react'
import Sidebar from '../components/UI/Sidebar'
import Card from '../components/UI/Card'

const MainPage: React.FC = () => {
  return (
    <div className="fixed h-full w-full bg-blue-900 p-[1rem] flex flex-row gap-x-[1rem]">
      <div className="h-full w-[25rem]">
        <Sidebar/>
      </div>
      <Card className="w-full h-full bg-white">
        <div className="flex flex-col gap-y-[2rem] m-[1rem]">
          <h1 className="text-5xl font-bold text-left">Projects</h1>
          <hr/>
          <div className="flex flex-col gap-y-[1rem]">
          </div>
        </div>
      </Card>
    </div>
  )
}
export default MainPage
