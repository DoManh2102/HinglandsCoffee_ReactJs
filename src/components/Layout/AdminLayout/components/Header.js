import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

function Header(props) {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch({
            type: 'LOGIN_ACTION',
            userLogin: {}
        })
        localStorage.removeItem('USER_LOGIN');
        const LoggedIn = localStorage.getItem('USER_LOGIN')
        LoggedIn ? navigate("/dashboard") : navigate("/login");
    }

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3" to='/'>Highlands Coffee</Link>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars" /></button>
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search" /></button>
                </div>
            </form>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li>
                    <button className="btn btn-success" onClick={() => handleLogOut()}>
                        <BiLogOut />
                        <span className='ml-1'>Logout</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Header;