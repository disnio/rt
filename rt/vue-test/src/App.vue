<template>
    <div id="app">
        <a-layout style="min-height: 100vh">
            <a-layout-sider collapsible v-model="collapsed">
                <div class="logo" />
                <a-menu
                    theme="dark"
                    mode="inline"
                    :defaultSelectedKeys="[]"
                    @click="menuClick"
                >
                    <a-menu-item key="home">
                        <a-icon type="user"></a-icon>
                        <span>Home</span>
                    </a-menu-item>
                    <a-menu-item key="page">
                        <a-icon type="video-camera"></a-icon>
                        <span>Page</span>
                    </a-menu-item>

                    <a-menu-item key="test">
                        <a-icon type="upload" />
                        <span>Test</span>
                    </a-menu-item>

                    <a-menu-item key="jx">
                        <a-icon type="upload" />
                        <span>Jsx</span>
                    </a-menu-item>

                    <a-menu-item key="hoc">
                        <a-icon type="user" />
                        <span>Hoc</span>
                    </a-menu-item>
                    <a-menu-item key="pack">
                        <a-icon type="user" />
                        <span>Pack</span>
                    </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header> </a-layout-header>
                <a-layout-content> <router-view /></a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapsed: false,
        };
    },
    methods: {
        menuClick(e) {
            console.log(e);
            this.$router.push('/' + e.key);
            // .then(function push(params) {
            //     console.log("success: ", params)
            // });
        },
    },
};
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    .ant-layout-header,
    .ant-layout-footer {
        background: #7dbcea;
        color: #fff;
    }

    .ant-layout {
        margin-bottom: 48px;
    }
    .ant-layout:last-child {
        margin: 0;
    }
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
    }

    .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
}
</style>
