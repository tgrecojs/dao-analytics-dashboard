import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
  sendTransaction,
  reportSuccess,
  reportError,
  handleError,
  mintToken,
  reportMintSuccess,
  reportMintError,
  handleMintError
} from './reducer'
import {
  setFleekMedia,
  setFleekMetadata,
  getFleekMedia,
  getZoraResponseData
} from '../MetamaskAuth/reducer'
import { postMetadataToFleek, postToFleekStorage } from '../../shared/api/fleek'
import { sanitizeString } from '../../shared/utils'

const createZoraReqObject = async ({ tokenUri, daoName, imgSrc, price }) => {
  const contentHash = await sha256FromFile(Buffer.from(tokenUri))
  console.log({ contentHash })
  const metadataHash = await sha256FromBuffer(
    Buffer.from(JSON.stringify({ price, daoName, imgSrc }))
  )
  return { contentHash, metadataHash }
}

const createMetadata = ({
  name = 'default NFT name',
  description = 'default NFT description',
  mimeType = 'image/default'
}) => ({
  version: `${name}-${new Date().toUTCString()}`,
  name,
  description,
  mimeType
})

const sampleVersion = 'zora-20210101'

const hashString = (str) => sha256FromBuffer(''.concat(Buffer.from(str)))

export function* fleekGetSaga(action) {
  try {

  } catch(error) {

  }
}
export function* fleekUploadSaga(action) {
  try {
    const {
      tokenUri,
      price,
      description,
      creator,
      daoName,
      mimeType
    } = action.payload
    console.log({ mimeType })
    const sanitizedName = sanitizeString(daoName)

    const fleekMedia = yield call(postToFleekStorage, {
      tokenUri,
      sanitizedName,
      creator
    })

    const fleekMetadata = yield call(postMetadataToFleek, {
      imgUrl: fleekMedia.publicUrl,
      daoName,
      sanitizedName,
      price,
      description,
      creator
    })

    // need to validate this data firt
    const metadataJSON = yield generateMetadata(sampleVersion, {
      name: daoName,
      mimeType,
      description,
      version: sampleVersion
    })

    const metadataHash = hashString(metadataJSON)
    console.log({ metadataJSON, metadataHash })

    yield put(
      reportSuccess({
        fleekMedia: {
          ...fleekMedia,
          daoName: sanitizedName,
          price,
          description
        },
        fleekMetadata
      })
    )
  } catch (error) {
    yield put(reportError(error))
    yield put(handleError(error))
  }
}



function* initializeMintSaga(action) {
  yield put(setFleekMedia(action.payload.fleekMedia))
  yield put(setFleekMetadata(action.payload.fleekMetadata))
}

export function* mintTokenWatcher() {
  yield takeLatest(reportSuccess().type, initializeMintSaga)
}

function* watchFetchMetamaskAccount() {
  yield takeLatest(sendTransaction().type, fleekUploadSaga)
}

export default watchFetchMetamaskAccount
