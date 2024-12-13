import React, { useState, useEffect } from 'react';
import { Avatar, Menu, Dropdown, message, Spin } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, ProfileOutlined, HeartOutlined, GiftOutlined, BankOutlined, LogoutOutlined, TruckOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux'
import { showLoginModal,showSignupModal} from '../store/ModalSlice'
import { setUserRole, clearUserRole, setUser, clearUser } from '../store/UserSlice';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import { GetCurrentUser } from '../apicalls/user';
import { Link, useNavigate } from 'react-router-dom';


const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentKey, setCurrentKey] = useState(null);
  const user = useSelector((state)=> state.user);
  const isUser = !!user.id;
  const role = user?.role;
  const [loading, setLoading] = useState(false);


  
  const showLogin =()=>{
    dispatch(showLoginModal());
  }

  const showSignup =()=>{
    dispatch(showSignupModal());
  }

  const signupCustomer = ()=>{
    showSignup();
    dispatch(setUserRole('Customer'));
  }

  const signupSeller = ()=>{
    showSignup();
    dispatch(setUserRole('Vendor'));
  }
  const signupDelivery = ()=>{
    showSignup();
    dispatch(setUserRole('Delivery'));
  }

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    dispatch(clearUserRole());
    message.info({
      content: "You have been logged out successfully!",
      style: {
        marginTop: "30vh",
      },
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

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
    if (!isUser && label =='Welcome to ZipCart') {
      return (
        <>
          <div>{label}</div> {/* First line */}
          <div style={{ fontSize: '0.9rem', color: 'blue', marginTop: '5px' }}>
              <a onClick={showLogin} style={{ marginRight: '10px' }}>Sign In</a>
               | 
              <a onClick={signupCustomer}style={{ marginLeft: '10px' }}>Sign Up</a>
          </div>
        </>
      );
    }
    if (label == 'Become a Seller/Delivery'){
      return (
        <>
          <div>Become a Seller/Delivery</div>
          <div style={{ fontSize: '0.9rem', color: 'blue', marginTop: '5px' }}>
              <a onClick={signupSeller} style={{ marginRight: '10px' }}><BankOutlined /> Sign Up</a>
               | 
              <a onClick={signupDelivery}style={{ marginLeft: '10px' }}><TruckOutlined /> Sign Up</a>
          </div>
        </>
      )
    }
    return <div>{label}</div>; // For other labels, just render the text normally
  };

  const userMenuItems = [
    { key: 'welcome', label: isUser ? `Welcome, ${user.name}` : renderMenuLabel('Welcome to ZipCart') },
    { type: 'divider' },
    { key: 'myaccount', label: role === 'Customer' ? '' : 'My Account', icon: role === 'Customer' ? '' : <UserOutlined />, },
    { key: 'orders', label: role === 'Customer' ? '' : 'Orders' ,icon: role === 'Customer' ? '' : <ProfileOutlined />},
    { key: 'wishlist', label: role === 'Customer' ? '' : 'Wishlist', icon: role === 'Customer' ? '' : <HeartOutlined /> },
    { key: 'coupons', label: role === 'Customer' ? '' : 'Coupons', icon: role === 'Customer' ? '' : <GiftOutlined /> },
    { key:'becomeseller', label: isUser ? 'Logout' : renderMenuLabel('Become a Seller/Delivery'), 
                                icon: isUser ? <LogoutOutlined /> : '', onClick: isUser ? logout : null},
                                

  ];


  const handleMouseOver = (e) => {
     // Open the drawer when hovering over a menu item
  };

  const handleMouseOut = () => {
  // Close the drawer when mouse leaves
  };

  const getpresentUser = async () => {
    try {
      setLoading(true); 
      const response = await GetCurrentUser();
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        message.error(response.message);
        dispatch(clearUser());
      }
    } catch (error) {
      message.error('Failed to fetch user data, please try again later');
      dispatch(clearUser());
    }finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getpresentUser();
    } else {
      navigate('/');
    }
  },[]);

  useEffect(() => {
    if (role === 'Admin') {
        navigate('/admin');
    } else if (role === 'Vendor') {
        navigate('/vendor');
    } else if (role === 'Delivery') {
        navigate('/delivery');
    }
},[role]);

  return (
    <div >
      {/* Navbar Container */}
      <div className="max-w-screen-3xl mx-auto px-[5rem] pt-2 pb-0 z-50 flex justify-between items-center w-full border-b shadow-lg bg-white">

        {/* Logo */}
        <div className="flex items-center space-x-4 mx-4">
          <img src="/logo.svg" alt="Logo" className="h-8" />
        </div>

        {/* Menu in the center */}
        {(role ==='Customer' || role === null) && 
        <div className='w-full'>
          <Menu
            selectedKeys={[currentKey]}
            mode="horizontal"
            items={menuItems}  
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{ fontSize: '1rem', justifyContent: 'center'}}
          />
        </div>}

        {/* User icon & Search bar */}
        <div className="flex items-center gap-2">
          {(role ==='Customer' || role === null) && (
            <>
              <SearchOutlined style={{ fontSize: '2rem' }} className="cursor-pointer px-2" />
              <ShoppingCartOutlined style={{ fontSize: '2rem' }} className="cursor-pointer px-2" />
            </>
          )}

          {/* User Dropdown */}
          <Dropdown menu={{ items: userMenuItems }} overlayClassName="sharp-corner-dropdown">
            <a onClick={(e) => e.preventDefault()}>
              <Avatar size="large" icon={<UserOutlined />} style={{backgroundColor: isUser ? "#87d068" : ''}} className="cursor-pointer mx-4" />
            </a>
          </Dropdown>
        </div>
      </div>
          {loading ? (
            <Spin size="large" />
          ) : (
            <>
              {!isUser && <LoginModal />}
              {!isUser && <SignupModal />}
            </>)}
    </div>
  );
};

export default NavBar;
