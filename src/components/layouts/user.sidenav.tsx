'use client'
import React, { useState } from 'react';
import {
  RollbackOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Col, ConfigProvider, Layout, Menu, SiderProps, theme } from 'antd';
import { signOut } from 'next-auth/react';

const {  Sider } = Layout;

const UserSideNav = (props: any) => {
  const [collapsed, setCollapsed] = useState(true);
  
  const { session } = props

  const [ siderWidth, setSiderWidth ] = useState<SiderProps['width']>("15vw")
  const onSiderBreak = (broken: boolean) => {
    console.log(broken)
    if (broken === false) { //if view >=768px
      setSiderWidth("15vw")
    } else setSiderWidth("70vw")
  }

  return (
      <>
      <Sider
            width={siderWidth}
            breakpoint='md'
            onBreakpoint={(broken) => onSiderBreak(broken)}
            collapsible collapsed={collapsed}
            collapsedWidth={0}
            onCollapse={(value) => setCollapsed(value)}>
        <div className="" />
        <Menu
          
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <Avatar shape='square' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s' icon={<UserOutlined />} />,
              label: <span>{session?.user?.email}</span>,
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
            {
              key: '4',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
            {
              key: '5',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
            {
              key: '6',
              icon: <RollbackOutlined />,
              label: <span>Sign out</span>,
              danger: true,
              onClick: () => signOut()
            },
          ]}
          
        />
      </Sider>
      </>
    )
}

export default UserSideNav