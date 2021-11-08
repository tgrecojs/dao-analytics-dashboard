import React, { useState, useRef } from 'react'
import { string, func, number, bool } from 'prop-types'
import { setter } from '../../shared/utils/input'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import SubmitButton from '../../shared/MUI/SubmitButton'
import { useDispatch, useSelector } from 'react-redux'
import { setOrgName, setContractAddress } from '../ExistingDAO/reducer'
import { setupDaoAnalyticsPage } from './reducer'
import { compose } from 'redux'
const ethAddressRegex = '/0x[a-fA-F0-9]{40}/g'
const getDaoInfo = ({ existingOrgState }) => existingOrgState

const CreateNewDAO = ({ onSubmit }) => {
  const dispatch = useDispatch()
  const onSetDaoName = compose(dispatch, setOrgName)
  const onSetContractAddress = compose(dispatch, setContractAddress)

  const { orgName: daoName, contractAddress, hideForm } = useSelector(
    getDaoInfo
  )

  return !hideForm ? (
    <div>
      <TextField
        label="Orginization Name"
        required
        id="daoName"
        name="daoName"
        type="text"
        onChange={setter(onSetDaoName)}
        value={daoName}
        sx={{ m: 2 }}
      />
      <TextField
        label="Governane Token Address"
        required
        id="governanceToken"
        name="governanceToken"
        type="text"
        onChange={setter(onSetContractAddress)}
        value={contractAddress}
        sx={{ m: 2 }}
      />
      <Box>
        <SubmitButton buttonText="Create Dashboard" onClick={onSubmit} />
      </Box>
    </div>
  ) : null
}

CreateNewDAO.propTypes = {
  orgName: string,
  governanceTokenAddress: string,
  onSubmit: func
}
export default CreateNewDAO
