import React, { useMemo, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useStores } from '../hooks/useStores'
import { useNavigate } from 'react-router-dom'
import Copyright from '../components/UI/Copyright'
import { Pages } from '../enums'

export default function Register () {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [secondPassword, setSecondPassword] = useState<string>('')
  const [isPasswordValidationFailed, setIsPasswordValidationFailed] = useState<boolean>(false)
  const [isEmailValidationFailed, setIsEmailValidationFailed] = useState(false)

  const { userStore } = useStores()
  const navigate = useNavigate()

  const isEmailValid = () => {
    setIsEmailValidationFailed(() => {
      return !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/
        )
    })
  }

  const isPasswordsValid = () => {
    if (secondPassword === password) {
      setIsPasswordValidationFailed(false)
      return true
    } else {
      setIsPasswordValidationFailed(true)
      return false
    }
  }

  const handleSubmit = async () => {
    if (!isPasswordValidationFailed && !isEmailValidationFailed) {
      await userStore.tryRegister({ email, password, username })
      if (userStore.state.isSuccess) {
        navigate(Pages.main)
      }
    }
  }

  const emailError = useMemo(() => {
    return email.length !== 0 ? 'Incorrect email' : 'Email is required'
  }
  , [email])

  return (
    <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              onChange={(value) => {
                setEmail(value.currentTarget.value)
              }}
              onBlur={isEmailValid}
              onFocus={() => setIsEmailValidationFailed(false)}
              value={email}
              error={isEmailValidationFailed}
              helperText={isEmailValidationFailed ? emailError : ''}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              onChange={(value) => {
                setUsername(value.currentTarget.value)
              }}
              value={username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(value) => {
                setPassword(value.currentTarget.value)
              }}
              value={password}
              error={isPasswordValidationFailed}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="RepeatPassword"
              label="Repeat Password"
              type="password"
              id="RepeatPassword"
              onChange={(value) => {
                setSecondPassword(value.currentTarget.value)
              }}
              onBlur={isPasswordsValid}
              value={secondPassword}
              error={isPasswordValidationFailed}
              helperText={isPasswordValidationFailed ? 'Пароли не совпадают' : ''}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={() => navigate(Pages.login)} variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  )
}
