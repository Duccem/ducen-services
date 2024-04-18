/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const projectRoot = __dirname;

const defaultConfig = getDefaultConfig(projectRoot);
// This can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(projectRoot, '../../../../../');

// 1. Watch all files within the monorepo
defaultConfig.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages and in what order
defaultConfig.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

defaultConfig.resolver.assetExts.push('db');

const defaultSourceExts = require('metro-config/src/defaults/defaults').sourceExts;
const sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json', 'svg', 'd.ts', 'mjs', 'ttf'].concat(defaultSourceExts);

defaultConfig.resolver.sourceExts = sourceExts;
defaultConfig.resolver.blockList = exclusionList([/node_modules\/mongodb\/.*/, /node_modules\/jws\/.*/]);
defaultConfig.resolver.extraNodeModules = {
  fs: require.resolve('./empty.js'),
  os: require.resolve('./empty.js'),
  path: require.resolve('./empty.js'),
  crypto: require.resolve('./empty.js'),
  stream: require.resolve('./empty.js'),
  zlib: require.resolve('./empty.js'),
  assert: require.resolve('./empty.js'),
  http: require.resolve('./empty.js'),
  https: require.resolve('./empty.js'),
  url: require.resolve('./empty.js'),
  dns: require.resolve('./empty.js'),
  net: require.resolve('./empty.js'),
  tls: require.resolve('./empty.js'),
  mongodb: require.resolve('./empty.js'),
  cloudinary: require.resolve('./empty.js'),
  child_process: require.resolve('./empty.js'),
  querystring: require.resolve('./empty.js'),
  'firebase-admin': require.resolve('./empty.js'),
  nodemailer: require.resolve('./empty.js'),
  jws: require.resolve('./empty.js'),
};

module.exports = defaultConfig;
