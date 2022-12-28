import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Sidebar({ userLogin }) {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading d-flex">
                            <img src={userLogin.message === 'Đăng nhập thành công' ? userLogin.user.avata : ''} style={{ width: '50px', height: '50px', borderRadius: '50%', imageRendering: 'pixelated' }} />
                            <div className='ml-2'>
                                <h5 style={{ color: '#fff', fontWeight: '400', marginBottom: '5px', textTransform: 'capitalize' }}>{userLogin.message === 'Đăng nhập thành công' ? userLogin.user.user_name : ''}</h5>
                                <p style={{ color: '#fff', fontSize: '12px', fontWeight: '400', textTransform: 'capitalize' }}>{userLogin.message === 'Đăng nhập thành công' ? userLogin.user.type : ''} User</p>
                            </div>
                        </div>
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#admin" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                            Management
                        </a>
                        <div>
                            <nav className="sb-sidenav-menu-nested">
                                <Link className="nav-link" to='/dashboard'>Dashboard</Link>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                        User
                                    </a>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to='/managementAdmin'>Admin</Link>
                                        <Link className="dropdown-item" to='/managementClient'>Client</Link>
                                    </div>
                                </li>
                                <Link className="nav-link" to='/managementProduct'>Product</Link>
                                <Link className="nav-link" to="/managementCategory">Category</Link>
                                <Link className="nav-link" to="/managementNews">News</Link>
                                <Link className="nav-link" to="/managementOrder">Orders</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </nav >
        </div >
    );
}

export default Sidebar;