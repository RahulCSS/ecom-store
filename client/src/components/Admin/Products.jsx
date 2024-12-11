import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table, message, Button, Row, Col, Image } from 'antd';
const { Search } = Input;
import { fetchProducts } from "../../store/ProductSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.fetchProduct);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl) => (
        <Image width={100} src={imageUrl[0]} alt="Product Image" />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Sub-Category',
      dataIndex: 'subcategory',
      key: 'subcategory', 
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor_Id', 
      key: 'vendor_Id', 
      render: (vendorId) => vendorId ? vendorId.name : 'N/A',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span
          style={{
            color:
              status === 'pending'
                ? 'orange'
                : status === 'approved'
                ? 'green'
                : 'red',
          }}
        >
          {status}
        </span>
      ),
    },
  ];

  //* Handlers
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  // Handle show all products
  const onShowAll = () => {
    setFilteredProducts(products); 
  };

  //* State
  useEffect(() => {
    dispatch(fetchProducts());  
    setFilteredProducts(products); 
  }, [dispatch]);  

  return (
    <div>
      <Row justify="space-between" style={{ marginBottom: 20 }}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8} offset={8}>
          <Search
            placeholder="Search products by name"
            enterButton
            allowClear
            value={searchText}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs={24} sm={4} md={4} lg={4} xl={4} style={{ textAlign: 'right' }}>
          <Button onClick={onShowAll}>Show All</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Products;
