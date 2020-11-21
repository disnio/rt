import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const constantRoutes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
    },
    {
        path: '/jx',
        name: 'jx',
        component: () =>
            import(/* webpackChunkName: "jx" */ '../views/Jx/Jx.vue'),
    },

    {
        path: '/hoc',
        name: 'hoc',
        component: () =>
            import(/* webpackChunkName: "hoc" */ '../views/Hoc.vue'),
    },
];

const appRoutes = [

    {
        path: '/test',
        name: 'test',

        component: () =>
            import(/* webpackChunkName: "test" */ '../views/Test/Test.vue'),
    },

    {
        path: '/sort-table',
        name: 'sort-table',

        component: () =>
            import(/* webpackChunkName: "test" */ '../views/SortTable/SortTable.vue'),
    },
    {
        path: '/page',
        name: 'page',
        props: true,
        component: () =>
            import(/* webpackChunkName "page" */ '../views/Page.vue'),
        children: [
            {
                path: '/page/:id',
                props: true,
                meta: {
                    requireAuth: true,
                },
                beforeEnter: (to, from, next) => {
                    console.log('表现和 beforeEach 一致，只是作用在单独路由');
                    next();
                },
                component: () =>
                    import(/* webpackChunkName "page" */ '../views/Page.vue'),
            },
        ],
    },
    {
        path: '/pack',
        name: 'pack',
        component: () =>
            import(/* webpackChunkName: "pack" */ '../views/d3/Pack.vue'),
    },
    {
        path: '/form',
        name: 'form',
        component: () =>
            import(/* webpackChunkName: "form" */ '../views/Form/FormTest.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRoutes,
});

// 在使用addRoutes的地方
// 重置当前router的match = 初始router.match
// router.match = router.match;
router.addRoutes(appRoutes);

export default router;
