<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div class="wrap">
            <ks :author="author" ref="child" @hook:mounted="hasMounted">
                <template #header="{user}">
                    <h2>{{ user.name }}</h2>
                </template>
                <template #default="{changeName}">
                    <p>{{ count }}</p>
                    <a-button type="primary" @click="changeName">change</a-button>
                </template>
            </ks>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import ks from "../components/slot-test";
export default {
    name: "home",
    data: function () {
        return {
            author: {
                name: "Allen",
            },
            count: 0,
        };
    },
    components: {
        ks,
    },
    mounted() {
        this.$refs.child.$on("count", this.handleCount);
        window.addEventListener("resize", this.resizeHandler);
        this.$on("hook:beforeDestroy", () =>
            window.removeEventListener("resize", this.resizeHandler)
        );
    },
    methods: {
        hasMounted() {
            console.log("child mounted");
        },
        handleCount(clicks) {
            console.log(clicks);
            this.count = clicks;
        },
        resizeHandler(e) {
            console.log(e);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
