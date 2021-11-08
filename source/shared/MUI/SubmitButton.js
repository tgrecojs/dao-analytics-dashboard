import { Button } from '@mui/material'
import { func, object, string } from 'prop-types'

const defaultButtonProps = {
  sx: {
    m: 2
  },
  fullWidth: true,
  variant: 'outlined'
}

const SubmitButton = ({
  buttonText = 'Default Button Text',
  buttonProps = defaultButtonProps,
  onClick
}) => (
  <Button {...buttonProps} onClick={onClick}>
    {buttonText}
  </Button>
)

SubmitButton.propTypes = {
  buttonText: string,
  buttonProps: object,
  onClick: func
}

export default SubmitButton
