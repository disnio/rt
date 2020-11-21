/**
 * @file: sortTr.js
 * @method changeKeys
 * @param {Object} v
 * @return {Object}
 * @description: 对象属性值 1->true, 0->false
 * @author: wsc
 * @date: 2020-09-26
 */
export function changeKeys(v) {
    Object.keys(v).forEach(k => {
        if (v[k] === 1) {
            v[k] = true;
        } else if (v[k] === 0) {
            v[k] = false;
        }
    });

    return v;
}

export const SortTr = {
    name: "SortTr",
    props: {
        table: Object,
        data: Array,
        columns: Array,
        options: Array,
        event: Object,
    },

    methods: {
        renderSelect(h, item) {
            const cellProps = {
                props: {
                    ...item
                },
                on: {
                    ...this.$listeners,
                    ...this.event,
                },
            };
            return (
                <el-table-column
                    type={item.prop}
                    {...cellProps}
                >

                </el-table-column>
            );
        },

        renderCell(h, item) {
            const slot = {
                scopedSlots: {
                    default: props => {
                        return typeof item.render === 'function'
                            ? item.render(h, props, item)
                            : props.row[item.prop];
                    }
                }
            };
            const cellProps = {
                props: {
                    ...item
                },
                on: {
                    ...this.$listeners,
                    ...this.event,
                },
            };
            return (
                <el-table-column
                    {...cellProps}
                    {...slot}
                >

                </el-table-column>
            )
        }
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
                <el-table
                    {...tableProps}
                >
                    {
                        this.columns && this.columns.map((item) => {
                            switch (item.prop) {
                                case "selection":
                                case "index":
                                    return this.renderSelect(h, item);

                                default:
                                    return this.renderCell(h, item)
                            }
                        })
                    }
                </el-table>
            </div>
        )
    }

};

