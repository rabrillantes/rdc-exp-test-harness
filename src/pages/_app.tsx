import { FeatureFlagContextProvider, getFeatureFlagProps, initializeFeatureFlags } from '@moveinc/rdc-app-context'
import { OptimizelyEnvs, OptimizelyProjects } from '@moveinc/rdc-optimizely';
import App from 'next/app'
import { ReactElement } from 'react'

const MyApp = ({ Component, featureFlagProps }): ReactElement => {
  return (
    <FeatureFlagContextProvider {...featureFlagProps}>
      <Component />
    </FeatureFlagContextProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext
  const { req, res } = ctx
  const isServer = Boolean(req ?? res)

  if (isServer) {
    await initializeFeatureFlags({
      timeout: 1000,
      project: OptimizelyProjects.RDCX,
      env: OptimizelyEnvs.DEVELOPMENT,
      logger: console,
      userId: res.locals?.vst,
      ctx
    })
  }

  const appProps = await App.getInitialProps(appContext)

  return {
    ...appProps,
    featureFlagProps: { ...getFeatureFlagProps(ctx) }
  }
}

export default MyApp
