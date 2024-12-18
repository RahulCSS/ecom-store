import React, { useEffect, useState } from 'react';
import { Tabs, Table, Switch, message, Image, Button, Row, Col, Select } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../../store/ProductSlice";
import { UpdateStatus } from '../../apicalls/product';

const { Option } = Select;

const Sellers = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.fetchProduct);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    status: '',
  });

  //Handlers
  const handleProductStatusChange = async (checked, product) => {
    const newStatus = checked ? 'approved' : 'rejected';
    try {
      const response = await UpdateStatus(product._id, newStatus);
      if (response.success) {
        message.success(`Product status updated to ${newStatus}`);
        dispatch(fetchProducts());
      } else {
        message.error('Failed to update product status');
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const handleRefresh = () => {
    dispatch(fetchProducts());
  };
  const handleFilterChange = (value, type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    if (products) {
      const groupBySeller = products.reduce((acc, product) => {
        const sellerId = product.vendor_Id._id;
        const sellerName = product.vendor_Id.name;

        if (!acc[sellerId]) {
          acc[sellerId] = { name: sellerName, products: [] };
        }

        acc[sellerId].products.push(product);
        return acc;
      }, {});

      setGroupedProducts(groupBySeller);
    }
  }, [products]);

  // Filter products
  const getFilteredProducts = (sellerId) => {
    const sellerProducts = groupedProducts[sellerId]?.products || [];
    return sellerProducts.filter((product) => {
      const { category, subcategory, status } = filters;
      return (
        (category ? product.category === category : true) &&
        (subcategory ? product.subcategory === subcategory : true) &&
        (status ? product.status === status : true)
      );
    });
  };

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
      render: (imageUrl) => <Image width={100} src={imageUrl[0]} alt="Product Image" />,
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
      title: 'Subcategory',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <span style={{ color: status === 'pending' ? 'orange' : status === 'approved' ? 'green' : 'red' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, product) => (
        <Switch
          checked={product.status === 'approved'}
          onChange={(checked) => handleProductStatusChange(checked, product)}
          checkedChildren="Approved"
          unCheckedChildren="Rejected"
        />
      ),
    },
  ];

  
  const items = Object.keys(groupedProducts).map((sellerId) => ({
    key: sellerId,
    label: `${groupedProducts[sellerId].name}`,
    children: (
      <>
        <Row justify="space-between" style={{ marginBottom: 20 }}>
          
          <Col>
            <Button type="default" icon={<ReloadOutlined />} onClick={handleRefresh}>
              Refresh Products
            </Button>
          </Col>

          
          <Col>
            <Row gutter={16}>
              <Col>
                <Select
                  placeholder="Select Category"
                  style={{ width: 180 }}
                  onChange={(value) => handleFilterChange(value, 'category')}
                  allowClear
                >
                  <Option value="Electronics">Electronics</Option>
                  <Option value="Clothing">Clothing</Option>
                  <Option value="Furniture">Furniture</Option>
                </Select>
              </Col>

              <Col>
                <Select
                  placeholder="Select Subcategory"
                  style={{ width: 180 }}
                  onChange={(value) => handleFilterChange(value, 'subcategory')}
                  allowClear
                >
                  <Option value="Phones">Phones</Option>
                  <Option value="Laptops">Laptops</Option>
                  <Option value="Accessories">Accessories</Option>
                </Select>
              </Col>

              <Col>
                <Select
                  placeholder="Select Status"
                  style={{ width: 180 }}
                  onChange={(value) => handleFilterChange(value, 'status')}
                  allowClear
                >
                  <Option value="approved">Approved</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="rejected">Rejected</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>

        
        <Table
          columns={columns}
          dataSource={getFilteredProducts(sellerId)} 
          rowKey="_id"
          pagination={false}
        />
      </>
    ),
  }));

  return (
    <>
      <Tabs defaultActiveKey="0" items={items} />
    </>
  );
};

export default Sellers;
