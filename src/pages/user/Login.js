import React, { useState } from 'react';
import './login.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import DefaultLayout from './../../Componants/DefauldLayout/DefaultLayout';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import cogoToast from 'cogo-toast';


const Login = () => {
  let navigate = useNavigate();
  const onFinish = (values) => {
    axios.post('https://vast-journey-49790.herokuapp.com/api/v1/userLogin', values)
      .then(function (response) {
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("username", response.data.data[0].name);
        cogoToast.success(`${response.data.status}`);
        navigate("/");
      })
      .catch(function (error) {
        cogoToast.error(`${error.message}`);
      });
  }

  return (

    <div style={{backgroundColor:"azure"}} className="container-fluid">
      <div className="row">
        <div className="col-md"></div>
        <div style={{paddingTop:"50px",minHeight:"100vh"}}  className="col-md-8 d-flex justify-content-center align-items-center">
          <Form
            name="normal_login"
            className="login-form "
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <h5 style={{paddingBottom:"7px"}} className='text-center'> <strong>LOGIN</strong> </h5>
            <Form.Item
              name="userName"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>
            </Form.Item>
          </Form>
        </div>
        <div className="col-md"></div>
      </div>
    </div>

  );
};

export default Login;