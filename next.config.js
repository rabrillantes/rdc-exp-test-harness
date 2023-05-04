const nextConfig = {
  async rewrites () {
    return [
      {
        source: '/api/v1/datafile',
        destination: 'https://alpha.realtor.com/api/v1/datafile'
      }
    ]
  },
  transpilePackages: ['@moveinc/rdc-app-context']
}

module.exports = nextConfig
