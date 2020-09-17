<script>
import Item from '../../components/render-test';
import ButtonCounter from '../../components/button-counter';
import DynamicContainer from '../../components/dynamic';
import Functional from '../../components/functional';

export default {
    name: 'list',
    data() {
        return {
            idx: 0,
            tests: [
                {
                    tpid: 1,
                    title: '题目1',
                    data: ['a', 'b', 'c'],
                    ans: [],
                },
                {
                    tpid: 2,
                    title: '题目2',
                    data: ['1', '2', '3'],
                    ans: [],
                },
            ],
        };
    },
    methods: {
        next() {
            this.idx = this.idx == 1 ? 0 : 1;
        },
        prev() {
            this.idx = this.idx == 0 ? 1 : 0;
        },
        tplP(data) {
            return (
                <p
                    style="color:blue"
                    title="can click"
                    onClick={() => this.clickChild(data)}
                >
                    {data}
                </p>
            );
        },
        tplB(data) {
            return <b style="color: red;">{data}</b>;
        },
        clickChild(p) {
            console.log('click in child:', p);
        },
    },
    render() {
        let item = this.tests[this.idx];
        return (
            <div>
                <DynamicContainer />
                <ButtonCounter />
                <Functional />
                <Item
                    item={item}
                    count={this.count}
                    click-child={this.clickChild}
                    scopedSlots={{
                        title: (props) => {
                            return <h2>{props.title}</h2>;
                        },
                        content: (props) => {
                            let cont = props.content;
                            // 模板定制
                            switch (item.tpid) {
                                case 1:
                                    return (
                                        <div class="page">
                                            {this.tplP(cont)}
                                        </div>
                                    );
                                    break;

                                default:
                                    return (
                                        <div class="base">
                                            {this.tplB(cont)}
                                        </div>
                                    );
                                    break;
                            }
                            return (
                                <div>
                                    <hr />
                                    <p>{props.content}</p>
                                </div>
                            );
                        },
                    }}
                    class="item"
                />
                <button onClick={this.next}>下一题</button>
                <button onClick={this.prev}>上一题</button>
            </div>
        );
    },
};
</script>

<style lang="scss">
html * {
    margin: 0px;
    padding: 0px;
}
</style>
