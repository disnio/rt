<script>
import Vue from 'vue';
import { Table, TableColumn, Loading } from 'element-ui';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);

export default {
    props: {
        table: Object,
        data: Array,
        columns: Array,
        options: Array,
        event: Object,
    },

    methods: {
        sort: function ({ prop, order }) {
            console.log(prop, order);
            let canCustomSort = this.columns.find((v, i) => {
                return v.prop === prop && v.sortable === 'custom';
            });

            if (canCustomSort) {
                this.event.sort({ prop, order });
            }
        },

        renderSelect(item) {
            const cellProps = {
                props: {
                    ...item,
                },
            };
            return (
                <el-table-column
                    type={item.prop}
                    {...cellProps}
                ></el-table-column>
            );
        },

        renderCell(item) {
            const slot = {
                scopedSlots: {
                    default: (props) => {
                        return typeof item.render === 'function'
                            ? item.render(h, props, item)
                            : props.row[item.prop];
                    },
                },
            };
            const cellProps = {
                props: {
                    ...item,
                },
            };
            return <el-table-column {...cellProps} {...slot}></el-table-column>;
        },
        // 下面模拟表格编辑方法
        tableSort({ prop, order }) {
            console.log('out:', prop, order);
            // 这里模拟的服务端获取排序后的数据，分页更新数据就可以
            // let nd = sortBy(this.tdata, function (v) {
            //     return v[prop];
            // });
            // this.tdata = order === 'descending' ? reverse(nd) : nd;
        },
        tableRowSelect(selArr, row) {
            console.log('sel:', selArr, row);
        },
        tableRowSelectAll(selArr) {
            console.log('selection:', selArr);
        },
        tableRowSelectChange(selArr) {
            console.log('selectionChange:', selArr);
        },

        // 表格最后一列操作对应的自定义方法
        edit(val) {
            console.log(val);
        },
        del(val) {
            console.log(val);
        },
    },
    render(h) {
        const tableProps = {
            props: {
                ...this.$attrs,
                data: this.data,
                ...this.table,
            },
            on: {
                ...this.$listeners,
                ...this.event,
            },
        };

        return (
            <div>
                <el-table {...tableProps}>
                    {this.columns.map((item, i) => {
                        switch (item.prop) {
                            case 'selection':
                            case 'index':
                                return this.renderSelect(item);

                            default:
                                return this.renderCell(item);
                        }
                    })}
                </el-table>
            </div>
        );
    },
};
</script>
