<template>
    <el-table
        ref="table"
        v-on="event"
        v-bind="table"
        v-bind:data="data"
    >
        <template v-for="item in columns">
            <el-table-column
                type="selection"
                v-bind="item"
                v-if="item.prop == 'selection'"
            ></el-table-column>
            <!--图像-->
            <el-table-column
                v-if="item.isImg"
                v-bind="item"
            >
                <template slot-scope="scope">
                    <el-popover placement="left" trigger="click">
                        <div>
                            <el-image
                                style="width: 300px; height: auto"
                                v-bind:src="scope.row[item.prop]"
                                fit="contain"
                                slot="reference"
                            ></el-image>
                        </div>
                        <el-image
                            style="width: 100px; height: 100px"
                            v-bind:src="scope.row[item.prop]"
                            fit="contain"
                            slot="reference"
                        ></el-image>
                    </el-popover>
                </template>
            </el-table-column>

            <!-- 通用 -->
            <template v-else>
                <el-table-column
                    v-if="item.show"
                    v-bind="item"
                ></el-table-column>
            </template>
        </template>
    </el-table>
</template>

<script>
import Vue from 'vue';
import {
    Table,
    TableColumn,
    Button,
    Image,
    Popover,
    Loading,
} from 'element-ui';

Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Image);
Vue.use(Popover);
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
        sort: function ({prop, order}) {
            let canCustomSort = this.columns.find((v, i) => {
                return v.prop === prop && v.sortable === 'custom';
            });

            if (canCustomSort) {
                this.event.sort({prop, order});
            }
        },
    },
};
</script>
