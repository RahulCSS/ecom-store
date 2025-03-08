import React from 'react';
import { Card, Col, Row } from 'antd';

const { Meta } = Card;

const OfferZone = () => {
  
  const card1 = [
    { title: 'Nothing Phone 2a', description: '6.77 inch 8GB 256GB 5G White', price:'22000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2Fshopping.jpeg?alt=media&token=ac7a85bc-5a27-45f3-ba34-cbceae4e7b83' },
    { title: 'Nothing Buds 1', description: 'Wireless Earphones Noise Cancelling Chat GPT Integration 30 hour battery', price:'4000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2F61IzjvLIN6L._SL1500_.jpg?alt=media&token=6e26710e-de54-416e-a547-5b2156bb47f8' },
    { title: 'CMF Phone 1', description: '6.7 inch 6GB 128GB Orange', price:'15000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2F71wj5W%2BolHL._SL1500_.jpg?alt=media&token=d7348a93-0bfb-4b61-b792-a167c25be553' },
    { title: 'CMF Buds 1', description: 'Wireless Earphones 22 hour battery', price:'2500', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2F71ycp7Dx2CL._SL1500_.jpg?alt=media&token=8c80e398-f3ad-44a2-adb6-11786e22e655' },
  ];

  const card2 = [
    { title: 'Iphone 16', description: '6.3 inch 128GB Blue', price:'60000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2Fapple-iphone-16-1.jpg?alt=media&token=ca01db34-173b-413f-950c-7dbd93016a59' },
    { title: 'Iphone 16 Plus', description: '6.8 inch 128GB Pink', price:'68000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2Fapple-iphone-16-plus-1.jpg?alt=media&token=548c1c02-e1a9-475b-ab7b-90d16305e724' },
    { title: 'Iphone 16E', description: '6.1 inch 128GB White', price:'45000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2Fapple-iphone-16e-1.jpg?alt=media&token=a32fe0ac-5a06-4a58-b5ac-df15c4f325a9' },
    { title: 'Iphone 16 Pro', description: '6.3 inch 256GB Silver', price:'96000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2Fapple-iphone-16-pro-1.jpg?alt=media&token=16ae5aff-a5a8-4410-96fc-9ac089852218' },
  ];

  const card3 = [
    { title: 'Nothing 3a Pro', description: '6.7 inch 8Gb 128GB Silver', price:'24000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2FSCR-20250308-owjv.jpeg?alt=media&token=345cab3e-d89e-47d8-8159-47a7e4a3b26e' },
    { title: 'Nothing 3a', description: '6.7 inch 8GB 128GB White', price:'28000', imageurl: 'https://firebasestorage.googleapis.com/v0/b/zip-store13.appspot.com/o/offers%2FSCR-20250308-owfz.jpeg?alt=media&token=616c3cf7-8edc-48d6-a1eb-47c93dc633ca' },
  ];

  return (
    <div className='pb-[20px]'>
      
      <Row gutter={[12, 16]}> 
        
        <Col span={8}>
          <Card style={{ height: '100%' }} title="More reasons to shop" bordered={false}>
            
            <Row gutter={[16, 16]}>
              {card1.map((card, index) => (
                <Col span={12} key={index}>
                  <Card hoverable cover={<img alt={card.title} src={card.imageurl} />}>
                    <Meta title={card.title} description={card.description} />
                    <span>{`Offer Price ₹${card.price}`}</span>
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
                  <Card hoverable cover={<img alt={card.title} src={card.imageurl} />}>
                    <Meta title={card.title} description={card.description} />
                    <span>{`Offer Price ₹${card.price}`}</span>
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
                  <Card hoverable cover={<img alt={card.title} src={card.imageurl} />}>
                    <Meta title={card.title} description={card.description} />
                    <span>{`Offer Price Starts at ₹${card.price}`}</span>
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
