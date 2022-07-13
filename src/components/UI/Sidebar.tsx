import React, { useEffect } from 'react'
import { useStores } from '../../hooks/useStores'
import Card from './Card'
import { Link } from '@mui/material'
import Copyright from './Copyright'
import { useNavigate } from 'react-router-dom'
import { Pages } from '../../enums'
import { clearStores, removeToken } from '../../utils'
import { observer } from 'mobx-react'

const Sidebar: React.FC = () => {
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

  return (
    <Card className="left-0 h-full w-full z-40 bg-white">
      <div className="flex flex-col h-full">
        <div className="grow flex flex-col text-left gap-y-4 h-full">
          <div className=" flex flex-col">
            <h2 className="text-xl">
              {userStore.username}
            </h2>
            <h3 className="text-sm font-light">
              {userStore.email}
            </h3>
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

export default observer(Sidebar)
