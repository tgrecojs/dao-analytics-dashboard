const fetchCovalentData = async (url = '') => {
  const response = await fetch(`${url}&key=${process.env.COVALENT_API_KEY}`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
  const data = await response.json()
  return data
}

const makeClassAEndpoint = (chainId) =>
  `https://api.covalenthq.com/v1/${chainId}`

export { makeClassAEndpoint, fetchCovalentData }
