module.exports = {
  staticFileGlobs: [
    'manifest.json',
	'node_modules/**/*',
    'src/**/*'
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    },
    {
      urlPattern: /^http:\/\/localhost:3000\/newtransactionHistory/,
      handler: 'networkFirst'
    },
    {
      //urlPattern: /\/data\//,
      urlPattern: /^http:\/\/localhost:3000\/newtransactionHistory/,
      //http://localhost:3000/newtransactionHistory
      handler: 'fastest'
    }
  ]
};