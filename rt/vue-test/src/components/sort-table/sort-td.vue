<script>
import Vue from 'vue';
import { TableColumn, Button, Image, Popover, Loading } from 'element-ui';
import normalizeProps from '@/utils/normalizeProps';

Vue.use(Button);
Vue.use(TableColumn);
Vue.use(Image);
Vue.use(Popover);
Vue.use(Loading);

export default {
    props: {
        item: Object,
    },
    methods: {},
    render(h) {
        const args = {
            props: {
                prop: item.prop,
                label: item.label,
            },
        };
        const td = h('el-table-column', { ...args, ...normalizeProps(this) });
        return td;
    },
};
</script>
