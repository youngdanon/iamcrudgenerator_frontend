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
    console.log(userStore)
    if (!userStore.username) {
      userStore.fetchUserInfo()
    }
  }, [])

  const logout = () => {
    removeToken()
    clearStores(stores)
    navigate(Pages.login)
  }

  if (isSidebarOpen) {
    return (
      <Card className="left-0 h-full w-[25rem] z-40 bg-white">
        <div className="flex flex-col h-full">
          <div className="grow flex flex-col text-left gap-y-4 h-full">
            <div className="flex flex-row">
              <div className=" flex flex-col">
                <h2 className="text-xl">
                  {userStore.username}
                </h2>
                <h3 className="text-sm font-light">
                  {userStore.email}
                </h3>
              </div>
              <img
                alt="arrow"
                src={icons.upArrow}
                className={'w-[1rem] h-[1rem] ml-auto my-auto mr-[0.5rem] rotate-[-90deg]'}
                onClick={() => { changeSidebarState() }}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <hr/>
              <Link color="error" underline="none" className="cursor-pointer"
                    onClick={logout}>Logout</Link>
            </div>
          </div>
          <Copyright/>
        </div>
      </Card>
    )
  }
  return (
    <div className="left-0 h-full w-[3rem] z-40 bg-white p-[1rem] border-gray-300 shadow rounded-tr-[16px] rounded-br-[16px] ">
      <div className="flex flex-col h-full mt-[0.5rem]">
        <img
          alt="arrow"
          src={icons.upArrow}
          className={'w-[1rem] h-[1rem] ml-auto mr-[0.5rem] rotate-[90deg]'}
          onClick={() => { changeSidebarState() }}
        />
      </div>
    </div>
  )
}

export default observer(Sidebar)
