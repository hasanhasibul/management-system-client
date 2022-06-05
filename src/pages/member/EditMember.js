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
import Spinner from '../../Componants/Spinner';
import { useNavigate } from 'react-router-dom';
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

const EditMember = () => {
    const [form] = Form.useForm();
    const [loading,setLoading] = useState(true)
    const [updateMember,setEditMember] = useState([])
    let { id } = useParams();
    const navigate = useNavigate()
    useEffect(()=>{
        setLoading(true)
        const token = localStorage.getItem("Token")
        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/readMemberById', 
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
                form.setFieldsValue({
                    firstName: response.data.data[0].firstName,
                    lastName: response.data.data[0].lastName,
                    email: response.data.data[0].email,
                    gender: response.data.data[0].gender,
                    address: response.data.data[0].address
                  });
                  setLoading(false)
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
                setLoading(false)
            });
    },[])
    const onFinish = (values) => {
        
        const token = localStorage.getItem("Token")
        
        const newValues = {
            ...values,
            id:id
        }
        axios.post('https://vast-journey-49790.herokuapp.com/api/v1/updateMember', 
        newValues
        , {
            headers: {
                'token-key': `${token}`
            }
        })
            .then(function (response) {
                cogoToast.loading('Updating...').then(()=>{
                    cogoToast.success("Updating Success");
                    navigate('/allMembers')
                })
                
                
            })
            .catch(function (error) {
                cogoToast.error(`${error.message}`);
                setLoading(false)
            });


        
    };
    
    return (
        <DefaultLayout >
            {
                loading ? <Spinner/>
                :
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
                    name="firstName"
                    label="First Name"
                    initialValue={ updateMember[0]?.email}
                    // initialValue= {console.log(updateMember[0]?.email )}
                    rules={[{ required: true, message: 'Please input your First name!', whitespace: false }]}
                >
                    <Input  />
                </Form.Item>


                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please input your last name!', whitespace: false }]}
                >
                    <Input value={updateMember?.lastName} />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please input your address!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ type: 'email', required: true, message: 'Please input your email!', whitespace: false }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: 'Please select Gender!' }]}
                >
                    <Select placeholder="select your Gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Update Member
                    </Button>
                </Form.Item>
            </Form>
            }
        </DefaultLayout>
    );
};

export default EditMember;