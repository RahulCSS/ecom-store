import React, { useState, useEffect } from 'react';
import { Avatar, Menu, Dropdown, message, Spin, Button, Badge } from 'antd';
import Icon, { SearchOutlined, ShoppingCartOutlined, UserOutlined, ProfileOutlined, 
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
import logo from '../assets/logo.png'

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentKey, setCurrentKey] = useState(null);
  const user = useSelector((state)=> state.user);
  const isUser = !!user.id;
  const role = user?.role;
  const cart = user?.cart;
  const wishlist = user?.wishlist;
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.product.fetchProduct);
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js', // icon-javascript, icon-java, icon-shoppingcart (overridden)
      '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
    ],
  });
  const HeartSvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
      <title>heart icon</title>
      <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
    </svg>
  );
  const HeartIcon = (props) => <Icon component={HeartSvg} {...props} />;

  //Handlers
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
  const handleCheckout =() =>{
    if (role === 'Customer') 
      navigate('/checkout');
  }
  const handleNavigateHome = () =>{
    navigate('/');
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
    return <div>{label}</div>; 
  };

  const userMenuItems = [
    { key: 'welcome', label: isUser ? `Welcome, ${user.name}` : renderMenuLabel('Welcome to ZipCart') },
    ...(isUser && (role === 'Admin' || role === 'Delivery Agent' || role === 'Vendor') ? [] : [
      { type: 'divider' },
      { key: 'myaccount', label: 'My Account', icon: <UserOutlined /> },
      { key: 'orders', label: 'Orders', icon: <ProfileOutlined /> },
      { key: 'wishlist', label: 'Wishlist', icon: <HeartOutlined /> },
      { key: 'coupons', label: 'Coupons', icon: <GiftOutlined /> },
    ]),
    ...(isUser ? [
      { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, onClick: logout },
    ] : [
      { key: 'becomeseller', label: renderMenuLabel('Become a Seller/Delivery'), icon: '' },
    ]),     
  ];

  const wishlistItems = wishlist.length === 0 ? [
    {
      key: 'emptywishlist',
      label: (
        <div className="flex flex-col items-center justify-center p-4 text-center">
          <div>Your wishlist is empty</div>
          <HeartIcon style={{ color: 'hotpink', fontSize: '5rem' }} />
        </div>
      )
    }
  ] : wishlist.map((wishlistItem) => {
    const product = products.find((prod) => prod._id === wishlistItem);
    if (!product) return null;
    return {
      key: wishlistItem.productId,
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
            </div>
          </div>
        </div>
      ),
    };
  });

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
      <>
      <div className="flex justify-between items-center px-4 py-2 border-t-2">
          <div className="font-bold text-xl">Total:</div>
          <div className="font-bold text-xl">₹{totalAmount}</div>
      </div>
      <div className="flex space-x-4  w-full">
        <Button
          onClick={handleNavigateCart} 
          className="w-1/2 py-2 px-4"
          color="default"
          size="large"
        >
          Check My Cart
        </Button>
        <Button
          onClick={handleCheckout} 
          className="w-1/2 py-2 px-4"
          color="default"
          variant="solid"
          size="large"
        >
          Checkout
        </Button>
      </div>
      </>
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
      //message.error('Authentication required. Please log in.');
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
          <img src={logo} alt="Logo" className="h-8" onClick={handleNavigateHome}/>
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
              <SearchOutlined style={{ fontSize: '1.5rem' }} className="cursor-pointer px-2" />
              <Dropdown menu={{ items: wishlistItems }} overlayClassName="sharp-corner-dropdown" placement="bottom" dropdownStyle={{ minWidth: '200px' }}>
                <Badge  count={wishlist.length}>
                  <a onClick={(e) => e.preventDefault()}>
                    <HeartOutlined style={{ fontSize: '1.5rem' }} className="cursor-pointer px-2"/>
                  </a>
                  </Badge>
              </Dropdown>
              <Dropdown menu={{ items: cartItems }} overlayClassName="sharp-corner-dropdown" placement="bottom" dropdownStyle={{ minWidth: '200px' }}>
                <Badge  count={cart.length}>
                  <a onClick={(e) => e.preventDefault()}>
                    <ShoppingCartOutlined style={{ fontSize: '1.5rem' }} className="cursor-pointer px-2" />
                  </a>
                </Badge>
              </Dropdown>
            </>
          )}

          {/* User Dropdown */}
          <Dropdown menu={{ items: userMenuItems }} overlayClassName="sharp-corner-dropdown">
            <a onClick={(e) => e.preventDefault()}>
              <Avatar size="medium" icon={<UserOutlined />} style={{backgroundColor: isUser ? "#87d068" : ''}} className="cursor-pointer mx-4" />
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
