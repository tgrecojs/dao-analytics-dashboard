import Onboarding from '../MetamaskAuth/component'
import { useDispatch, useSelector } from 'react-redux'
import {
  FETCH_DAO_DATA_ERROR,
  FETCH_GOVERNANCE_TOKEN_SUCCESS
} from '../ExistingDAO/reducer'
import RequestProgress from '../../shared/MUI/RequestProgress'
import { Box } from '@mui/system'
import { Grid, Typography } from '@mui/material'
import { Item } from '../../shared/MUI/Item'
import PieChart from '../../shared/charts/Pie/components'
import ClassAForm from '../ClassAForm/component'
import { createPieChart } from '../../shared/charts/format'
import SelectBox from '../../shared/MUI/SelectBox'
import { setter } from '../../shared/utils/input'
import { compose } from 'redux'
import { setRequestLimit } from '../GovernanceStats/reducer'
import { func } from 'prop-types'
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

OnboardWrapper.propTypes = {
  children: func
}
const HomePage = () => {
  const dispatch = useDispatch()
  const onChangeLimit = compose(dispatch, setRequestLimit)
  const status = useSelector((x) => x.viewDaoAnalyticsState.status)
  const viewState = useSelector((x) => x.existingOrgState)
  const governanceTokenDataState = useSelector(
    (x) => x.governanceTokenDataState
  )
  const { requestLimitIncrements } = governanceTokenDataState
  return status === 'fetch DAO data ready' ? (
    <Onboarding />
  ) : status === FETCH_DAO_DATA_ERROR ? (
    <OnboardWrapper>
      <Item>Error</Item>
    </OnboardWrapper>
  ) : status === 'governance fetch finished' ? (
    <Box
      sx={{
        width: '100%'
      }}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Item>
            <Typography align="center" variant="h2">
              DAO Name: {viewState.orgName}
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectBox
            label="Change token holders value"
            options={requestLimitIncrements}
            onChange={setter(onChangeLimit)}
          />
        </Grid>
        <Grid item xs={12}>
          <Item>
            <PieChart
              chartProps={{
                data: createPieChart(governanceTokenDataState.currentDataset)
              }}
            />
          </Item>
        </Grid>

        <Grid item xs={10} sm={6}>
          <Item>
            {' '}
            <ClassAForm />
          </Item>
        </Grid>
      </Grid>
    </Box>
  ) : status === FETCH_GOVERNANCE_TOKEN_SUCCESS || status === 'fetching' ? (
    <OnboardWrapper>
      <RequestProgress />{' '}
    </OnboardWrapper>
  ) : null
}

export default HomePage
