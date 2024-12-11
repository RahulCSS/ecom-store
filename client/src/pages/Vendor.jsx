import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { BarChartOutlined, ProductOutlined, TruckOutlined, UserOutlined } from '@ant-design/icons';
import MyAccount from '../components/Vendor/MyAccount';
import Orders from '../components/Vendor/Orders';
import Analytics from '../components/Vendor/Analytics';
import Products from '../components/Vendor/Products';
const { Header, Content, Sider } = Layout;

const Seller = () => {

  //State
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  
  // Items
  const productItems = [
    {
      key: 'myaccount',
      label: 'My Account',
      icon: <UserOutlined />,
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: <TruckOutlined />,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChartOutlined />,
    },
    {
      key: 'products',
      label: 'Products',
      icon: <ProductOutlined />
    },
  ];
  
  // * Handlers
  const renderContent = () => {
    switch (selectedMenu) {
      case 'myaccount':
        return <MyAccount/>;
      case 'orders':
        return <Orders/>;
      case 'analytics':
        return <Analytics />;
      case 'products':
        return <Products />;
      default:
        return <Orders/>;
    }
  };
  const menuClickHandler = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ color: 'white', textAlign: 'center', padding: '15px', background: '#002140',fontSize: '1.2rem'}}>
        Menu
        </div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={menuClickHandler}
          defaultSelectedKeys={['orders']}
          items={productItems}
        />
      </Sider>
      <Layout>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {renderContent()}
        </div>
      </Layout>
    </Layout>
  );
};

export default Seller;