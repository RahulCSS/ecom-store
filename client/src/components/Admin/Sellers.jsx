import React, { useEffect, useState } from 'react';
import { Tabs, Table, Switch, message, Image, Button} from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts} from "../../store/ProductSlice";
import { UpdateStatus } from '../../apicalls/product';
const Sellers = () => {
  const dispatch = useDispatch();
  const products = useSelector(state=> state.product.fetchProduct);
  const [groupedProducts, setGroupedProducts] = useState({});
  
  //* API
  const handleProductStatusChange = async (checked, product) => {
    const newStatus = checked ? 'approved' : 'rejected';
    try {
      const response = await UpdateStatus(product._id, newStatus);
      if (response.success) {
        message.success(`Product status updated to ${newStatus}`);
        dispatch(fetchProducts()); // Re-fetch products to update the UI
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
      title: 'Subategory',
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
        <h2>Products from {groupedProducts[sellerId].name}</h2>
        <Table
          columns={columns}
          dataSource={groupedProducts[sellerId].products}
          rowKey="_id"
          pagination={false}
        />
      </>
    ),
  }));
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


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
  return (
    <>
      <Button 
            type="default" 
            icon={<ReloadOutlined />} 
            onClick={handleRefresh}
          >
            Refresh Products
      </Button>
      <Tabs defaultActiveKey="0" items={items} >
      
      </Tabs>
    </>
  )
}

export default Sellers