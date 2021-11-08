import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'

import Link from 'next/link'
import { ThemeProvider } from '@mui/material/styles'

import {
  BottomNavigation,
  Card,
  Container,
  Grid,
  GridModal,
  Typography,
  CardContent,
  useMediaQuery
} from '@mui/material'
import { deepOrange, deepPurple, lightBlue, orange } from '@mui/material/colors'
import theme from '../../MUI/theme'
import { useMemo, useState } from 'react'
const WithLayout = (ComposedComponent) => ({
  pageTitle = 'DAO Analytics Dashboard',
  ...rest
}) => {
  // eslint-disable-next-line react/prop-types
  console.log('inside WithLayout:::', {theme})

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth={'xl'}>
          <ComposedComponent {...rest} />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default WithLayout
