import React from 'react';

export default class Tc extends React.Component {
    constructor(props) {
        super(props);
        this.ani = React.createRef();
        this.state = {
            text: "xxx"
        }
    }

    componentDidMount() {

    }

    render() {
        let {text} = this.state;
        return (
            <div className="main">

                <div className="view-point">
                    <div className="polling-message">
                        <span>Listening for dispatches</span>
                    </div>
                    <div className="cylon-eye" ref={this.ani}></div>
                </div>
                <div className="w42 b1">
                    <p className="anit">{text}</p>
                </div>

            </div>

        )
    }
};

