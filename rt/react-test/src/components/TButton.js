import React, {memo} from 'react';


const Button = (props) => {
    const {userInfo} = props;
    console.log('sub render', userInfo);
    return (
        <div className="ant-btn">
            <span>button userInfo.age: {userInfo && userInfo.age}</span>
        </div>
    );
};
export default memo(Button);