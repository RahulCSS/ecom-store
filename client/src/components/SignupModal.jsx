import React from 'react'
import { Modal, Form, Input, Button, Flex, message } from "antd";
import { ArrowRightOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from'react-redux';
import { hideSignupModal,showLoginModal } from '../store/ModalSlice';
import { RegisterUser } from '../apicalls/user';

const SignupModal = () => {
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.user.role);
    const visible = useSelector((state) => state.modal.isSignupModalOpen);
    //console.log('Signup-'+visible);

    const [form] = Form.useForm();
    const handleRegisterClick = () => {
        dispatch(hideSignupModal()); 
        dispatch(showLoginModal());
    };
    const handleSubmit = async(values)=>{
        dispatch(hideSignupModal());
        const { confirmPassword , ...filtered } = values;
        const userPayload = {...filtered, role: userRole};
        //console.log(values, filtered, userPayload);
        try{
          const response = await RegisterUser(userPayload);
          if(response.success){
            message.success(response.message);
            message.info({
              content: "You can login now.",
            });
            setTimeout(() => {
              handleRegisterClick();
            },1000);
            //console.log(response.message);
          }else{
            message.error(response.message);
            //console.error(response.message);
          }
        }catch(error){
          message.error(error.message);
          //console.error(error.message);
        }
        form.resetFields();
    };

  return (
    <Modal
      title="Sign Up"
      open={visible}
      onCancel={() => dispatch(hideSignupModal())}
      footer={null}
      centered={true}
      destroyOnClose={true}
    >
      <Form
        form={form}
        layout="vertical"
        style={{ width: 240}}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' },
                  { min: 8, message: 'Password must be at least 8 characters!'},]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
            <Flex justify="center" align="center">
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Flex>
            <Flex justify="center" align="center">
                <a onClick={handleRegisterClick}> Already an User, Login <ArrowRightOutlined /></a>
            </Flex>
                
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SignupModal