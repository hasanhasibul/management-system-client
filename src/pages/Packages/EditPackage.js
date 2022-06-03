import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
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

const EditPackage = () => {
    const [form] = Form.useForm();
    const [updateMember,setEditMember] = useState([])
    let { id } = useParams();
    useEffect(()=>{
        const token = localStorage.getItem("Token")
        axios.post('http://localhost:5000/api/v1/readPackageById', 
            {
                id:id
            }
        , {
            headers: {
                'token-key': `${token}`
            }
        })
            .then(function (response) {
                setEditMember(response.data.data)
                console.log(response.data.data);
                form.setFieldsValue({
                    packageName: response.data.data[0].packageName,
                    description: response.data.data[0].description,
                    amount: response.data.data[0].amount
                  });
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
            });
    },[])
    const onFinish = (values) => {
        const token = localStorage.getItem("Token")
        
        const newValues = {
            ...values,
            id:id
        }
        axios.post('http://localhost:5000/api/v1/updatePackage', 
        newValues
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
                    rules={[{ type: 'number', required: true, message: 'Please input your amount!', whitespace: false }]}
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
                        Update Package
                    </Button>
                </Form.Item>
            </Form>
        </DefaultLayout>
    );
};

export default EditPackage;