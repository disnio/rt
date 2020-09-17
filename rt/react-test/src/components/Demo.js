import React, { useState, memo } from 'react';


function Demo(props) {
    console.log('demo props: ', props);
    return <div>demo props age: {props.userInfo.age}</div>;
}

export default memo(Demo);