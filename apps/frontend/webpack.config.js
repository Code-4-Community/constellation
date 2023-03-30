const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.plugins.push(new NodePolyfillPlugin());

  return {
    ...config,
    resolve: {
      ...config.resolve,
      // don't know what alias does but seemed to fix a similar problem with aws-amplify
      // as described in this GitHub issue: https://github.com/aws-amplify/amplify-js/issues/9639
      alias: {
        './runtimeConfig': './runtimeConfig.browser',
      },
    },
  };
});
