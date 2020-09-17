const {
    override,
    fixBabelImports,
    // addLessLoader,
    addWebpackAlias,
    addBabelPreset,
    // addBabelPlugins,
    addWebpackPlugin,
    // useBabelRc,
    disableChunk,
    // adjustWorkbox,
    addBundleVisualizer,
    disableEsLint,
    // addWebpackExternals,
    overrideDevServer,
    // watchAll,
    addDecoratorsLegacy,
    addPostcssPlugins,
    adjustStyleLoaders,
    setWebpackOptimizationSplitChunks
} = require('customize-cra')


const path = require('path')
const paths = require('react-scripts/config/paths')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

// const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 添加 CompressionWebpackPlugin 到 rewire
const rewireCompressionPlugin = require('react-app-rewire-compression-plugin')
// const rewireUglifyjs = require('react-app-rewire-uglifyjs')

// 隐藏编译时的警告
// const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 打包完成桌面提醒，长时间打包提示
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

// 打包进度
// const ProgressBarPlugin = require('progress-bar-webpack-plugin')

// devServer 的 cli dashboard
// const Dashboard = require('webpack-dashboard')
// const DashboardPlugin = require('webpack-dashboard/plugin')
// const dashboard = new Dashboard()

const postcssAspectRatioMini = require('postcss-aspect-ratio');//
const postcssPxToViewport = require('postcss-px-to-viewport');//
const postcssPxToRem = require('postcss-pxtorem');//
const postcssWriteSvg = require('postcss-write-svg');// //
const postcssCssnext = require('postcss-cssnext');//
const postcssPresetEnv = require('postcss-preset-env');//
const postcssViewportUnits = require('postcss-viewport-units');//
const cssnano = require('cssnano');


// paths.appIndexJs = `${paths.appSrc}/pages/index.js`;
// paths.servedPath = './';
// 多页，移除 ManifestPlugin
const multipleEntry = require('react-app-rewire-multiple-entry')([{
    entry: 'src/pages/list.js',
    template: 'public/list.html',
    outPath: '/list.html',
}, {
    entry: 'src/pages/about.js',
    template: 'public/about.html',
    outPath: '/about.html',
},]);
const removeManifest = () => config => {
    config.plugins = config.plugins.filter(p => p.constructor.name !== "ManifestPlugin");
    return config;
};
const addEntry = () => config => {
    multipleEntry.addMultiEntry(config);
    return config;
};

// 替换 moment
// const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
// Source Map
const rewiredMap = () => config => {
    config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false

    return config
}

// path
const resolveAlias = dir => path.join(__dirname, '.', dir)

// 热跟新
const hotLoader = () => (config, env) => {
    config = rewireReactHotLoader(config, env)
    return config
}

const gzip = () => (config, env) => {
    return rewireCompressionPlugin(config, env)
}

// 生产环境输出文件设置
const appBuildPathFile = () => config => {
    if (config.mode === 'development') {
        console.log('开发环境')
    } else if (config.mode === 'production') {
        console.log('生成环境，输出到 dist 目录')
        // 关闭sourceMap
        config.devtool = false
        // 配置打包后的文件位置修改 path 目录
        // react-scripts path
        paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
        // config output path
        config.output.path = path.join(path.dirname(config.output.path), 'dist')

        // 更改生产模式输出的文件名
        // config.output.filename = 'static/js/[name].js?_v=[chunkhash:8]'
        // config.output.chunkFilename = 'static/js/[name].chunk.js?_v=[chunkhash:8]'
    }
    return config
}


//生产环境去除 console.*
const dropConsole = () => {
    return config => {
        if (config.optimization.minimizer) {
            config.optimization.minimizer.forEach(minimizer => {
                if (minimizer.constructor.name === 'TerserPlugin') {
                    minimizer.options.terserOptions.compress.drop_console = true
                }
            })
        }
        return config
    }
}

// 移除 css 顺序警告
const delConflictingOrder = () => {
    return config => {
        for (let i = 0; i < config.plugins.length; i++) {
            const p = config.plugins[i]
            if (!!p.constructor && p.constructor.name === MiniCssExtractPlugin.name) {
                // 移除关于冲突顺序的警告
                const miniCssExtractOptions = {...p.options, ignoreOrder: true}
                config.plugins[i] = new MiniCssExtractPlugin(miniCssExtractOptions)
                break
            }
        }
    }
}

// 代理
const addProxy = () => (configFunction) => {
    configFunction.proxy = {
        '/api': {
            target: 'https://www.v2ex.com',
            changeOrigin: true,
            secure: false,
            pathRewrite: {
                '^/api': '/'
            }
        },
    }
    return configFunction;
}

