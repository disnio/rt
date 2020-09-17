<template>
    <div>
        <span @click="handleClick">props: {{ test }}</span>
        <slot name="slot1" />
        <p>===========</p>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'BaseComponent',
    props: {
        test: String,
    },
    methods: {
        handleClick() {
            this.$emit('customize-click');
        },
    },
};
</script>
