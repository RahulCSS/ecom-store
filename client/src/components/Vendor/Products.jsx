import React, { useEffect, useState } from 'react';
import { Layout, Tabs, Button, Table, Space, Tag, Image, message } from 'antd';
import { EditTwoTone, DeleteTwoTone, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ProductModal from './ProductModal'; // assuming this is another component in your project
import { fetchProduct, clearProduct, showProductModal, editProduct, fetchProductsBySeller } from '../../store/ProductSlice';
import { GetProduct } from '../../apicalls/product';

const { Content, Footer } = Layout;

const categories = [
  'Electronics',
  'Fashion',
  'Appliances',
  'Home & Furniture',
  'Groceries',
  'Beauty',
  'Toys',
  'Stationary',
  'Health'
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const vendorId = useSelector((state) => state.user.id);
  const products = useSelector((state) => state.product.fetchProduct);
  

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProductsBySeller(vendorId));
  }, [dispatch]);

  // Filter products based on selected category
  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products.filter((product) => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  // Show modal for adding/editing products
  const showModalHandler = () => {
    dispatch(clearProduct());
    dispatch(showProductModal());
  };
  const editProductHandler = (product) => {
    dispatch(editProduct(product));
  };

  // Refresh handler to fetch all products
  const handleRefresh = () => {
    dispatch(fetchProductsBySeller(vendorId));
  };
  
  const onTabChange = (key) => {
    setSelectedCategory(key); 
  };
  
  const columns = [
    { title: 'Product Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrls) => {
        const firstImageUrl = Array.isArray(imageUrls) && imageUrls.length > 0 ? imageUrls[0] : '';
        return firstImageUrl ? (
          <Image width={100} src={firstImageUrl} alt="Product Image" />
        ) : (
          <span>No Image</span>
        );
      },
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Subcategory', dataIndex: 'subcategory', key: 'subcategory' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Stock', dataIndex: 'stock', key: 'stock' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => {
        let color;
        if (status === 'rejected') {
          color = 'volcano';
        } else if (status === 'pending') {
          color = 'orange';
        } else if (status === 'approved') {
          color = 'green';
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => editProductHandler(record)} icon={<EditTwoTone />} />
          <Button icon={<DeleteTwoTone twoToneColor="#FF4D4F" />} />
        </Space>
      ),
    },
  ];


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '10px' }}>
        {/* Add Product and Refresh Products Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '20px',
            gap: '10px', // Adding space between buttons
          }}
        >
          {/* Add Product Button */}
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={showModalHandler}
          >
            Add Product
          </Button>

          {/* Refresh Products Button */}
          <Button 
            type="default" 
            icon={<ReloadOutlined />} 
            onClick={handleRefresh}
          >
            Refresh Products
          </Button>
        </div>

        {/* Tabs for each category */}
        <Tabs 
          onChange={onTabChange} 
          activeKey={selectedCategory} 
          type="card" 
          items={categories.map((category) => ({
            key: category,
            label: category,  // Tab title
            children: (
              // Table showing products for the selected category
              <Table
                columns={columns}
                rowKey="_id"
                dataSource={filteredProducts} 
                loading={!products} 
              />
            ),
          }))}
        >
        </Tabs>
      </Content>

      <Footer style={{ textAlign: 'center' }}>©2024 Inventory Management System</Footer>

      {/* Product Modal */}
      <ProductModal />
    </Layout>
  );
};

export default Products;
