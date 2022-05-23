import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom'
import Login from './views/Login'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Register from './views/Register'
import { Pages } from './enums'
import Alerts from './components/UI/Alerts'

const theme = createTheme()

function App () {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Alerts/>
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
        </Routes>
      </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
