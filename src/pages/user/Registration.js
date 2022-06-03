
import React, { useState } from 'react';
import {
    Form,
    Input,
    InputNumber,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import DefaultLayout from './../../Componants/DefauldLayout/DefaultLayout';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom';
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

const Registration = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/createUser', values)
            .then(function (response) {
                cogoToast.success(`${response.data.status}`);
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            });
    };


    return (
        <div style={{ backgroundColor: "azure" }} className="container-fluid">
            <div className="row">
                <div className="col-md"></div>
                <div style={{ paddingTop: "50px", minHeight: "100vh" }} className=" col-md-8 d-flex justify-content-center align-items-center ">
                    <Form
                        {...formItemLayout}
                        form={form}
                        layout="vertical"    
                        className="register-form "
                        name="register"

                        onFinish={onFinish}
                        initialValues={{
                            residence: ['zhejiang', 'hangzhou', 'xihu'],
                            prefix: '86',
                        }}
                        scrollToFirstError
                    >
                        <h5 style={{paddingBottom:"7px",paddingLeft:"30%"}}> <strong>REGISTER</strong> </h5>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: false }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="userName"
                            label="username"
                            tooltip="What do you want others to call you?"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="userType"
                            label="userType"
                            rules={[{ required: true, message: 'Please select userType!' }]}
                        >
                            <Select placeholder="select your userType">
                                <Option value="1">Admin</Option>
                                <Option value="2">Stuff</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item >
                            <Button type="primary" className='login-form-button' htmlType="submit">
                                Register
                            </Button>
                            <div className="row">
                                <div className="col-md-12 text-end">
                                Or <Link  to="/login"> <strong>Login</strong> </Link>
                                </div>
                            </div>
                            
                        </Form.Item>
                    </Form>
                </div>
                <div className="col-md"></div>
            </div>
        </div>



    );
};

export default Registration;