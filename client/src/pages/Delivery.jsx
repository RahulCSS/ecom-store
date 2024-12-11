import React ,{useState} from 'react'
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import Analytics from '../components/Delivery/Analytics';
import Deliveries from '../components/Delivery/Deliveries';
import { BarChartOutlined, TruckOutlined } from '@ant-design/icons';

const Delivery = () => {

  //State
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  
  const items = [
    {
      key: 'deliveries',
      label: 'Deliveries',
      icon: <TruckOutlined />,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChartOutlined />,
    },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'deliveries':
        return <Deliveries/>;
      case 'analytics':
        return <Analytics />;
      default:
        return <Deliveries/>;
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
          defaultSelectedKeys={['deleveries']}
          items={items}
        />
      </Sider>
      <Layout>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          {renderContent()}
        </div>
      </Layout>
    </Layout>
  )
}

export default Delivery