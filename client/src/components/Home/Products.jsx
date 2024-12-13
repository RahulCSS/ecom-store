import React from 'react'
import ProductCategory from './ProductCategory';
import { useSelector } from 'react-redux';

const Products = () => {
  const allProducts = useSelector((state) => state.product.fetchProduct);
  const groupedProduct = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = {};
    }
    if(!acc[product.category][product.subcategory]){
        acc[product.category][product.subcategory]=[];
    }
    acc[product.category][product.subcategory].push(product);
    return acc;
  }, {});

  return (
    <>
        {Object.keys(groupedProduct).map((category) => (
        <ProductCategory
          key={category}
          category={category}
          product={groupedProduct[category]}
        />
      ))}
    </>
  )
}

export default Products