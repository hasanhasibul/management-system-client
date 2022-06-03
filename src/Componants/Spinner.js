import { Space, Spin } from 'antd';
import React from 'react';

const Spinner = () => {
    return (
        <div>
            <Space size="middle">
                <Spin size="large" />
            </Space>
        </div>
    );
};

export default Spinner;