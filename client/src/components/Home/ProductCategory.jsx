import React, { useRef, useState } from 'react';
import { Card, Button, Layout, FloatButton } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined, ShoppingCartOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addremoveWish, addtoCart, removefromCart } from '../../store/UserSlice';

const { Meta } = Card;
const { Header, Content } = Layout;

const ProductCategory = ({ category, product }) => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleAddRemoveWish = (id) => {
    dispatch(addremoveWish(id));
  };

  const handleAddtoCart = (id) => {
    dispatch(addtoCart(id));
  };

  const handleRemovefromCart = (id) => {
    dispatch(removefromCart(id));
  }

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white text-2xl">
        {category}
      </Header>
      <Content className="px-5 bg-white">
        {Object.keys(product).map((subcategory) => {
          const productsInSubcategory = product[subcategory];

          return (
            <div key={subcategory} className="flex items-center justify-center relative mb-8">
              {/* Left Arrow */}
              <Button
                icon={<LeftOutlined />}
                onClick={() => handleScroll('left')}
                className="absolute left-0 z-10 bg-black bg-opacity-50 text-white"
              />

              {/* Scrollable Container for Cards */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto whitespace-nowrap gap-4 py-4 w-full scroll-smooth"
              >
                {productsInSubcategory.map((productItem, index) => (
                  <div key={index} className="relative w-56 h-96">
                    <Card
                      hoverable
                      className="w-full h-full flex-shrink-0"
                      cover={<img alt={productItem.name} src={productItem.imageUrl[0]} />}
                    >
                      <Meta
                        title={<div className="text-sm break-words">{productItem.name}</div>}
                        description={`₹${productItem.price}`}
                      />
                    </Card>

                    {/* Floating Heart (Wishlist) Button */}
                    <FloatButton
                      icon={<HeartOutlined />}
                      className="absolute top-2 right-2 z-10 bg-red-500 text-white"
                      shape="circle"
                      onClick={() => handleAddRemoveWish(productItem._id)}
                    />

                    {/* Floating Shopping Cart (Add to Cart) Button with Hover Effect */}
                    <FloatButton.Group
                      trigger="hover"
                      className="absolute  bottom-2 right-2 z-10"
                      shape="circle"
                      icon={<ShoppingCartOutlined />}
                    >
                      <FloatButton icon={<MinusOutlined />} onClick={() => handleRemovefromCart(productItem._id)}/>
                      <FloatButton icon={<PlusOutlined />} onClick={() => handleAddtoCart(productItem._id)}/>
                    </FloatButton.Group>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <Button
                icon={<RightOutlined />}
                onClick={() => handleScroll('right')}
                className="absolute right-0 z-10 bg-black bg-opacity-50 text-white"
              />
            </div>
          );
        })}
      </Content>
    </Layout>
  );
};

export default ProductCategory;
