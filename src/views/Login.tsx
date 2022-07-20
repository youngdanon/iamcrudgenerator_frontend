import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useStores } from '../hooks/useStores'
import { useNavigate } from 'react-router-dom'
import Copyright from '../components/UI/Copyright'
import { Pages } from '../enums'

export default function Login () {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const { userStore } = useStores()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    await userStore.tryLogin(username, password)
    if (userStore.state.isSuccess) {
      navigate(Pages.main)
    }
  }

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <Box
          component="div"
          sx={{ mt: 1 }}
        >
          <TextField
            autoComplete="username"
            id="username"
            label="Username"
            margin="normal"
            name="username"
            onChange={(value) => {
              setUsername(value.currentTarget.value)
            }}
            value={username}
            autoFocus
            fullWidth
            required
          />
          <TextField
            autoComplete="current-password"
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={(value) => {
              setPassword(value.currentTarget.value)
            }}
            type="password"
            value={password}
            fullWidth
            required
          />
          <Button
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
            fullWidth
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="#"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={() => navigate(Pages.register)}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
