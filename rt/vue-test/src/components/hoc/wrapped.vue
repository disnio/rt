<template>
    <div>
        <span>{{ result }}</span>
        <slot></slot>
        <slot name="named"></slot>
        <button @click="reload">重新加载数据</button>
    </div>
</template>

<script>
// 木偶组件
export default {
    name: "wrapped",
    props: ["result", "loading"],
    data() {
        return {
            requestParams: {
                name: "ssh",
            },
        };
    },
    methods: {
        reload() {
            this.requestParams = {
                name: "changed!!",
            };
        },
    },
};
</script>
