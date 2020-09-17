module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true,
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    parserOptions: {
        // parser: "vue-eslint-parser",
        parser: 'babel-eslint',
        // 设置 script(默认) 或 module，如果代码是在ECMASCRIPT中的模块
        sourceType: 'module',
        ecmaVersion: 7,
        ecmaFeatures: {
            jsx: true,
        },
    },
    // 根据报警适当调整
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-unused-vars': 'off',
        'no-constant-condition': 'off',
    },
};
