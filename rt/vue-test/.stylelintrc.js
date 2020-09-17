module.exports = {
    // processors: [
    //     [
    //         '@mapbox/stylelint-processor-arbitrary-tags',
    //         {
    //             fileFilterRegex: [/\.vue$/],
    //         },
    //     ],
    // ],
    // plugins: [],
    extends: ['stylelint-scss', 'stylelint-config-recommended', 'stylelint-config-recommended-scss'],
    rules: {
        // at-rule-no-unknown: 屏蔽一些scss等语法检查
        'at-rule-no-unknown': [true, {
            'ignoreAtRules': [
                'mixin', 'extend', 'content', 'function', 'return'
            ],
        }],
    },
};
