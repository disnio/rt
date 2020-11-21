<script>
import Vue from 'vue';
import { Table, Button, Image, Popover, Loading } from 'element-ui';

Vue.use(Button);
Vue.use(Table);
Vue.use(Image);
Vue.use(Popover);
Vue.use(Loading);
import normalizeProps from '@/utils/normalizeProps';
import sortTd from './sort-td.vue';

export default {
    props: {
        table: Object,
        data: Array,
        columns: Array,
        options: Array,
        event: Object,
    },
    components: {
        'sort-td': sortTd,
    },
    methods: {
        sort: function ({ prop, order }) {
            let canCustomSort = this.columns.find((v, i) => {
                return v.prop === prop && v.sortable === 'custom';
            });

            if (canCustomSort) {
                this.event.sort({ prop, order });
            }
        },
    },
    render(h) {
        const args = {
            data: this.data,
            ...this.table,
        };

        const list = this.columns.map((v) => {
            return h('sort-td', { item: v });
        });
        const tb = h('el-table', { ...args }, list);

        return tb;
    },
};
</script>
