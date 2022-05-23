import React from 'react'
import { storeContext } from '../contexts'

export const useStores = () => React.useContext(storeContext)
