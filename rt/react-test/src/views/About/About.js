import React, {Component, useState, useCallback, useMemo} from 'react';
// FancyButton 使用 React.forwardRef 来获取传递给它的 ref
const FancyButton = React.forwardRef((props, ref) => {
    return (
        // ref 被转发到此作为 jsx 属性
        <button ref={ref} className="FancyButton">
            {props.children}
        </button>
    );
});

class Box extends Component {
    state = {
        btnRef: React.createRef()
    }

    changeClass = () => {
        this.state.btnRef.current.className = "greenButton"
    }

    render() {
        return (
            <div>
                <FancyButton ref={this.state.btnRef}>Click me!</FancyButton>
            </div>
        )
    }
}

// 使用 FancyButton 的组件可以获取底层 DOM 节点 button 的 ref
export default class About extends Component {
    boxRef = React.createRef();

    handleClick() {
        // 通过 ref 可以引用组件里的成员函数
        console.log(this.boxRef.current.changeClass());
    }

    render() {
        return (
            <div>
                <Box ref={this.boxRef} />
                <button onClick={this.handleClick.bind(this)}>change Class</button>
            </div>
        );
    }
}

