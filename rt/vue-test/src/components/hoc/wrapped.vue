<template>
    <div>
        <span>{{ result.name }}</span>
        <slot></slot>
        <slot name="named"></slot>
        <button @click="reload">重新加载数据</button>
    </div>
</template>

<script>
// 木偶组件
export default {
    name: 'wrappeds',
    props: ['result', 'loading'],
    data() {
        return {
            requestParams: {
                name: 'ssh',
            },
        };
    },
    methods: {
        reload() {
            this.requestParams = {
                name: 'changed!!',
            };
        },
    },
};
</script>
