<script>
const isStr = o => Object.prototype.toString.call(o) === "[object String]";
const isObj = o => Object.prototype.toString.call(o) === "[object Object]";

/**
 * @file: customForm.vue
 * @method
 * @return {Comment} 自定义表单生成 - 通用表单生成
 * @description:
 * @author: wsc
 * @date: 2020-09-27
 */
export default {
    name: "CustomForm",
    props: {
        custom: {
            type: Array,
            default: () => []
        },
        exclude: {type: Array, default: () => []},

        formData: {
            type: Object,
            default: () => {
            }
        },
        formProps: {
            type: Object,
            default: () => {
                return {"label-width": "100px"}
            }
        },
        rules: {
            type: Object,
        }
    },
    data: function () {
        return {
            vdata: {
                label: "xxx"
            }
        }
    },
    computed: {
        getCustomLayout() {
            this.validationCustom(this.custom);
            // this.bindCustomData(this.custom);
            return this.custom;
        }
    },
    methods: {
        handlerFunc(command) {
            this.$refs['searchForm'].resetFields();
            this.$emit("command", command, this.formData);
        },
        // 输入框框
        buildFormItemInput(key, label, hintText) {
            return (
                <el-form-item label={label}>
                    <el-input
                        clearable
                        vModel={this.formData[key]}
                        placeholder={hintText}
                    />
                </el-form-item>
            );
        },
        // 选择框，需要传入选项列表 optList
        buildFormItemSelect(key, label, hintText, optList) {
            return (
                <el-form-item label={label}>
                    <el-select
                        vModel={this.formData[key]}
                        placeholder={hintText}>
                        {
                            otpList && optList.map((item) => {
                                return (
                                    <el-option
                                        key={item.value}
                                        label={item.label}
                                        value={item.value}>
                                    </el-option>
                                )
                            })
                        }
                    </el-select>
                </el-form-item>
            );
        },
        // 日期
        buildFormItemDate(key, hintText, type = "date") {
            return (
                <el-form-item label={label}>
                    <el-date-picker
                        vModel={this.formData[key]}
                        type={type}
                        placeholder={hintText}
                    />
                </el-form-item>);
        },

        //验证 custom 数据
        validationCustom(arr) {
            arr.map(item => {
                if (!isObj(item)) {
                    throw new Error("必须是 Object");
                }

                let keys = Object.keys(item);

                if (keys.indexOf("type") < 0 || keys.indexOf("valKey") < 0) {
                    throw new Error("必须有 type and valKey");
                }

                if (!isStr(item.type) || item.type.length < 1)
                    throw new Error(`type 必须是 String`);

                if (!isStr(item.valKey) || item.valKey.length < 1)
                    throw new Error(`valKey 必须是 String`);

                if (keys.indexOf("hintText") > -1 && !isStr(item.hintText))
                    throw new Error(`hintText 必须是 String`);
            });
        },

        // 渲染表单项， todo checkbox
        readerCustomItem(item) {
            switch (item.type) {
                case "select":
                    return this.buildFormItemSelect(item.valKey, item.label, item.hintText || "", item.optList)
                case "date":
                    return this.buildFormItemDate(item.valKey, item.label, item.hintText || "");

                default:
                    return this.buildFormItemInput(item.valKey, item.label, item.hintText || "");
            }
        },
        // 列
        readerCol(child, key) {
            return (
                <el-col key={key} xs={12} sm={8} md={6} lg={4} xl={4}>
                    {child}
                </el-col>
            );
        }
    },
    render() {
        const props = {
            props: {
                ...this.$attrs,
                ...this.formProps
            },
            on:{
                ...this.$listeners
            }

        }
        return (
            <el-form
                rules={this.rules}
                {...props}
                vModel={this.vdata}
                ref="custom_form"
            >
                {
                    this.getCustomLayout.map((item, index) => {
                        return this.readerCustomItem(item, index + "custom");
                    })
                }
            </el-form>
        );
    }
}
</script>
<style lang="scss" scoped>

</style>
