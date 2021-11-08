import fleekStorage from '@fleekhq/fleek-storage-js'
const stringifyPayload = (obj = {}) => `"${JSON.stringify(obj)}"`
const postToFleekStorage = async ({
  sanitizedName = 'default DAO name',
  orginizationName = '',
  governanceTokenAddress = '0x0954906da0bf32d5479e25f46056d22f08464cab',
  creationDate = 'Mon, 22 Jul 1992 01:00:00 GMT'
}) => {
  const response = await fleekStorage.upload({
    apiKey: process.env.FLEEK_API_KEY,
    apiSecret: process.env.FLEEK_API_SECRET,
    key: `${sanitizedName}`, //?
    bucket: createFleekBucketString(`${sanitizedName}-data`),
    data: JSON.stringify({
      daoName: orginizationName,
      governanceToken: governanceTokenAddress,
      creationDate
    })
  })

  // The function returns the hash of the file, the publicUrl, the key and the bucket.
  const { hash, key, publicUrl } = await response
  return { hash, key, publicUrl }
}

const createFleekBucketString = (key) =>
  `tgrecojs-74725-team-bucket/DAO-Analytics/${key}`

const fetchFromFleekStorage = async ({ key = 'default-key' }) => {
  const response = await fleekStorage.get({
    apiKey: process.env.FLEEK_API_KEY,
    apiSecret: process.env.FLEEK_API_SECRET,
    key,
    bucket: createFleekBucketString(`${key}-data`),
    getOptions: ['data', 'key', 'publicUrl']
  })
  console.log({ response })
  return response
}

export { fetchFromFleekStorage, postToFleekStorage }
