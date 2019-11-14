import React from 'react';
import ReactDOM from 'react-dom'
import { Button } from 'antd';

const modalRoot = document.body;

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement("div");
        this.el.style = {
            width: "200px",
            height: "200px",
            backgroundColor: "green",
            position: "absolute",
            top: "200px",
            left: "400px",
        };
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}

function Child() {
    return (
        <div className="modal">
            这是通过 createPortal 创建
        </div>
    )
}

export default class Pmodal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 0
        };
    }

    handleClick = () => {
        this.setState(prevState => ({
            clicks: prevState.clicks + 1
        }));
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleClick}>+1</Button>
                <p>{this.state.clicks}</p>

                <Modal>
                    <Child />
                </Modal>
            </div>
        )
    }
}