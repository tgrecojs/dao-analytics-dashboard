import Onboarding from '../MetamaskAuth/component'
import ViewDAO from '../ViewDAO/component'
import { useSelector } from 'react-redux'
import { isEmpty } from 'ramda'
import { isMobile } from '../../shared/utils/mobile'
import { getFleekMedia, getFleekMetadata } from '../MetamaskAuth/reducer'
import { FETCH_DAO_DATA, FETCH_DAO_DATA_ERROR } from '../ExistingDAO/reducer'
import RequestProgress from '../../shared/MUI/RequestProgress'
import { Box } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import { Item } from '../../shared/MUI/Item'

const OnboardWrapper = ({ children }) => (
  <Box
    sx={{
      width: 800,
      height: 700,
      bgcolor: 'primary.main',
      fontFamily: 'Roboto',
      p: 2,
      boxShadow: 3,
      minWidth: 350,
      margin: 'auto'
    }}
    ßß
  >
    {children}
  </Box>
)

const HomePage = () => {
  const nftMedia = useSelector((x) => x.userSessionState.fleekMedia)
  const status = useSelector((x) => x.setupDAOAnalyticsState.status)
  const viewState = useSelector((x) => x.viewDaoAnalyticsState)
  return viewState.status === FETCH_DAO_DATA_ERROR ? (
    <OnboardWrapper>
      <Item>Error</Item>
    </OnboardWrapper>
  ) : viewState.status === FETCH_DAO_DATA ? (
    <OnboardWrapper>
      <RequestProgress />{' '}
    </OnboardWrapper>
  ) : viewState.status === 'success' ? (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Item>
            <Typography align="center" variant="h2">
              DAO Name: {viewState.payload.daoName}
            </Typography>
          </Item>
        </Grid>{' '}
      </Grid>
    </Box>
  ) : (
    <>
      <Onboarding />
    </>
  )
}

export default HomePage
