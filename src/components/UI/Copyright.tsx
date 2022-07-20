import React from 'react'
import { Link, Typography } from '@mui/material'

export default function Copyright (props: any) {
  return (
    <Typography
      align="center"
      color="text.secondary"
      variant="body2"
      {...props}
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="http://iamcrudgenerator.me/"
      >
        IamCRUDgenerator
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
