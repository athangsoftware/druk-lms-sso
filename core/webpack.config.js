const path = require('path');

module.exports = function (options) {
  return {
    ...options,
    devtool: 'source-map',
    resolve: {
      ...options.resolve,
      extensions: ['.tsx', '.ts', '.js', '.json'],
      extensionAlias: {
        '.js': ['.js', '.ts'],
        '.cjs': ['.cjs', '.cts'],
        '.mjs': ['.mjs', '.mts'],
      },
    },
    module: {
      ...options.module,
      rules: [
        ...options.module.rules,
        {
          test: /\.ts$/,
          include: path.resolve(__dirname, 'libs/prisma/generated'),
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                configFile: path.resolve(__dirname, 'tsconfig.json'),
              },
            },
          ],
        },
      ],
    },
  };
};
