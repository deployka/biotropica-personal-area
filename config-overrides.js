('use-strict');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  config.output.publicPath = process.env.WEBPACK_PUBLIC_PATH;

  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/@zoom/videosdk/dist/lib',
          to: 'public/lib',
        },
      ],
    }),
    new ModuleFederationPlugin({
      name: 'biotropikaPersonalArea',
      remotes: {
        'biotropika-chat': process.env.REACT_APP_MF_CHAT_URL,
      },
      filename: 'remoteEntry.js',
      exposes: {
        './PublicProfile':
          './src/components/PublicProfile/containers/PublicProfile',
      },
      shared: ['react', 'react-dom'],
    }),
    new ExternalTemplateRemotesPlugin(),
  );

  config.devServer = {
    devMiddleware: {
      writeToDisk: true,
    },
  };

  return config;
};
