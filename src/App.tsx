import React from 'react'
import './App.css'
import {
  BrowserRouter as Router, Navigate,
  Route,
  Routes
} from 'react-router-dom'
import Login from './views/Login'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Register from './views/Register'
import { Pages } from './enums'
import MainPage from './views/Main'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { useStores } from './hooks/useStores'
import { observer } from 'mobx-react'

const theme = createTheme()

const App: React.FC = () => {
  const { userStore } = useStores()
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              element={<Login/>}
              path={Pages.login}
            />
            <Route
              element={<Register/>}
              path={Pages.register}
            />
            { userStore.isAuthorized
              ? (
                <Route
                  element={<MainPage/>}
                  path={Pages.main}
                />
                )
              : (
                <Route
                  element={(
                    <Navigate
                      to={Pages.login}
                      replace
                    />
                )}
                  path="*"
                />
                )
          }
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default observer(App)