module.exports = {
    webpack: override(
        // removeManifest(),
        // 添加多页
        // multipleEntry.addMultiEntry,
        // addWebpackExternals({
        //     "react": 'React',
        //     "react-dom": 'ReactDom'
        // }),
        // addWebpackModules(),
        addWebpackAlias({
            '@': resolveAlias('src'),
            lib: resolveAlias('src/lib'),
            components: resolveAlias('src/components'),
            images: resolveAlias('src/assets/images'),
            scss: resolveAlias('src/assets/scss'),
            css: resolveAlias('src/assets/css'),
            views: resolveAlias('src/views'),
            store: resolveAlias('src/store'),
            router: resolveAlias('src/router'),
            // 处理警告  React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.
            // 'react-dom': '@hot-loader/react-dom'
            // 解决 antd 的 icon 图标打包体积大，通过引入此包，实现
            // '@ant-design/icons': 'purched-antd-icons'
        }),

        disableEsLint(),

        appBuildPathFile(),

        disableChunk(),

        dropConsole(),
        // 关闭mapSource
        rewiredMap(),

        addDecoratorsLegacy(),

        // 打包编译完成提醒
        addWebpackPlugin(
            new WebpackBuildNotifierPlugin({
                title: '打包完成',
                logo: path.resolve('./public/logo512.png'),
                suppressSuccess: true
            }),

            new MiniCssExtractPlugin({
                filename: 'dist/css/[name].[contenthash].css',
                chunkFilename: 'dist/css/[id].[contenthash].css',
                ignoreOrder: false
                // moduleFilename: ({ name }) => `${name.replace('/js/', '/css/')}.css`
            }),
            // 美化控制台
            // new DashboardPlugin(dashboard.setData),
            // 进度条
            // new ProgressBarPlugin(),
            delConflictingOrder(),
        ),

        // 样式转换布局
        addPostcssPlugins([
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
            // require('postcss-aspect-ratio-mini')(),
            require('postcss-aspect-ratio')(),
            require('postcss-pxtorem')({
                unitPrecision: 5,
                propList: ['font', 'font-size', 'line-height', 'letter-spacing',
                    'width', 'height', 'margin', 'padding'],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0,
                exclude: /node_modules/i
            }),
            // require('postcss-px-to-viewport')({
            //     unitToConvert: "px",
            //     // 能转化为vw的属性列表
            //     propList: ['*'],
            //     // (Number) The width of the viewport.
            //     viewportWidth: 1024,
            //     // (Number) The height of the viewport.
            //     viewportHeight: 768,
            //     // (Number) The decimal numbers to allow the REM units to grow to.
            //     unitPrecision: 3,
            //     // (String) Expected units.
            //     viewportUnit: 'vw',
            //     // 字体使用的单位
            //     fontViewportUnit: 'vw',
            //     // (Array) The selectors to ignore and leave as px.
            //     selectorBlackList: ['.ignore', '.hairlines'],
            //     // (Number) Set the minimum pixel value to replace.
            //     minPixelValue: 1,
            //     // (Boolean) Allow px to be converted in media queries.
            //     mediaQuery: false,
            //     // 忽略文件正则
            //     exclude: undefined,
            //     // 匹配到的才转换
            //     include: undefined,
            //     // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            //     landscape: false,
            //     // 横屏时使用的单位
            //     landscapeUnit: 'vw',
            //     // 横屏时使用的视口宽度
            //     landscapeWidth: 568
            // }),
            require('postcss-write-svg')({utf8: false}),
            require('postcss-viewport-units')({}),
            require('cssnano')({
                // advanced 有 autoprefixer
                preset: ["default", {
                    // 移除注释
                    discardComments: {
                        removeAll: true
                    }
                }],
                autoprefixer: false,
                "postcss-zindex": false
            })
        ]),

        // sass-resource
        adjustStyleLoaders(rule => {
            if (rule.test.toString().includes('scss')) {
                rule.use.push({
                    loader: require.resolve('sass-resources-loader'),
                    options: {
                        resources: './src/assets/scss/common.scss'
                    }
                });
            }
        }),

        // gzip(),

        // chunks
        setWebpackOptimizationSplitChunks({
            automaticNameDelimiter: ".",
            chunks: "all",
            cacheGroups: {
                // 来自 node_modules 的
                vendors: {
                    name: "vendors",
                    test: /node_modules/,
                    priority: 20,
                    //  ignore splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests
                    //  and splitChunks.maxInitialRequests
                    // enforce: true,
                },

                common: {
                    test: /src/,
                    name: 'common',
                    chunks: 'all',
                    priority: 20,
                    minChunks: 2,
                },
                // 分离css到一个css文件
                // styles: {
                //     name: 'styles',
                //     test: /\.css$/,
                //     chunks: 'all',
                //     priority: 9,
                //     enforce: true,
                // }
            }
        }),

        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true
        }),
        // fixBabelImports('ant-design-pro', {
        //     libraryName: 'ant-design-pro',
        //     libraryDirectory: 'lib',
        //     style: true,
        //     camel2DashComponentName: false,
        // }),

        // addLessLoader({
        //     // strictMath: true,
        //     noIeCompat: true,
        //     javascriptEnabled: true,
        //     modifyVars: { ...theme }
        //     // localIdentName: '[local]--[hash:base64:5]',
        //     // 自定义 CSS Modules 的 localIdentName
        // }),


        // addBundleVisualizer(),

        // adjustWorkbox(wb =>
        //     Object.assign(wb, {
        //         skipWaiting: true,
        //         exclude: (wb.exclude || []).concat('index.html')
        //     })
        // )
        // 热跟新
        hotLoader(),
    ),

    // 配置devServer
    devServer: overrideDevServer(
        // watchAll(),

    )
}
