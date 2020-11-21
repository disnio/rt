<script>
export default {
    name: "FormInput",
    props: ["label", "vl", "placeholder", "rules"],
    computed: {
        val: {
            get() {
                return this.vl;
            },
            set(v) {
                console.log("computed", v)
                this.$emit("input", v)
            }
        }
    },
    render(h) {
        const ps = {
            props: {
                rules: this.rules[this.label],
            },
            attrs: this.$attrs,
            on: {
                ...this.$listeners
            },
        }
        return (
            <el-form-item
                label={this.label}
                {...ps}
            >
                <el-input
                    clearable
                    v-model={this.val}
                    placeholder={this.placeholder}
                />
            </el-form-item>
        )
    }
};
</script>
