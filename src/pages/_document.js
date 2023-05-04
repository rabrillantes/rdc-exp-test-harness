import { getFeatureFlagProps, FeatureFlags } from '@moveinc/rdc-app-context'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static getInitialProps = async (ctx) => {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      featureFlagProps: getFeatureFlagProps(ctx)
    }
  }

  render () {
    return (
      <Html lang='en'>
        <Head>
          {/* head tags */}
        </Head>
        <body>
          <Main />
          <NextScript />
          <FeatureFlags {...this.props.featureFlagProps} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
