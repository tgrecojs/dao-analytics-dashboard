import { Button, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
import { setter } from '../../shared/utils/input'
import { setOrgName } from './reducer'

const ExistingDAO = () => {
  const dispatch = useDispatch()

  const orgName = useSelector((x) => x.existingOrgState.orgName)
  const onOrgNameChange = compose(dispatch, setOrgName)

  return (
    <div>
        <TextField 
        label="Orginzation Name"
        name="daoName" value={orgName} onChange={setter(onOrgNameChange)}      sx={{m:2}}
        />
  <Button sx={{mt:2.5}} variant="outlined" size="large">View Dashboard</Button>
  </div>
  )
}
export default ExistingDAO