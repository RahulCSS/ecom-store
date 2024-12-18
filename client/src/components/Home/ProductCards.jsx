import React, { useRef } from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined, RightOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Meta } = Card;

const ProductCards = ({ category }) => {
  const allProducts = useSelector((state) => state.product.fetchProduct);
  const filteredProducts = allProducts.filter(
    (product) => product.category === category
  );

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

  return (
    <div className="pt-5">
      <div className="relative flex items-center justify-center">
        
        <Button
          icon={<LeftOutlined />}
          onClick={() => handleScroll('left')}
          className="absolute left-0 z-10 bg-black bg-opacity-50 text-white"
        />

        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-4 px-4 py-4 w-full scroll-smooth"
        >
          {filteredProducts.map((product, index) => (
            <div key={index} className="relative">
              <Card
                hoverable
                style={{ width: '220px', height: '360px', flexShrink: 1 }} 
                cover={<img alt={product.name} src={product.imageURL[0]} />}
              >
                
                <div className="absolute top-2 right-2 z-10 cursor-pointer">
                  <HeartOutlined style={{ fontSize: '20px', color: 'red' }} />
                </div>
              
                <div className="absolute bottom-2 right-2 z-10 cursor-pointer">
                  <ShoppingCartOutlined style={{ fontSize: '20px', color: 'green' }} />
                </div>
                <Meta title={product.name} description={product.description} />
              </Card>
            </div>
          ))}
        </div>

        <Button
          icon={<RightOutlined />}
          onClick={() => handleScroll('right')}
          className="absolute right-0 z-10 bg-black bg-opacity-50 text-white"
        />
      </div>
    </div>
  );
};

export default ProductCards;
