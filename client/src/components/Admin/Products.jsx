import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Table, message, Button, Row, Col, Image, Select, InputNumber } from 'antd';
const { Search } = Input;
import { fetchProducts } from "../../store/ProductSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.fetchProduct);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: null,
    subcategory: null,
    priceRange: [null, null],
    stockRange: [null, null],
    status: null,
  });

  const categories = [...new Set(products.map((product) => product.category))]; // Unique categories
  const subcategories = [...new Set(products.map((product) => product.subcategory))]; // Unique subcategories
  const statusOptions = ['pending', 'approved', 'rejected'];

  const [isFetched, setIsFetched] = useState(false); // Flag to check if products are already fetched

  // Columns for the Table
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
      filters: categories.map((category) => ({
        text: category,
        value: category,
      })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Sub-Category',
      dataIndex: 'subcategory',
      key: 'subcategory',
      filters: subcategories.map((subcategory) => ({
        text: subcategory,
        value: subcategory,
      })),
      onFilter: (value, record) => record.subcategory === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
      
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <InputNumber
            min={0}
            placeholder="Min Price"
            style={{ width: '100%' }}
            value={selectedKeys[0] || ''}
            onChange={(value) => setSelectedKeys([value, selectedKeys[1]])}
          />
          <InputNumber
            min={0}
            placeholder="Max Price"
            style={{ width: '100%', marginTop: 8 }}
            value={selectedKeys[1] || ''}
            onChange={(value) => setSelectedKeys([selectedKeys[0], value])}
          />
          <div style={{ marginTop: 8 }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                confirm();
                setFilters({
                  ...filters,
                  priceRange: selectedKeys,
                });
              }}
            >
              Filter
            </Button>
            <Button
              size="small"
              style={{ marginLeft: 8 }}
              onClick={() => {
                clearFilters();
                setFilters({
                  ...filters,
                  priceRange: [null, null],
                });
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      onFilter: (value, record) => {
        const [min, max] = filters.priceRange;
        return (
          (min === null || record.price >= min) &&
          (max === null || record.price <= max)
        );
      },
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <InputNumber
            min={0}
            placeholder="Min Stock"
            style={{ width: '100%' }}
            value={selectedKeys[0] || ''}
            onChange={(value) => setSelectedKeys([value, selectedKeys[1]])}
          />
          <InputNumber
            min={0}
            placeholder="Max Stock"
            style={{ width: '100%', marginTop: 8 }}
            value={selectedKeys[1] || ''}
            onChange={(value) => setSelectedKeys([selectedKeys[0], value])}
          />
          <div style={{ marginTop: 8 }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                confirm();
                setFilters({
                  ...filters,
                  stockRange: selectedKeys,
                });
              }}
            >
              Filter
            </Button>
            <Button
              size="small"
              style={{ marginLeft: 8 }}
              onClick={() => {
                clearFilters();
                setFilters({
                  ...filters,
                  stockRange: [null, null],
                });
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      ),
      onFilter: (value, record) => {
        const [min, max] = filters.stockRange;
        return (
          (min === null || record.stock >= min) &&
          (max === null || record.stock <= max)
        );
      },
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
      filters: statusOptions.map((status) => ({
        text: status,
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
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

  // Handlers for Search and Filters
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  const onShowAll = () => {
    setFilteredProducts(products);
  };

  // State
  useEffect(() => {
    if (!isFetched) {
      dispatch(fetchProducts());
      setIsFetched(true); 
    } else {
      setFilteredProducts(products);
    }
  }, [dispatch, products, isFetched]); 

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
