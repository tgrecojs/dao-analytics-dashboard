import { useEffect } from 'react'
import { func, string } from 'prop-types'
import { useDispatch } from 'react-redux'
import { setFliTokenStrategy } from '../Calculator/reducer'
const FliStrategySelectBox = ({ underlyingToken = 'eth', onChange }) => {
  useEffect(() => {
    dispatch(setFliTokenStrategy(underlyingToken))
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [underlyingToken])
  const dispatch = useDispatch()
  return (
    <>
      <label htmlFor="underlyingToken">Change Underlying Token</label>
      <select
        id="underlyingToken"
        defaultValue={underlyingToken}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="eth">ETH</option>
        <option value="btc">BTC</option>
      </select>
    </>
  )
}
FliStrategySelectBox.propTypes = {
  onChange: func,
  underlyingToken: string
}
export default FliStrategySelectBox
