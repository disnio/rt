const path = require('path');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, './', dir)
}

// cdn预加载使用
const externals = {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios',
    'element-ui': 'ELEMENT',
    'js-cookie': 'Cookies',
    'nprogress': 'NProgress'
}

const cdn = {
    // 开发环境
    dev: {
        css: [
            'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css'
        ],
        js: []
    },
    // 生产环境
    build: {
        css: [
            'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css'
        ],
        js: [
            'https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js',
            'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.3/vue-router.min.js',
            'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.3/vuex.min.js',
            'https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.min.js',
            'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/index.js',
            'https://cdn.bootcdn.net/ajax/libs/js-cookie/2.2.1/js.cookie.min.js',
            'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js'
        ]
    }
}

// 是否使用gzip
const productionGzip = true
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ['js', 'css']

module.exports = {
    chainWebpack: config => {
        config.lintOnSave = process.env.NODE_ENV !== 'production';

        config.plugin("define").tap(args=>{
            const argv = process.argv;
            const mode = argv[argv.indexOf('--project-mode') + 1];
            args[0]['process.env'].MODE = `"${mode}"`;
            args[0]['process.env'].BASE_API = `"http://localhost:8000"`;
            return args;
        })

        // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
        config.plugin('html').tap(args => {
            if (process.env.NODE_ENV === 'production') {
                args[0].cdn = cdn.build
            }
            if (process.env.NODE_ENV === 'development') {
                args[0].cdn = cdn.dev
            }
            return args
        })

        // 找到svg loader
        const svgRule = config.module.rule('svg');
        // 清除已有 loader，否则会追加
        svgRule.uses.clear();
        svgRule.exclude.add(/node_modules/);
        svgRule.test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })

        // 修改 images loader 添加 svg 处理
        const imagesRule = config.module.rule("images");
        imagesRule.exclude.add(resolve('src/icons'));
        config.module.rule("images")
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    },

    // 修改webpack config, 使其不打包externals下的资源
    configureWebpack: () => {
        const myConfig = {

        };

        if (process.env.NODE_ENV === 'production') {
            // 1. 生产环境npm包转CDN
            myConfig.externals = externals

            myConfig.plugins = []
            // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
            productionGzip && myConfig.plugins.push(
                new CompressionWebpackPlugin({
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240, //对超过10k的数据进行压缩
                    minRatio: 0.6 // 压缩比例，值为0 ~ 1
                })
            )
        }

        if (process.env.NODE_ENV === 'development') {
            // 关闭host check，方便使用ngrok之类的内网转发工具
            myConfig.devServer = {
                disableHostCheck: true
            }
        }

        return myConfig
    }
}