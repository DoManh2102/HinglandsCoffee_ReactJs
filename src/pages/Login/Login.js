import React, { useEffect } from 'react';
import './Login.css'
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../../redux/action/UserLoginAction';
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';
import { Helmet } from "react-helmet";


export default function Login(props) {
    let { userLogin } = useSelector(state => state.UserLoginReducer)
    const dispatch = useDispatch()
    let navigate = useNavigate();

    //validate đã nhập tt
    const onFinish = async (values) => {
        await dispatch(LoginAction(values))
        navigate(-1);
    };

    //validate chưa nhập tt
    // const onFinishFailed = async (errorInfo) => {
    //     await console.log('Failed:', errorInfo);
    // };

    //userLogin đã tồn tại => điều hướng trang đến dashboard
    useEffect(() => {
        let LoggedIn = localStorage.getItem('USER_LOGIN')
        LoggedIn = JSON.parse(LoggedIn)
        // LoggedIn?.type === 'Admin' ? navigate("/dashboard") : navigate("/login");
        if (LoggedIn) {
            if (LoggedIn?.user.type === 'Admin') {
                navigate("/dashboard")
            } else {
                navigate(-1);
            }
        } else {
            navigate("/login");
        }
    }, [userLogin]);

    const login = async () => {
        const value = {
            email: "domanh@gmail.com",
            password: '21022001',
        }
        await dispatch(LoginAction(value))
        navigate(-1)
    }

    return (
        <div className='form_login'>
            <Helmet>
                <title>Login | Highlands Coffee</title>
            </Helmet>
            <div className="form" style={{ margin: '80px 0 50px 0' }}>
                <div id="form_container">
                    <div id="title">
                        <h3>Đăng Nhập</h3>
                    </div>
                    <br />
                    <br />
                    <Form
                        name="basic"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            style={{ color: '#fff !important' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 5,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 5,
                                span: 16,
                            }}
                        >
                            <Button onClick={() => login()} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>

                    <div className="dangnhap d-flex justify-content-evenly mt-5 px-5">
                        <Link to='/' className="tk">
                            <BiArrowBack />
                            <span className='ml-2'>Trang chủ</span>
                        </Link>
                        <a className="tk">Tạo Tài Khoản</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
