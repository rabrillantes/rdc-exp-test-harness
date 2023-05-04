import { FeatureFlagContextProvider, getFeatureFlagProps, initializeFeatureFlags } from '@moveinc/rdc-app-context'
import { OptimiezelyProjects } from '@moveinc/rdc-app-context/lib/FeatureFlagContext/optimizely/projects'
import App from 'next/app'

const MyApp = ({ Component, featureFlagProps }) => {
  return (
    <FeatureFlagContextProvider {...featureFlagProps}>
      <Component />
    </FeatureFlagContextProvider>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext
  const { req, res } = ctx
  const isServer = req && res

  if (isServer) {
    await initializeFeatureFlags({
      timeout: 1000,
      project: OptimiezelyProjects.RDCX,
      env: 'development',
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
