import React, { useState, useRef } from 'react'
import { string, func, number, bool } from 'prop-types'
import { FormWrapper } from '../../shared/styled'
import { setter } from '../../shared/utils/input'
import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'

const CreateNewNFT = ({
  name = '',
  price = 0,
  mediaName = '',
  onSubmit,
  descriptionText = '',
  status = 'idle',
  userAddress = ''
}) => {
  const fileRef = useRef(null)

  const [daoName, setDaoName] = useState(name)
  const [governanceToken, setGovernanceToken] = useState(price)


  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      daoName,
      governanceToken
    })
    setDaoName('')
    setGovernanceToken('')
  }
  return (
    <div>
     <TextField label= "Orginization Name"
     required
     id="daoName"
     name="daoName"
     type="text"
     onChange={setter(setDaoName)}
     value={daoName}
     sx={{m:2}}
     />
   <TextField label= "Governane Token Address"
     required
     id="governanceToken"
     name="governanceToken"
     type="text"
     onChange={setter(setGovernanceToken)}
     value={governanceToken}
     sx={{m:2}}

     /> <Box> <Button sx={{m: 2}} fullWidth={true} variant="outlined" size="large">Create Dashboard</Button>
</Box>
      </div>
  )
  
}

CreateNewNFT.propTypes = {
  name: string,
  price: number,
  mediaName: string,
  onSubmit: func,
  descriptionText: string,
  isMinting: bool
}
export default CreateNewNFT
