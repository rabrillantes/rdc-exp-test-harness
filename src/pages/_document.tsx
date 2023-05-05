import { FeatureFlags, getFeatureFlagProps } from '@moveinc/rdc-app-context'
import Document, { DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document'
import { ReactElement } from 'react'

class MyDocument extends Document {
  static getInitialProps = async (ctx): Promise<DocumentInitialProps & { featureFlagProps: any }> => {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      featureFlagProps: getFeatureFlagProps(ctx)
    }
  }

  render (): ReactElement {
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
