import React, { useEffect, useMemo, useState } from 'react'
import Sidebar from './Sidebar'
import { useIdle } from 'react-use'
import { useStores } from '../hooks/useStores'
import { useNavigate } from 'react-router-dom'
import { clearStores, removeToken } from '../utils'
import { Pages } from '../enums'

interface Props {
  children: React.ReactNode
}

const MainLayout: React.FC<Props> = ({
  children
}) => {
  const stores = useStores()

  const navigate = useNavigate()

  /** Таймер бездействия на 10минут */
  const isIdle = useIdle(6e5)

  useEffect(() => {
    if (isIdle) {
      removeToken()
      clearStores(stores)
      navigate(Pages.login)
    }
  }
  , [isIdle])

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
