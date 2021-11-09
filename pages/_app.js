import React from 'react'
import withReduxStore from '../lib/with-redux-store'
import { Provider } from 'react-redux'
import { object } from 'prop-types'
import { CacheProvider } from '@emotion/react'

import createEmotionCache from '../source/shared/MUI/createEmotionCache'
const styleCache = createEmotionCache()

function MyApp({
  // eslint-disable-next-line react/prop-types
  Component,
  emotionCache = styleCache,
  pageProps,
  reduxStore
}) {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    </CacheProvider>
  )
}
MyApp.propTypes = {
  emotionCache: object,
  pageProps: object,
  reduxStore: object
}

export default withReduxStore(MyApp)
