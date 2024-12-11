import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Button, InputNumber,Select, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useDispatch, useSelector } from 'react-redux';
import { hideProductModal, editProduct } from '../../store/ProductSlice';
import axios from 'axios';
import { AddProduct } from '../../apicalls/product';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ProductModal = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.product.showModal);
  const vendorId = useSelector((state) => state.user.id);
  const { currentProduct } = useSelector((state) => state.product);

  const category = [ "Electronics", "Fashion","Appliance", "Home & Furiture", "Grocery", 
    "Beauty", "Toys", "Stationary", "Health"];
  const categoryToSubcategories = {
    Electronics: ["Phones", "Laptops", "Cameras", "Accessories"],
    Fashion: ["Clothing", "Footwear", "Jewelry", "Accessories"],
    Appliance: [ "Decor", "Kitchenware", "Bedding"],
    'Home & Furniture': ["Air Conditioner","Refrigirator","Television","PlayStation"],
    Grocery: ["Fruits & Vegetables", "Dairy", "Snacks", "Beverages","Canned Goods", "Frozen Foods", "Condiments", "Baking Supplies"],
    Beauty: ["Skincare", "Haircare", "Bath & Body", "Aroma"],
    Toys: ["Video Games", "Kids Toys", "Cars"],
    Stationery: ["Notebooks", "Pens & Pencils", "Art Supplies", "Office Supplies"],
    Health: ["Vitamins", "Supplements", "Personal Care", "Fitness"],
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSubCategories(categoryToSubcategories[value] || []);
    form.setFieldsValue({ subCategory: undefined });
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleCancel = () => {
    dispatch(hideProductModal());
  };

  // Uploads image to AWS and returns imageUrl
  const handleUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8082/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const url = response.data.url;
        message.success('Image uploaded successfully!');
        setImageUrls((prevUrls) => [...prevUrls, url]);
        setUploading(false);
        return url;
      } else {
        console.error('Upload failed with status:', response.status);
        message.error('Image upload failed. Please try again.');
        setUploading(false);
        return '';
      }
    } catch (error) {
      console.error('Upload failed:', error);
      message.error('Image upload failed. Please try again.');
      setUploading(false);
      return '';
    }
  };

  const handleSubmit = async (values) => {
    const {upload, ...rest} = values;
    const formData = { ...rest, imageUrl: imageUrls, vendor_Id:vendorId };

    if (currentProduct) {
      // Editing existing product
      try {
        dispatch(editProduct({ ...currentProduct, ...formData }));
        message.success('Product updated successfully');
        form.resetFields();
        setFileList([]);
        setImageUrls([]);
      } catch (error) {
        message.error('Failed to update product');
      }
    } else {
      // Adding new product
      try {
        console.log(formData);
        const response = await AddProduct(formData);
        if (response.success) {
          message.success(response.message);
          form.resetFields();
          setFileList([]);
          setImageUrls([]);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error('Failed to add product');
      }
    }
    handleCancel();
  };

  return (
    <Modal
      title={currentProduct ? 'Edit Product' : 'Add Product'}
      open={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        autoComplete="off"
        initialValues={currentProduct || { name: '', price: 0, quantity: 0, category: '', subcategory: '', description: '', items: [{}] }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item label="Product Name" name="name" 
            rules={[{ required: true, message: 'Enter product name' }]}>
          <Input placeholder="Product name" />
        </Form.Item>
        <Form.Item label="Price" name="price" 
            rules={[{ required: true, message: 'Enter product price' }]}>
          <InputNumber min={0} placeholder="Price in Rs" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="stock" label="Quantity" 
            rules={[{ required: true, message: 'Enter Quantity' }]}>
          <InputNumber min={0} placeholder="Qty" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Category" name="category" 
            rules={[{ required: true, message: 'Enter product category' }]}
            onChange={handleCategoryChange}>
          <Select placeholder="Select a category" onChange={handleCategoryChange}>
          {Object.keys(categoryToSubcategories).map((category) => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
          </Select>
        </Form.Item>
        <Form.Item label="Sub-Category" name="subcategory" 
            rules={[{ required: true, message: 'Enter product sub-category' }]}>
          <Select placeholder="Select a subcategory">
              {subCategories.map((subCategory) => (
                <Select.Option key={subCategory} value={subCategory}>
                  {subCategory}
                </Select.Option>
              ))}
            </Select>
        </Form.Item>
        <Form.Item label="Description" name="description" 
            rules={[{ required: true, message: 'Enter product description' }]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="upload" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <ImgCrop rotationSlider>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              customRequest={({ file, onSuccess, onError }) => {
                handleUpload(file).then((url) => {
                  if (url) {
                    onSuccess();
                  } else {
                    onError('Upload failed');
                  }
                });
              }}
            >
              <button style={{ background: 'none' }} type="button">
                <PlusOutlined />
                <div>Upload</div>
              </button>
            </Upload>
          </ImgCrop>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={uploading}>
            {currentProduct ? 'Save Changes' : 'Add Product'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
