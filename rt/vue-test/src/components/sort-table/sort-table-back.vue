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
                v-bind:width="item.width"
                v-if="item.prop == 'selection'"
            ></el-table-column>
            <template v-else-if="item.prop == 'options'">
                <template v-if="options.length">
                    <el-table-column
                        v-bind:label="item.label"
                        v-bind:width="item.width"
                        v-bind:fixed="item.fixed"
                    >
                        <template slot-scope="scope">
                            <template v-for="btn in options">
                                <el-button
                                    v-bind:type="btn.type"
                                    v-if="
                                        btn.isShow
                                            ? btn.isShow(scope.row)
                                            : true
                                    "
                                    @click="btn.event(scope.row)"
                                    >{{ btn.label }}
                                </el-button>
                            </template>
                        </template>
                    </el-table-column>
                </template>
            </template>
            <template v-else>
                <template v-if="item.isImg">
                    <el-table-column
                        v-bind:prop="item.prop"
                        v-bind:label="item.label"
                        v-bind:width="item.width"
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
                </template>
                <!-- 重要性从外部引入组件 -->
                <el-table-column
                    v-if="item.show"
                    v-bind:prop="item.prop"
                    v-bind:label="item.label"
                    v-bind:width="item.width"
                    v-bind:className="item.class"
                    v-bind:labelClassName="item.labelClass"
                    v-bind:align="item.align"
                    v-bind:min-width="item.minWidth"
                    v-bind:formatter="item.formatter ? item.formatter : null"
                    v-bind:show-overflow-tooltip="
                        item.tooltip ? item.tooltip : false
                    "
                    v-bind:sortable="item.sortable ? item.sortable : false"
                    v-bind:sortBy="item.sortBy ? item.sortBy : null"
                    v-bind:sortMethod="item.sortMethod ? item.sortMethod : null"
                    v-else
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
        sort: function ({ prop, order }) {
            let canCustomSort = this.columns.find((v, i) => {
                return v.prop === prop && v.sortable === 'custom';
            });

            if (canCustomSort) {
                this.event.sort({ prop, order });
            }
        },
    },
};
</script>
