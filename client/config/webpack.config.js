/* eslint-env node, es6 */

const fs = require('fs');
const path = require('path');
const ForkTsCheckerWebpackPlugin = process.env.TSC_COMPILE_ON_ERROR === 'true' ? require('react-dev-utils/ForkTsCheckerWarningWebpackPlugin') : require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const resolve = require('resolve');
const TerserPlugin = require('terser-webpack-plugin');
const { DefinePlugin, EnvironmentPlugin } = require('webpack');
const { optionParser: app, cssModuleIdent: getLocalIdent, GracefulFsPlugin, WebOSMetaPlugin } = require('@enact/dev-utils');
const createEnvironmentHash = require('./createEnvironmentHash');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function (env, contentHash = false, isomorphic = false, noAnimation = false, framework = false, ilibAdditionalResourcesPath) {
  process.chdir(app.context);

  // Load applicable .env files into environment variables.
  require('./dotenv').load(app.context);

  // Check if TypeScript is setup
  const useTypeScript = fs.existsSync('tsconfig.json');

  process.env.NODE_ENV = env || process.env.NODE_ENV;
  const isEnvProduction = process.env.NODE_ENV === 'production';

  // NOTE: ilib에서 node_modules를 정상적으로 가져오지 못하는 이슈 때문에 `replace(/^\/$/, '')` 부분을 삭제함(240514)
  const publicPath = getPublicUrlOrPath(!isEnvProduction, app.publicUrl, process.env.PUBLIC_URL);

  // Source maps are resource heavy and can cause out of memory issue for large source files.
  // By default, sourcemaps will be used in development, however it can universally forced
  // on or off by setting the GENERATE_SOURCEMAP environment variable.
  const GENERATE_SOURCEMAP = process.env.GENERATE_SOURCEMAP || (isEnvProduction ? 'false' : 'true');
  const shouldUseSourceMap = GENERATE_SOURCEMAP !== 'false';

  // common function to get style loaders
  const getStyleLoaders = (cssLoaderOptions = {}, preProcessor) => {
    // Multiple styling-support features are used together, bottom-to-top.
    // An optonal preprocessor, like "less loader", compiles LESS syntax into CSS.
    // "postcss" loader applies autoprefixer to our CSS.
    // "css" loader resolves paths in CSS and adds assets as dependencies.
    // `MiniCssExtractPlugin` takes the resulting CSS and puts it into an
    // external file in our build process. If you use code splitting, any async
    // bundles will stilluse the "style" loader inside the async code so CSS
    // from them won't be in the main CSS file.
    // When INLINE_STYLES env var is set, instead of MiniCssExtractPlugin, uses
    // `style` loader to dynamically inline CSS in style tags at runtime.
    const loaders = [
      process.env.INLINE_STYLES ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
      {
        loader: require.resolve('css-loader'),
        options: Object.assign({ sourceMap: shouldUseSourceMap }, cssLoaderOptions, {
          url: {
            filter: (url) => {
              // Don't handle absolute path urls
              if (url.startsWith('/')) {
                return false;
              }

              return true;
            },
          },
        }),
      },
    ];
    if (preProcessor) {
      loaders.push(preProcessor);
    }
    return loaders;
  };

  const getAdditionalModulePaths = (paths) => {
    if (!paths) return [];
    return Array.isArray(paths) ? paths : [paths];
  };

  /** @typedef {import("webpack").Configuration} */
  const config = {
    mode: isEnvProduction ? 'production' : 'development',
    // Don't attempt to continue if there are any errors.
    bail: true,
    // Webpack noise constrained to errors and warnings
    stats: 'errors-warnings',
    // Use source maps during development builds or when specified by GENERATE_SOURCEMAP
    devtool: shouldUseSourceMap && (isEnvProduction ? 'source-map' : 'cheap-module-source-map'),
    // These are the "entry points" to our application.
    entry: {
      main: [
        // Include any polyfills needed for the target browsers.
        require.resolve('./polyfills'),
        // This is your app's code
        app.context,
      ],
    },
    output: {
      // The build output directory.
      path: path.resolve('./dist'),
      // Generated JS file names (with nested folders).
      // There will be one main bundle, and one file per asynchronous chunk.
      // We don't currently advertise code splitting but Webpack supports it.
      filename: contentHash ? '[name].[contenthash].js' : '[name].js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: contentHash ? 'chunk.[name].[contenthash].js' : 'chunk.[name].js',
      assetModuleFilename: contentHash ? '[path][name][contenthash][ext]' : '[path][name][ext]',
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: !isEnvProduction,
      publicPath,
      // Improved sourcemap path name mapping for system filepaths
      devtoolModuleFilenameTemplate: (info) => {
        let file = isEnvProduction ? path.relative(app.context, info.absoluteResourcePath) : path.resolve(info.absoluteResourcePath);
        file = file.replace(/\\/g, '/').replace(/\.\./g, '_');
        return file;
      },
    },
    cache: {
      type: 'filesystem',
      version: createEnvironmentHash(Object.keys(process.env)),
      cacheDirectory: path.resolve('./node_modules/.cache'),
      store: 'pack',
      buildDependencies: {
        defaultWebpack: ['webpack/lib/'],
        config: [__filename],
        tsconfig: useTypeScript ? ['tsconfig.json'] : [],
      },
    },
    infrastructureLogging: {
      level: 'none',
    },
    ignoreWarnings: [
      // We ignore 'Module not found' warnings from SnapshotPlugin
      {
        module: /SnapshotPlugin/,
        message: /Module not found/,
      },
    ],
    resolve: {
      // These are the reasonable defaults supported by the React/ES6 ecosystem.
      extensions: ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.json'].filter((ext) => useTypeScript || !ext.includes('ts')),
      // Allows us to specify paths to check for module resolving.
      modules: [path.resolve('./node_modules'), 'node_modules', ...getAdditionalModulePaths(app.additionalModulePaths)],
      // Don't resolve symlinks to their underlying paths
      symlinks: false,
      // Backward compatibility for apps using new ilib references with old Enact
      // and old apps referencing old iLib location with new Enact
      alias: fs.existsSync(path.join(app.context, 'node_modules', '@enact', 'i18n', 'ilib'))
        ? Object.assign({ ilib: '@enact/i18n/ilib' }, app.alias)
        : Object.assign({ '@enact/i18n/ilib': 'ilib' }, app.alias),
      // Optional configuration for redirecting module requests.
      fallback: app.resolveFallback,
    },
    module: {
      rules: [
        shouldUseSourceMap && {
          enforce: 'pre',
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve('source-map-loader'),
        },
        {
          // "oneOf" will traverse all following loaders until one will
          // match the requirements. When no loader matches it will fall
          // back to the "file" loader at the end of the loader list.
          oneOf: [
            // Process JS with Babel.
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              exclude: /node_modules.(?!@enact)/,
              loader: require.resolve('esbuild-loader'),
            },
            // Style-based rules support both LESS and CSS format, with *.module.* extension format
            // to designate CSS modular support.
            // See comments within `getStyleLoaders` for details on the stylesheet loader chains and
            // options used at each level of processing.
            {
              test: /\.module\.css$/,
              use: getStyleLoaders({
                importLoaders: 1,
                modules: {
                  getLocalIdent,
                },
              }),
            },
            {
              test: /\.css$/,
              // The `forceCSSModules` Enact build option can be set true to universally apply
              // modular CSS support.
              use: getStyleLoaders({
                importLoaders: 1,
                modules: {
                  ...(app.forceCSSModules ? { getLocalIdent } : { mode: 'icss' }),
                },
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true,
            },
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              // Exclude `ejs` HTML templating language as that's handled by
              // the HtmlWebpackPlugin.
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.ejs$/, /\.json$/],
              type: 'asset/resource',
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ].filter(Boolean),
    },
    // Target app to build for a specific environment (default 'browserslist')
    target: app.environment,
    // Optional configuration for polyfilling NodeJS built-ins.
    node: app.nodeBuiltins,
    performance: false,
    optimization: {
      minimize: isEnvProduction,
      // These are only used in production mode
      minimizer: [
        new TerserPlugin({
          // Use multi-process parallel running to improve the build speed
          minify: TerserPlugin.esbuildMinify,
          terserOptions: {},
        }),
        new CssMinimizerPlugin(),
      ],
    },
    plugins: [
      // Generates an `index.html` file with the js and css tags injected.
      new HtmlWebpackPlugin({
        // Title can be specified in the package.json enact options or will
        // be determined automatically from any appinfo.json files discovered.
        title: app.title || '',
        inject: 'body',
        template: app.template || path.join(__dirname, 'html-template.ejs'),
        xhtml: true,
        minify: isEnvProduction && {
          removeComments: true,
          collapseWhitespace: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        publicPath,
      }),
      // Make NODE_ENV environment variable available to the JS code, for example:
      // if (process.env.NODE_ENV === 'production') { ... }.
      // It is absolutely essential that NODE_ENV was set to production here.
      // Otherwise React will be compiled in the very slow development mode.
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isEnvProduction ? 'production' : 'development'),
        'process.env.PUBLIC_URL': JSON.stringify(publicPath),
        // Define ENACT_PACK_ISOMORPHIC global variable to determine to use
        // `hydrateRoot` for isomorphic build and `createRoot` for non-isomorphic build by app.
        ENACT_PACK_ISOMORPHIC: isomorphic,
        // Define ENACT_PACK_NO_ANIMATION global variable to determine
        // whether to build including effects such as animation or shadow or not.
        ENACT_PACK_NO_ANIMATION: noAnimation,
      }),
      // Inject prefixed environment variables within code, when used
      new EnvironmentPlugin(Object.keys(process.env).filter((key) => /^(REACT_APP|WDS_SOCKET)/.test(key))),
      // Note: this won't work without MiniCssExtractPlugin.loader in `loaders`.
      !process.env.INLINE_STYLES &&
        new MiniCssExtractPlugin({
          filename: contentHash ? '[name].[contenthash].css' : '[name].css',
          chunkFilename: contentHash ? 'chunk.[name].[contenthash].css' : 'chunk.[name].css',
        }),
      // Webpack5 removed node polyfills but we need this to run screenshot tests
      new NodePolyfillPlugin(),
      // Provide meaningful information when modules are not found
      new ModuleNotFoundPlugin(app.context),
      // Switch the internal NodeOutputFilesystem to use graceful-fs to avoid
      // EMFILE errors when hanndling mass amounts of files at once, such as
      // what happens when using ilib bundles/resources.
      new GracefulFsPlugin(),
      // Automatically detect ./appinfo.json and ./webos-meta/appinfo.json files,
      // and parses any to copy over any webOS meta assets at build time.
      new WebOSMetaPlugin({ htmlPlugin: HtmlWebpackPlugin }),
      // TypeScript type checking
      useTypeScript &&
        new ForkTsCheckerWebpackPlugin({
          async: !isEnvProduction,
          typescript: {
            typescriptPath: resolve.sync('typescript', {
              basedir: 'node_modules',
            }),
            configOverwrite: {
              compilerOptions: {
                sourceMap: shouldUseSourceMap,
                skipLibCheck: true,
                inlineSourceMap: false,
                declarationMap: false,
                noEmit: true,
                incremental: true,
                tsBuildInfoFile: 'node_modules/.cache/tsconfig.tsbuildinfo',
              },
            },
            context: app.context,
            diagnosticOptions: {
              syntactic: true,
            },
            mode: 'write-references',
            // profile: true,
          },
          issue: {
            // prettier-ignore
            include: [
							{file: '../**/src/**/*.{ts,tsx}'},
							{file: '**/src/**/*.{ts,tsx}'}
						],
            exclude: [{ file: '**/src/**/__tests__/**' }, { file: '**/src/**/?(*.){spec|test}.*' }, { file: '**/src/setupProxy.*' }, { file: '**/src/setupTests.*' }],
          },
          logger: {
            infrastructure: 'silent',
          },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '~': path.resolve(__dirname, '..', 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  };

  // NOTE: MiniCssExtractPlugin 관련 버그 수정
  // @see https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167#issuecomment-1318684127
  const cssPluginIndex = config.plugins.findIndex((e) => e.constructor.name === 'MiniCssExtractPlugin');
  const cssPlugin = config.plugins[cssPluginIndex];
  const smp = new SpeedMeasurePlugin();
  const configToExport = smp.wrap(config);
  configToExport.plugins[cssPluginIndex] = cssPlugin;

  return configToExport;
};
