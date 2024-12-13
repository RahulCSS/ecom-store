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
    <div className="flex justify-between items-center w-full">
      
      <div className="w-[70%]">
        <Carousel autoplay arrows>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`carousel-image-${index}`}
                className="object-cover w-full h-[16rem]"
              />
            </div>
          ))}
        </Carousel>
      </div>

      
      <div className="w-[30%] h-[16rem] bg-gray-300 flex justify-center items-center">
        <div className="text-center text-white font-bold">Poster Content</div>
      </div>
    </div>
  );
}

export default Carouselbanner