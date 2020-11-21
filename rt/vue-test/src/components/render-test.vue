<script>
export default {
    name: 'item',
    props: ['item', 'clickChild'],
    render() {
        return (
            // 这里应该是基础布局， name data 具体的细节应该从slot 父组件传进来
            <div className="red">
                {this.$scopedSlots.title({
                    title: this.item.title,
                })}
                <div id="item">
                    {
                        // v-for name data
                        this.item.data.map(v => {
                            return this.$scopedSlots.content({
                                content: v,
                            });
                        })
                    }
                </div>
                <div className="tip">
                    <div onClick={() => this.clickChild(this.item.title)}>
                        字号：{this.item.tpid}
                    </div>
                </div>
            </div>
        );
    },
    // 传入数据最好还是通过vue 的 props，就不需要监听了
    // watch: {
    //     "$attrs.pdata"() {
    //         console.log("change");
    //         this.item = this.$attrs.pdata;
    //     },
    // },
};
</script>
