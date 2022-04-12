const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');

module.exports = function override(config, env) {
  // config.output.publicPath = process.env.WEBPACK_PUBLIC_PATH;
  console.log('config.output', config.output);

  config.plugins.push(
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

  return config;
};
