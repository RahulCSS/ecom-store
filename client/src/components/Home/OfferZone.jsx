import React from 'react';
import { Card, Col, Row } from 'antd';

const { Meta } = Card;

const OfferZone = () => {
  
  const card1 = [
    { title: 'Card 1', description: 'Card 1 Description' },
    { title: 'Card 2', description: 'Card 2 Description' },
    { title: 'Card 3', description: 'Card 3 Description' },
    { title: 'Card 4', description: 'Card 4 Description' },
  ];

  const card2 = [
    { title: 'Card A', description: 'Card A Description' },
    { title: 'Card B', description: 'Card B Description' },
    { title: 'Card C', description: 'Card C Description' },
    { title: 'Card D', description: 'Card D Description' },
  ];

  const card3 = [
    { title: 'Card X', description: 'Card X Description' },
    { title: 'Card Y', description: 'Card Y Description' },
  ];

  return (
    <div className='pb-[20px]'>
      
      <Row gutter={[12, 16]}> 
        
        <Col span={8}>
          <Card style={{ height: '100%' }} title="More reasons to shop" bordered={false}>
            
            <Row gutter={[16, 16]}>
              {card1.map((card, index) => (
                <Col span={12} key={index}>
                  <Card hoverable cover={<img alt={card.title} src="https://via.placeholder.com/150" />}>
                    <Meta title={card.title} description={card.description} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        
        <Col span={8}>
          <Card style={{ height: '100%' }} title="Biggest deals" bordered={false}>
            
            <Row gutter={[16,16]}>
              {card2.map((card, index) => (
                <Col span={12} key={index}>
                  <Card hoverable cover={<img alt={card.title} src="https://via.placeholder.com/150" />}>
                    <Meta title={card.title} description={card.description} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        
        <Col span={8}>
          <Card style={{ height: '100%' }} title="In focus" bordered={false}>
            
            <Row gutter={[16, 16]}>
              {card3.map((card, index) => (
                <Col span={24} key={index}> 
                  <Card hoverable cover={<img alt={card.title} src="https://via.placeholder.com/300x150" />}>
                    <Meta title={card.title} description={card.description} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OfferZone;
