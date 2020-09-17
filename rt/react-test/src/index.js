// import 'es6-shim';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
// import "core-js/stage/3";
// import 'amfe-flexible/index.js'
import React from 'react';
import ReactDOM from 'react-dom';
import 'css/index.css';
import App from './router/index';
import * as serviceWorker from './serviceWorker';

function setRemUnit() {
    var viewport = document.querySelector("meta[name=viewport]");
    //下面是根据设备像素设置viewport
    // if (window.devicePixelRatio == 1) {
    //     viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
    // }
    // if (parseInt(window.devicePixelRatio, 10) == 2) {
    //     viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
    // }
    // if (parseInt(window.devicePixelRatio, 10) == 3) {
    //     viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
    // }
    let docEl = document.documentElement;
    // let rem = docEl.clientWidth / 100;
    let rem = 32 * (docEl.clientWidth / 750) + 'px';

    docEl.style.fontSize = rem;
}

setRemUnit();

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
