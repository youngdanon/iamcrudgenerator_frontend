import React, { useMemo, useState } from 'react'
import Sidebar from './Sidebar'

interface Props {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({
  children
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const changeSidebarState = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const layoutPadding = useMemo(() => {
    return isSidebarOpen ? 'p-[1rem]' : 'py-[1rem] pr-[1rem]'
  }, [isSidebarOpen])

  return (
    <div className={`fixed h-full w-full bg-secondary ${layoutPadding} flex flex-row gap-x-[1rem]`}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        changeSidebarState={() => changeSidebarState()}
      />
      { children }
    </div>
  )
}
export default MainLayout
