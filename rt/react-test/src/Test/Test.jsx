import React, { Component } from 'react';
import './Test.scss';
import Tc from './Tc';

function HocProps(WrappedComponent) {
    class HocCom extends Component {
        render() {
            const { pref, ...rest } = this.props;
            return <WrappedComponent ref={pref} {...rest} />
        }
    }

    return React.forwardRef((props, ref) => {
        return <HocCom pref={ref} {...props} />
    })
}

const Tch = HocProps(Tc);


export default class Test extends Component {

    render() {
        return (
            <div>
                <Tch ref={dom => {
                    console.log(dom);
                }} name="test pp" />
            </div>
        )
    }
}
