import React, { Component, useState, useEffect, useRef, useMemo, useCallback, useReducer } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import "./Test.scss";

const useWindowSize = () => {
    const [width, setWidth] = useState(100)
    const [height, setHeight] = useState(100)

    useEffect(() => {
        const { clientWidth, clientHeight } = document.documentElement
        setWidth(clientWidth)
        setHeight(clientHeight)
    }, [])

    useEffect(() => {
        const handleWindowSize = () => {
            const { clientWidth, clientHeight } = document.documentElement
            setWidth(clientWidth)
            setHeight(clientHeight)
        };

        window.addEventListener('resize', handleWindowSize, false)

        return () => {
            window.removeEventListener('resize', handleWindowSize, false)
        }
    })

    return [width, height]
}
function Box(props) {
    let [width, height] = useWindowSize();
    let [flg, setFlg] = useState(1);


    return (
        <div>
            <div className="w42"
                style={{ width: width / 2, height: height / 2 }}>
                <input type="text"
                    value={flg}
                    onChange={(e) => {
                        setFlg(Number(e.target.value));
                        props.getFlg(e.target.value);
                    }}
                />
            </div>
        </div>
    )
}


export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: 1
        }
    }

    getFlg = (flg) => {
        this.setState(() => {
            return {
                visible: Number(flg)
            }
        })
    }

    render() {
        let { visible } = this.state;
        return (
            <div>
                <p style={{ display: visible === 0 ? "inline" : "none" }}>没有了</p>
                <div>
                    <Box id="box" getFlg={this.getFlg} />
                </div>

            </div >

        );
    }
}
