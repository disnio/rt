<template>
    <el-table :data="table.data" v-loading="table.loading" :stripe="table.stripe">
        <template v-for="item in table.header">
            <el-table-column type="selection" :width="item.width" v-if="item.prop == 'selection'"></el-table-column>
            <template v-else-if="item.prop == 'options'">
                <template v-if="table.options.length">
                    <el-table-column :label="item.label" :width="item.width" :fixed="item.fixed">
                        <template slot-scope="scope">
                            <template v-for="btn in table.options">
                                <el-button
                                    :type="btn.type"
                                    v-if="btn.isShow ? btn.isShow(scope.row) : true"
                                    @click="btn.event(scope.row)"
                                >{{btn.label}}</el-button>
                            </template>
                        </template>
                    </el-table-column>
                </template>
            </template>
            <template v-else>
                <template v-if="item.isImg">
                    <el-table-column :prop="item.prop" :label="item.label" :width="item.width">
                        <template slot-scope="scope">
                            <el-popover placement="left" trigger="click">
                                <div>
                                    <el-image
                                        style="width: 300px; height: auto;"
                                        :src="scope.row[item.prop]"
                                        fit="contain"
                                        slot="reference"
                                    ></el-image>
                                </div>
                                <el-image
                                    style="width: 100px;height: 100px;"
                                    :src="scope.row[item.prop]"
                                    fit="contain"
                                    slot="reference"
                                ></el-image>
                            </el-popover>
                        </template>
                    </el-table-column>
                </template>
                <el-table-column
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :formatter="item.formatter?item.formatter:null"
                    :show-overflow-tooltip="item.tooltip?item.tooltip:false"
                    :sortable="item.sortable?item.sortable:false"
                    v-else
                ></el-table-column>
            </template>
        </template>
    </el-table>
</template>

<script>
export default {
    props: {
        table: Object
    }
};
</script>
