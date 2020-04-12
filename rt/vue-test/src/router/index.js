import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/test",
        name: "test",

        component: () =>
            import(/* webpackChunkName: "test" */ "../views/Test/Test.vue"),
    },
    {
        path: "/hoc",
        name: "hoc",

        component: () =>
            import(/* webpackChunkName: "hoc" */ "../views/Hoc.vue"),
    },
    {
        path: "/page/:id",
        name: "page",
        meta: {
            requireAuth: true,
        },
        beforeEnter: (to, from, next) => {
            console.log("表现和 beforeEach 一致，只是作用在单独路由")
            next()
        },
        props: true,
        component: () =>
            import(/* webpackChunkName "page" */ "../views/Page.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});



export default router;
