import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Form, Button, Checkbox, Input, Upload, Flex,  message } from 'antd';
import axios from 'axios';
import { useSelector} from 'react-redux'
import { UpdateUser, GetCurrentUser } from '../apicalls/user';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

const MyAccount = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [fileList, setFileList] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [uploading, setUploading] = useState(false);
    const [form] = Form.useForm();
    const user = useSelector((state)=> state.user);
    const isUser = !!user.id;
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
    const navigate = useNavigate();

    // Image Upload
      const handleUpload = async (file) => {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
    
        try {
          const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
    
          if (response.status === 200) {
            const url = response.data.url;
            message.success('Image uploaded successfully!');
            setImageUrl(url);
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
    
    const handleSave = async(values) => {
        const {upload, ...rest} = values;
        const formData = { ...rest, profile_pic: imageUrl };
            try {
                const response = await UpdateUser(user.id,formData);
                if (response.success) {
                  message.success(response.message);
                  form.resetFields();
                  setFileList();
                  setImageUrl();
                } else {
                  message.error(response.message);
                }
              } catch (error) {
                message.error('Failed to add user details');
              } finally {
                GetCurrentUser();
              }
    };
    useEffect(() => {
        if(!isUser){
            navigate('/');
        }
     }, []);
    useEffect(() => {
    if (isUser) {
        form.setFieldsValue({
          name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          profile_pic: user.profile_pic,
          address: user.address,
          status: user.status,
        });
      }
    }, [user, form]);

  return (
    <div className='max-w-screen-2xl mx-auto min-h-screen flex justify-center mt-[55px] pt-20'>
        <div className='flex flex-col items-center'>
            <div className='text-3xl mb-8'> My Account</div>
            <div className='w-96'>
                <Flex justify="end" align="center" className='mb-4'>
                    <Checkbox
                            checked={componentDisabled}
                            onChange={(e) => setComponentDisabled(e.target.checked)}
                            >
                        Form disabled
                    </Checkbox>
                </Flex>
                <Form
                    form={form}
                    initialValues={{
                        name: user.name,
                        email: user.email,
                        phone_number: user.phone_number,
                        profile_pic: user.profile_pic,
                        address: user.address,
                        status: user.status,
                      }}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    layout="horizontal"
                    disabled={componentDisabled}
                    style={{ maxWidth: 600 }}
                    onFinish={handleSave}
                    >
                    <Form.Item name="name" label="Name">
                    <Input placeholder="Enter Full Name"/>
                    </Form.Item>
                    <Form.Item name="email" label="E-mail">
                    <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item name="phone_number" label="PhoneNumber">
                    <Input placeholder="Add Phone Number"/>
                    </Form.Item>
                    <Form.Item name="address" label="Address">
                    <TextArea placeholder="Add Address"rows={4} />
                    </Form.Item>
                    <Form.Item name="status" label="Account Status" >
                    <Input disabled={true} value={user.status} />
                    </Form.Item>
                    <Form.Item label="Profile Pic" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload 
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        maxCount={1}
                        customRequest={({ file, onSuccess, onError }) => {
                            handleUpload(file).then((url) => {
                              if (url) {
                                onSuccess();
                              } else {
                                onError('Upload failed');
                              }
                            });
                          }}>
                        <button
                        style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
                        type="button"
                        >
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="end" align="center">
                            <Button type="primary" htmlType="submit" loading={uploading}>
                                Save
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default MyAccount