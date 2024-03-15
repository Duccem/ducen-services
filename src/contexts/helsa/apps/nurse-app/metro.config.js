/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

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

module.exports = defaultConfig;
