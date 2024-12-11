import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  ShoppingOutlined,
  UserOutlined,
  RadarChartOutlined,
  ShopOutlined,
  TruckOutlined,
  CustomerServiceOutlined,
  ProductOutlined
} from '@ant-design/icons';
import Sellers from '../components/Admin/Sellers';
import Dashboard from '../components/Admin/Dashboard';
import Orders from '../components/Admin/Orders';
import Users from '../components/Admin/Users';
import Complaints from '../components/Admin/CustomerService';
import DeliveryPartner from '../components/Admin/DeliveryPartner';
import Products from '../components/Admin/Products';

const { Header, Content, Sider } = Layout;
const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  

  const menuClickHandler = (e) => {
    setSelectedMenu(e.key);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users/>;
      case 'orders':
        return <Orders />;
      case 'products':
        return <Products />;
      case 'sellers':
        return <Sellers />;
      case 'deliverypartner':
        return <DeliveryPartner />;
      case 'complaints':
        return <Complaints />
      default:
        return <Dashboard />;
    }
  };
  const adminItems = [
    {
      key: 'group1',
      label: 'Dashboard',
      icon: <RadarChartOutlined />,
    },
    {
      key: 'users',
      label: 'Users',
      icon: <UserOutlined />,
    },

    {
      key: 'orders',
      label: 'Orders',
      icon: <ShoppingOutlined />,
    },
    {
      key: 'products',
      label: 'Products',
      icon: <ProductOutlined />,
    },
    {
      key: 'sellers',
      label: 'Sellers',
      icon: <ShopOutlined />,
    },
    {
      key: 'deliverypartner',
      label: 'Delivery Partner',
      icon: <TruckOutlined />,
    },
    {
      key: 'complaints',
      label: 'Complaints',
      icon: <CustomerServiceOutlined />,
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ color: 'white', textAlign: 'center', padding: '20px 10px', fontSize:'1.2rem'}}>
          Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={menuClickHandler}
          defaultOpenKeys={['g1']}
          defaultSelectedKeys={['1']}
          items = {adminItems}
        />
      </Sider>

      <Layout>
        <Header
          style={{ backgroundColor: '#fff', textAlign: 'center', padding: 0 }}
        >
          <h2>E-Commerce Admin Dashboard</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin