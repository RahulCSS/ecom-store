import React from 'react'
import { useSelector} from 'react-redux'
import {  Tooltip } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';

const Wishlist = () => {
  const user = useSelector((state)=> state.user);
  const products = useSelector((state) => state.product.fetchProduct);
  const wishlist = user?.wishlist;
  console.log(wishlist);

  return (
    <div className='max-w-screen-2xl mx-auto min-h-screen  mt-[55px] pt-20'>
      <div className='flex flex-col items-center space-y-4 w-full'>
        <h1 className="text-3xl font-semibold mb-10">Wishlist</h1>
        {wishlist.map((productId) => {
          const product = products.find((prod) => prod._id === productId);
          if (!product) return null; 
  
          return (
            <div key={productId} className="flex items-center space-x-4 max-w-[800px] max-h-32 w-[800px] overflow-hidden gap-10">
              <div className="flex-shrink-0 w-[120px] ">
                <img
                  alt="product"
                  src={product.imageUrl[0]}
                  className="w-[120px] h-[120px] object-cover"
                />
              </div>
              <div className="flex-1 w-[5800px]">
                <div className="text-l ">{product.name}</div>
                <div className="text-xs font-thin ">{product.description}</div>
                <div className="flex justify-between items-center">
                  <div className="text-sm font-light">₹{product.price}</div>
                </div>
              </div>
              <div className="flex justify-between items-center w-[100px]">
                <Tooltip title="Add to Cart" color='geekblue' key="geekblue">
                  <ShoppingCartOutlined style={{ fontSize: '1.5rem' }} className="cursor-pointer px-2" onClick={() => handleAddToCart(product._id)} />
                </Tooltip>
                <Tooltip title="Remove" color='red' key="red">
                  <DeleteOutlined style={{ fontSize: '1.5rem' }} className="cursor-pointer px-2" onClick={() => handleRemoveFromWishlist(product._id)} />
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
}

export default Wishlist