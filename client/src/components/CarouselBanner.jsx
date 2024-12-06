import React from 'react'
import { Carousel } from 'antd';

const images = [
    'https://zipcart.s3.ap-south-1.amazonaws.com/carousel_banner/Festival+Banner+1.png.avif',
    'https://zipcart.s3.ap-south-1.amazonaws.com/carousel_banner/Festival+Banner+2.gif',
    'https://zipcart.s3.ap-south-1.amazonaws.com/carousel_banner/Banner+1.png.avif',
    'https://zipcart.s3.ap-south-1.amazonaws.com/carousel_banner/Banner+3.png.avif',
    'https://zipcart.s3.ap-south-1.amazonaws.com/carousel_banner/Banner+4.png.avif',
    'https://zipcart.s3.ap-south-1.amazonaws.com/carousel_banner/Banner+5.png.avif',
    'https://zipcart.s3.ap-south-1.amazonaws.com/carousel_banner/Banner+8.gif',
    'https://zipcart.s3.ap-south-1.amazonaws.com/carousel_banner/Banner+10.png.avif',
];

const Carouselbanner = () => {
  return (
    <Carousel autoplay arrows >
        {images.map((image,index) => (
            <div key={index}>
                <img src={image}
                    className="object-contain w-[100%] h-[16rem] text-center "/>
            </div> 
        ))}
    </Carousel>
  )
}

export default Carouselbanner