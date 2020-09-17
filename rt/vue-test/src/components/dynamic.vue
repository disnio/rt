<script>
const Dynamic = {
    name: 'dynamic',
    props: ['value', 'onXXX'],
    methods: {
        onClick() {
            this.$emit('change', this.value);
        },
    },
    render() {
        return (
            <div style={{ marginTop: '10px' }}>
                <button onClick={this.onClick}>dynamic {this.value}</button>
                {this.onXXX}
            </div>
        );
    },
};

export default {
    name: 'dynamic-container',
    data() {
        return {
            count: 0,
        };
    },
    methods: {
        onChange1(v) {
            console.log(v, 1);
        },
        onChange2(v) {
            console.log(v, 2);
        },
        onChange3(v) {
            console.log(v, 3);
        },
    },
    render() {
        const { onChange1, onChange2, onChange3 } = this;
        const dynamicProps1 = { props: {}, on: {} };
        if (true) {
            dynamicProps1.props.value = 'console 1';
            dynamicProps1.on.change = onChange1;
        }

        const dynamicProps2 = { on: { change: onChange2 } };
        return (
            <div>
                <Dynamic {...dynamicProps1} />
                // 三个事件依次执行
                <Dynamic
                    value="console 1 2 3"
                    {...{ on: { change: onChange1 } }}
                    {...dynamicProps2}
                    onChange={onChange3}
                />
                // 因为解析规则，所以 onXXX被当做了事件
                <Dynamic value="获取到value，不能获取到 onXXX" onXXX="xxx" />
                <Dynamic {...{ props: { onXXX: '获取了onXXX，不建议用' } }} />
            </div>
        );
    },
};
</script>
