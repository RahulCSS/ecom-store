import React, { useState } from 'react';
import { Avatar, Menu, Drawer, Dropdown } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, ProfileOutlined, HeartOutlined, GiftOutlined, BankOutlined } from '@ant-design/icons';
import {useDispatch} from 'react-redux'
import {showLoginModal,showSignupModal} from '../store/ModalSlice'
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const NavBar = () => {
  const dispatch = useDispatch();
  const [currentKey, setCurrentKey] = useState(null);
  const showLogin =()=>{
    dispatch(showLoginModal());
    console.log('a');
  }
  const showSignup =()=>{
    dispatch(showSignupModal());
    console.log('b');
  }

  const menuItems = [
    { key: 'store', label: 'Store' },
    { key: 'electronics', label: 'Electronics' },
    { key: 'fashion', label: 'Fashion' },
    { key: 'home&furniture', label: 'Home & Furniture' },
    { key: 'appliances', label: 'Appliances' },
    { key: 'groceries', label: 'Groceries' },
    { key: 'beauty&toys', label: 'Beauty & Toys' },
    { key: 'stationary', label: 'Stationary' },
  ];
  
  const renderMenuLabel = (label) => {
    if (label === 'Welcome to ZipCart') {
      return (
        <>
          <div>{label}</div> {/* First line */}
          <div style={{ fontSize: '0.9rem', color: 'blue', marginTop: '5px' }}>
              <a onClick={showLogin} style={{ marginRight: '10px' }}>Sign In</a> | <a onClick={showSignup}style={{ marginLeft: '10px' }}>Sign Up</a>
          </div>
        </>
      );
    }
    return <div>{label}</div>; // For other labels, just render the text normally
  };

  const userMenuItems = [
    { key: 'welcome', label: renderMenuLabel('Welcome to ZipCart') },
    { type: 'divider' },
    { key: 'myaccount', label: 'My Account', icon: <UserOutlined />, },
    { key: 'orders', label: 'Orders' ,icon: <ProfileOutlined />},
    { key: 'wishlist', label: 'Wishlist', icon: <HeartOutlined /> },
    { key: 'coupons', label: 'Coupons', icon: <GiftOutlined /> },
    { key:'becomeseller', label:'Become a Seller/Delivery', icon: <BankOutlined />}
  ];


  const handleMouseOver = (e) => {
     // Open the drawer when hovering over a menu item
  };

  const handleMouseOut = () => {
  // Close the drawer when mouse leaves
  };

  return (
    <div className="bg-white">
      {/* Navbar Container */}
      <div className="max-w-screen-xl mx-auto pt-2 pb-0 z-50 flex justify-between items-center w-full border-b shadow-lg">

        {/* Logo */}
        <div className="flex items-center space-x-4 mx-4">
          <img src="/logo.svg" alt="Logo" className="h-8" />
        </div>

        {/* Menu in the center */}
        <div className='w-full'>
          <Menu
            selectedKeys={[currentKey]}
            mode="horizontal"
            items={menuItems}  
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{ fontSize: '1rem', justifyContent: 'center'}}
          />
        </div>

        {/* User icon & Search bar */}
        <div className="flex items-center gap-2">
          <SearchOutlined style={{ fontSize: '2rem' }} className="cursor-pointer px-2" />
          <ShoppingCartOutlined style={{ fontSize: '2rem' }} className="cursor-pointer px-2" />

          {/* User Dropdown */}
          <Dropdown menu={{ items: userMenuItems }} overlayClassName="sharp-corner-dropdown">
            <a onClick={(e) => e.preventDefault()}>
              <Avatar size="large" icon={<UserOutlined />} className="cursor-pointer mx-4" />
            </a>
          </Dropdown>
          <LoginModal/>
          <SignupModal/>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
