import React from 'react';
import './DefaultLayout.css'
import avater from '../../images/avater.jpg'
import { Layout, Menu, Avatar, Image, Breadcrumb, Button } from 'antd';
import { Link, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;


const { SubMenu } = Menu;
const DefaultLayout = (props) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('username')
    navigate('/login')
  }
  return (
    <div >
      <Layout style={{ minHeight: '90vh' }}>
        <Sider>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>Member</span>
                </span>
              }
            >
              <Menu.Item key="3">
                <Link to='/addMember' >Add Member</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to='/allMembers'>All Members</Link>
              </Menu.Item>

            </SubMenu>

            <SubMenu
              key="sub2"
              title={
                <span>
                  <span>Trainers</span>
                </span>
              }
            >
              <Menu.Item key="6">

                <Link to="/addTrainer" >  Add Trainer</Link>
              </Menu.Item>
              <Menu.Item key="8">

                <Link to="/allTrainer" > All Trainer</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              title={
                <span>
                  <span>Packages</span>
                </span>
              }
            >
              <Menu.Item key="7">

                <Link to="/addPackage" >  Add package</Link>
              </Menu.Item>
              <Menu.Item key="8">

                <Link to="/allPackage" > All packages</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub4"
              title={
                <span>
                  <span>Membership</span>
                </span>
              }
            >
              <Menu.Item key="9">

                <Link to="/createMembership" >  Add Membership</Link>
              </Menu.Item>
              <Menu.Item key="10">

                <Link to="/allMembership" >All Membership</Link>
              </Menu.Item>
    
            </SubMenu>

            <SubMenu
              key="sub5"
              title={
                <span>
                  <span>Schedule</span>
                </span>
              }
            >
              <Menu.Item key="11">

                <Link to="/addSchedule" >  Add Schedule</Link>
              </Menu.Item>
              <Menu.Item key="12">

                <Link to="/allSchedule" >All Schedules</Link>
              </Menu.Item>
    
            </SubMenu>

            <SubMenu
              key="sub6"
              title={
                <span>
                  <span>Plan</span>
                </span>
              }
            >
              <Menu.Item key="13">

                <Link to="/addPlan" >  Add Pan</Link>
              </Menu.Item>
              <Menu.Item key="14">

                <Link to="/allPlan" >All Plan</Link>
              </Menu.Item>
    
            </SubMenu>

          </Menu>
        </Sider>

        <Layout>
          <Content>
              <div style={{ padding: "16px 20px 6px 0px" }} className="row">
                <div className="col-md-7"></div>
                <div className="col-md-5 text-center d-flex flex-row-reverse">
                  <div style={{ padding: "0px 12px" }}>
                    <Button onClick={handleLogout} type="primary">
                      Log Out
                    </Button>
                  </div>
                  <div style={{ padding: "0px 5px" }}>
                    <h5 className='text-bold' >{localStorage.getItem("username")}</h5>
                  </div>
                </div>
              </div>
            <div style={{ padding: 50, background: '#fff', minHeight: 560 }}>
              {
                props.children
              }
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', fontSize: '16px' }}> Design ©2022 Created by Hasibul Hasan</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default DefaultLayout;