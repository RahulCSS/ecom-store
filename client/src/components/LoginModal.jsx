import React from 'react'
import { Modal, Form, Input, Button, Flex, message } from "antd"
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoginModal, showSignupModal} from '../store/ModalSlice'
import { Link } from 'react-router-dom'
import { LoginUser } from '../apicalls/user'
import { setUser, setUserRole } from '../store/UserSlice'

const LoginModal = () => {
    const dispatch = useDispatch();
    const visible = useSelector((state) => state.modal.isLoginModalOpen);

    const submit = async (values)=>{
        dispatch(hideLoginModal());
        try{
            const response = await LoginUser(values);
            if(response.success){
                message.success(response.message);
                localStorage.setItem('token', response.userData.token);
                dispatch(setUser(response.userData));
                dispatch(setUserRole(response.userData.role));
            }else{
                message.error(response.message);
            }
        }catch(error){
            message.error(error.message);
        }
        form.resetFields();
    };

    const [form] = Form.useForm();

    const handleRegisterClick = () => {
        dispatch(hideLoginModal());
        dispatch(showSignupModal());
    };

  return (
    <Modal
        title="Login"
        open={visible}
        onCancel={() => dispatch(hideLoginModal())}
        footer={null}
        centered={true}
        destroyOnClose={true}>
        <Form
            form={form}
            layout="vertical"
            onFinish={submit}
            name="login"
            initialValues={{ remember: true }}
            style={{ width: 240}}
            >
            <Form.Item name="email" rules={[{required: true,message: 'Please input your E-mail!',},]}>
                <Input prefix={<MailOutlined />} placeholder="E-mail" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item >
                <Link className="login-form-forgot" to ='/forgot'> Forgot password</Link>
            </Form.Item>
            <Form.Item>
                <Button block type="primary" htmlType="submit">Log in</Button>
                <Flex justify="center" align="center">
                <a onClick={handleRegisterClick} >New User, Register now!</a>
                </Flex>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default LoginModal