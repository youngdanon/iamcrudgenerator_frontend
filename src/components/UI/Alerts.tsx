import { autorun } from 'mobx'
import React, { useEffect, useState } from 'react'
import { useStores } from '../../hooks/useStores'
import { Alert } from '@mui/material'

const Alerts: React.FC = () => {
  const stores = Object.values(useStores())
  const [errors, setErrors] = useState<(string|undefined)[]>([])
  useEffect(
    () =>
      autorun(() => {
        stores.forEach((store) => {
          // ДОДЕЛАТЬ ОЧИСТКУ ОШИБОК
          if (store.state.isError) {
            setErrors([...errors, JSON.stringify(store.state.error)])
            console.log(errors)
          }
        })
      }
      ), [])
  return (
    <div>
        {errors.map((error, index) => {
          return error ? (<Alert key={index} severity='error'>{error}</Alert>) : ''
        })}
    </div>
  )
}

export default Alerts
