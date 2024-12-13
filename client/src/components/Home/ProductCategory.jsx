import React, { useRef } from 'react';
import { Card, Button, Layout } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Meta } = Card;
const { Header, Content } = Layout;

const ProductCategory = ({ category, product }) => {
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
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: 'white', fontSize: '2rem' }}>
        {category}
      </Header>
      <Content style={{ paddingRight: '20px', paddingLeft: '20px', backgroundColor: 'white' }}>
        {Object.keys(product).map((subcategory) => {
          const productsInSubcategory = product[subcategory];

          return (
            <div
              key={subcategory}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginBottom: '30px',
              }}
            >
              {/* Left Arrow */}
              <Button
                icon={<LeftOutlined />}
                onClick={() => handleScroll('left')}
                style={{
                  position: 'absolute',
                  left: '0',
                  zIndex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                }}
              />

              {/* Scrollable Container for Cards */}
              <div
                ref={scrollContainerRef}
                style={{
                  display: 'flex',
                  overflowX: 'auto',
                  whiteSpace: 'nowrap',
                  gap: '16px',
                  padding: '16px 0',
                  width: '100%', 
                  scrollBehavior: 'smooth',
                }}
              >
                {productsInSubcategory.map((productItem, index) => (
                  <Card
                    key={index}
                    style={{ width: '220px', height: '400px', flexShrink: 1 }} 
                    cover={<img alt={productItem.name} src={productItem.imageUrl[0]} />}
                  >
                    <Meta title={<div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{productItem.name}</div>} 
                    description={`₹${productItem.price}`} />
                  </Card>
                ))}
              </div>

              {/* Right Arrow */}
              <Button
                icon={<RightOutlined />}
                onClick={() => handleScroll('right')}
                style={{
                  position: 'absolute',
                  right: '0',
                  zIndex: 1,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                }}
              />
            </div>
          );
        })}
      </Content>
    </Layout>
  );
};

export default ProductCategory;
