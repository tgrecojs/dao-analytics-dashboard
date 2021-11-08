import { Button, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
import { setter } from '../../shared/utils/input'
import { getData, setOrgName } from './reducer'

const ExistingDAO = () => {
  const dispatch = useDispatch()

  const orgName = useSelector((x) => x.existingOrgState.orgName)
  const onOrgNameChange = compose(dispatch, setOrgName)

  const onViewDashboard = () =>
    dispatch(getData({ key: orgName.toLowerCase() }))
  return (
    <div>
      <TextField
        label="Orginzation Name"
        name="daoName"
        value={orgName}
        onChange={setter(onOrgNameChange)}
        sx={{ m: 2 }}
      />
      <Button
        sx={{ mt: 2.5 }}
        variant="outlined"
        size="large"
        onClick={onViewDashboard}
      >
        View Dashboard
      </Button>
    </div>
  )
}
export default ExistingDAO
