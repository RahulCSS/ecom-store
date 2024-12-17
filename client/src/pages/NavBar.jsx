import React, { useState, useEffect } from 'react';
import { Avatar, Menu, Dropdown, message, Spin } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, ProfileOutlined, 
  HeartOutlined, GiftOutlined, BankOutlined, LogoutOutlined, TruckOutlined,
  createFromIconfontCN } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux'
import { showLoginModal,showSignupModal} from '../store/ModalSlice'
import { setUserRole, clearUserRole, setUser, clearUser } from '../store/UserSlice';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import { GetCurrentUser } from '../apicalls/user';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../store/ProductSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentKey, setCurrentKey] = useState(null);
  const user = useSelector((state)=> state.user);
  const isUser = !!user.id;
  const role = user?.role;
  const cart = user?.cart;
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.product.fetchProduct);
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
      // icon-javascript, icon-java, icon-shoppingcart (overridden)
      '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
    ],
  });
  
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
  const handleNavigateCart =() => {
    if (role === 'Customer') 
      navigate('/cart');
  
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
    { key: 'myaccount', label:  isUser ? (role === 'Customer' ? 'My Account': null) : ' My Account', icon:  isUser ? (role === 'Customer' ? <UserOutlined />: null) : <UserOutlined /> },
    { key: 'orders', label:  isUser ?  (role === 'Customer' ? 'Orders': null) :'Orders' ,icon:  isUser ?  (role === 'Customer' ? <ProfileOutlined />: null) : <ProfileOutlined />},
    { key: 'wishlist', label:  isUser ?  (role === 'Customer' ? 'Wishlist': null) :'Wishlist', icon:  isUser ?  (role === 'Customer' ? <HeartOutlined />: null) : <HeartOutlined /> },
    { key: 'coupons', label:  isUser ?  (role === 'Customer' ? 'Coupons': null) :'Coupons', icon: isUser ?  (role === 'Customer' ? <GiftOutlined /> : null) : <GiftOutlined /> },
    { key:'becomeseller', 
      label: isUser ? 'Logout' : renderMenuLabel('Become a Seller/Delivery'), 
      icon: isUser ? <LogoutOutlined /> : '', 
      onClick: isUser ? logout : null},          
  ];


  const cartItems = cart.length === 0 ? [
    {
      key: 'emptycart',
      label: (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div>Your cart is empty</div>
          <IconFont type="icon-shoppingcart" style={{ fontSize: '5rem' }} />
        </div>
      )
    }
  ] : cart.map((cartItem) => {
    const product = products.find((prod) => prod._id === cartItem.productId);
    if (!product) return null; 
    const itemtotal = product.price * cartItem.quantity; 
  
    return {
      key: cartItem.productId,
      label: (
        <div className="flex items-center space-x-4">
          
          <div className="flex-shrink-0">
            <img
              alt="product"
              src={product.imageUrl[0]}
              className="w-16 h-16 object-cover"
            />
          </div>
  
          <div className="flex-1 w-48">
            <div className="text-l ">{product.name}</div>
            <div className="text-xs font-thin ">{product.description}</div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-light">₹{product.price}</div>
              <div className="text-sm font-light ml-2">x{cartItem.quantity}</div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between items-center w-16">
            <div className="text-sm font-light">₹{itemtotal}</div>
          </div>
        </div>
      ),
      itemtotal,
    };
  });
  
  const totalAmount = cartItems.reduce((acc, item) => {
    return item && item.itemtotal ? acc + item.itemtotal : acc;
  }, 0);
  
  
  cartItems.push({
    key: 'total',
    label: (
      <div className="flex justify-between items-center px-4 py-4 border-t-2">
        <div className="font-bold text-xl">Total:</div>
        <div className="font-bold text-xl">₹{totalAmount}</div>
      </div>
    ),
  });
  



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
      message.error(error?.response?.data?.message || 'Failed to fetch user data, please try again later');
      dispatch(clearUser());
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getpresentUser();
    } else {
      message.error('Authentication required. Please log in.');
      navigate('/');
    }
  },[]);

  useEffect(() => {
    dispatch(fetchProducts());
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
              <SearchOutlined style={{ fontSize: '2.5rem' }} className="cursor-pointer px-2" />
              <HeartOutlined style={{ fontSize: '2.5rem' }} className="cursor-pointer px-2"/>
              <Dropdown menu={{ items: cartItems }} overlayClassName="sharp-corner-dropdown" dropdownStyle={{ minWidth: '200px' }}>
                <a onClick={(e) => e.preventDefault()}>
                  <ShoppingCartOutlined onClick={handleNavigateCart}style={{ fontSize: '2.5rem' }} className="cursor-pointer px-2" />
                </a>
              </Dropdown>
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
