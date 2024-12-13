import React, { useRef } from 'react';
import { Card, Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Meta } = Card;

const Products = () => {
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

  // Dummy data for the cards
  const cardData = [
    { title: 'Card 1', description: 'Description for Card 1' },
    { title: 'Card 2', description: 'Description for Card 2' },
    { title: 'Card 3', description: 'Description for Card 3' },
    { title: 'Card 4', description: 'Description for Card 4' },
    { title: 'Card 5', description: 'Description for Card 5' },
    { title: 'Card 6', description: 'Description for Card 6' },
    { title: 'Card 7', description: 'Description for Card 7' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
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
            width: '100%', // Set width to control container size
            scrollBehavior: 'smooth',
          }}
        >
          {cardData.map((card, index) => (
            <Card
              key={index}
              style={{ width: '220px',height: '360px', flexShrink: 1 }} // Control card width
              cover={<img alt={card.title} src="https://via.placeholder.com/200x240" />}
            >
              <Meta title={card.title} description={card.description} />
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
    </div>
  );
};

export default Products;
