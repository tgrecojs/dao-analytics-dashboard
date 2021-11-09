import Head from 'next/head'
import CssBaseline from '@mui/material/CssBaseline'

import { ThemeProvider } from '@mui/material/styles'
import { Container } from '@mui/material'
import theme from '../../MUI/theme'
const WithLayout = (ComposedComponent) => ({
  // eslint-disable-next-line react/prop-types
  pageTitle = 'DAO Analytics Dashboard',
  ...rest
}) => {
  // eslint-disable-next-line react/prop-types

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
