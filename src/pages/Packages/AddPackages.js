import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button
} from 'antd';
import DefaultLayout from './../../Componants/DefauldLayout/DefaultLayout';
import axios from 'axios';
import cogoToast from 'cogo-toast';
const { Option } = Select;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const AddPackages = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const token = localStorage.getItem("Token")
        console.log(values);
        axios.post('http://localhost:5000/api/v1/createPackage', 
            values
        , {
            headers: {
                'token-key': `${token}`
            }
        })
            .then(function (response) {
                cogoToast.success(`${response.data.status}`);
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            });


        
    };

    return (
        <DefaultLayout >
            <Form
                {...formItemLayout}
                form={form}
                layout="vertical"
                name="register"

                onFinish={onFinish}
                initialValues={{
                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                    prefix: '86',
                }}
                scrollToFirstError
            >
                <Form.Item
                    name="packageName"
                    label="Package Name"
                    rules={[{ required: true, message: 'Please input your First name!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="amount"
                    label="amount"
                    rules={[{ type: 'number', required: true, message: 'Please input your address!', whitespace: false }]}
                >
                     <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Please input your First name!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Add Package
                    </Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    );
};

export default AddPackages;