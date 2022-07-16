import React, { useEffect } from 'react'
import { useStores } from '../hooks/useStores'
import Card from './UI/Card'
import { Link } from '@mui/material'
import Copyright from './UI/Copyright'
import { useNavigate } from 'react-router-dom'
import { icons, Pages } from '../enums'
import { clearStores, removeToken } from '../utils'
import { observer } from 'mobx-react'

interface SidebarProps {
  isSidebarOpen: boolean
  changeSidebarState: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  changeSidebarState
}) => {
  const { userStore } = useStores()
  const stores = useStores()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userStore.username) {
      userStore.fetchUserInfo()
    }
  }, [])

  const logout = () => {
    removeToken()
    clearStores(stores)
    navigate(Pages.login)
  }

  return (
      <Card className={`transition-all duration-100
      ${isSidebarOpen
        ? 'left-0 h-full z-40 bg-white w-[25rem]'
        : 'left-0 h-full w-[4rem] z-40 bg-white  border-gray-300 shadow rounded-tr-[16px] rounded-br-[16px]'}`}>
        <div className="flex flex-col h-full">
          <div className="grow flex flex-col text-left gap-y-4 h-full">
            <div className="flex flex-row">
              <div className={`flex flex-col ${!isSidebarOpen && 'hidden'}`}>
                <h2 className="text-xl">
                  {userStore.username}
                </h2>
                <h3 className="text-sm font-light">
                  {userStore.email}
                </h3>
              </div>
              <div
                className={`p-[0.5rem] my-auto rounded-full hover:border-gray-300 hover:shadow 
                ${isSidebarOpen ? 'ml-auto mr-[0.5rem]' : 'mx-auto'}`}
                onClick={() => { changeSidebarState() }}
              >
                <img
                  alt="arrow"
                  src={icons.upArrow}
                  className={`w-[1rem] h-[1rem] ${isSidebarOpen ? 'rotate-[-90deg]' : 'rotate-[90deg]'} transition-all duration-500`}
                />
              </div>
            </div>
            <div className={`flex flex-col gap-y-2 ${!isSidebarOpen && 'hidden'}`}>
              <hr/>
              <Link color="error" underline="none" className="cursor-pointer"
                    onClick={logout}>Logout</Link>
            </div>
          </div>
          <div className={`${!isSidebarOpen && 'hidden'}`}>
            <Copyright/>
          </div>
        </div>
      </Card>
  )
}

export default observer(Sidebar)
