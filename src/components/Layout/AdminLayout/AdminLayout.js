import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './AdminLayout.css'

function AdminLayout({ children }) {
    let { userLogin } = useSelector(state => state.UserLoginReducer)
    let navigate = useNavigate();

    //tác dụng: nếu người dùng chưa đăng nhập => điều hướng trang đến login
    useEffect(() => {
        const LoggedIn = localStorage.getItem('USER_LOGIN')
        LoggedIn ? navigate("/dashboard") : navigate("/login");
    }, [userLogin]);

    return (
        <>
            <Header />
            <div id="layoutSidenav">
                <Sidebar userLogin={userLogin} />
                <>{children}</>
            </div>
        </>
    );
}

export default AdminLayout;