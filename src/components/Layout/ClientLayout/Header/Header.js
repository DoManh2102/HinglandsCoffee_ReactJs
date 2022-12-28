import React, { useState, useEffect } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { BsCartPlusFill } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getCategoryDetailt, getCategoryListAction } from '../../../../redux/action/CategoryAction';
import { getProductDetailt, getProductListApi, getProductSearch } from '../../../../redux/action/ProductAction';
import { useNavigate } from "react-router-dom";

function Header(props) {
    let { productList } = useSelector(state => state.ProductReducer)
    let { categorys } = useSelector(state => state.CategoryReducer)
    let { userLogin } = useSelector(state => state.UserLoginReducer)
    const { productCart } = useSelector(state => state.CartReducer)

    const [inputSearch, setInputSearch] = useState({
        name: ''
    })

    const dispatch = useDispatch()
    useEffect(() => {
        const action = getCategoryListAction();
        dispatch(action)
    }, [])

    useEffect(() => {
        const action = getProductListApi();
        dispatch(action)
    }, [])

    const params = useParams()
    useEffect(() => {
        const { id } = params
        dispatch(getProductDetailt(id))
        dispatch(getCategoryDetailt(id))
    }, [params.id])

    let navigate = useNavigate();
    const handleLogOut = async () => {
        if (window.confirm("Bạn muốn đăng xuất?") == true) {
            await dispatch({
                type: 'LOGIN_ACTION',
                userLogin: ''
            })
            navigate("/login");
            // localStorage.clear();
        }
    }

    const handleChange = (e) => {
        let copyInputSearch = { ...inputSearch }
        const { value, name } = e.target;
        setInputSearch({
            ...copyInputSearch,
            [name]: value
        })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(getProductSearch(inputSearch.name))
        navigate(`/productSearch/:${inputSearch.name}`);
    }

    return (
        <header>
            <div className="header__content">
                <div className="container">
                    <div className="row">
                        <div className="header__logoHinglands col-2" style={{ textAlign: 'center' }}>
                            <br />
                            <Link to='/'>
                                <img src="/img/pixlr-bg-result.png" alt="logo Highlands coffee" style={{ width: '50%', marginTop: '-10px' }} />
                            </Link>
                            <p style={{ color: '#ffffff', fontSize: 18, fontWeight: 'bold', whiteSpace: 'nowrap' }}>Highlands
                                Coffee <span style={{ color: '#f1bc7a' }} />
                            </p>
                        </div>
                        <div className="navbarHingland col-10">
                            <div className="header__seach d-flex">
                                <form className='form__seach' onSubmit={(e) => handleSearch(e)}>
                                    <input type="text" name='name' value={inputSearch.name} onChange={(e) => handleChange(e)} placeholder="Từ khoá" />
                                    <a className="icon_seach" onClick={(e) => handleSearch(e)} href="#">
                                        <AiOutlineSearch />
                                    </a>
                                </form>
                                <div className="header__User d-flex">
                                    <div className='btn_login'>
                                        {/* type = Admin hiển thị icon tới admin */}
                                        {userLogin.user?.type === "Admin" ? <Link to="/login"><BiUser style={{ fontSize: '23px', marginTop: '-3px' }} /></Link> : null}
                                        {/* type = Admin hiển thị span Admin, còn không thì span Login */}
                                        {userLogin.user?.type === "Admin" ? <span className='text_login'>Admin</span> : <span className='text_login'>Login</span>}
                                    </div>
                                    {/* userLogin.message === "Đăng nhập thành công" ? Logout : Login */}
                                    {userLogin?.message === "Đăng nhập thành công" ?
                                        <div className='logout'>
                                            <button className='btn_logout btn p-0' style={{ marginTop: '-7px', }} onClick={() => handleLogOut()}><MdLogout /></button>
                                            <span className='text_logout'>Logout</span>
                                        </div>
                                        : <div className='logout'>
                                            <Link to="/login"><BiUser style={{ fontSize: '23px' }} /></Link>
                                            <span className='text_logout'>Login</span>
                                        </div>
                                    }

                                    <Link className='header__User__cart' to='/cart'><BsCartPlusFill /></Link>
                                    <span className='number_cart'>{productCart?.length}</span>
                                </div>
                            </div>
                            <div className="header__menu" id="navbarNav">
                                <ul className="d-flex">
                                    <li>
                                        <Link to='locationCoffee'>QUÁN CÀ PHÊ</Link>
                                    </li>
                                    <li>
                                        <a href="#">THỰC ĐƠN</a>
                                        <div className="overlay_Nav">
                                            <div className="container">
                                                <div className="header__thucDon row">
                                                    {categorys.map((category, index) => {
                                                        return (
                                                            <div key={index} className="header__item col">
                                                                <Link to={`/category/${category.id}`}>{category.category_name}</Link>
                                                                <ul>
                                                                    {productList.filter(product => product.category_id == category.id).map((product, index) =>
                                                                        <li key={index}>
                                                                            {product.product_name === 'Thực đơn giao hàng' ?
                                                                                <Link to={`/menu`}>{product.product_name}</Link>
                                                                                : <Link to={`/product/${product.id}`}>{product.product_name}</Link>
                                                                            }
                                                                        </li>
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="header__item itemImg col">
                                                        <div>
                                                            <a href="#">Phin Sữa Đá Đậm Đà Chất Phin! 29.000đ</a>
                                                            <img src="/img/z1.jpg" alt="a" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/">TIN TỨC</Link>
                                        <div className="overlay_Nav">
                                            <div className="container">
                                                <div className="header__thucDon row">
                                                    <div className="col-9 d-flex">
                                                        <div className="header__item ">
                                                            <a href="#">Tin Tức & Sự Kiện</a>
                                                        </div>
                                                        <div className="header__item ">
                                                            <a href="#">Tin Khuyến Mãi</a>
                                                        </div>
                                                    </div>
                                                    <div className="header__item itemImg itemImgTinTuc col-3">
                                                        <div>
                                                            <a href="#">Tự Hào Sinh Ra Từ Đất Việt, 1999!</a>
                                                            <img src="/img/Thumbnail.jpg" alt='a' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/">CỘNG ĐỒNG</Link>
                                        <div className="overlay_Nav">
                                            <div className="container">
                                                <div className="header__thucDon row">
                                                    <div className="col-9 d-flex">
                                                        <div className="header__item ">
                                                            <a href="#">Giá trị văn hoá việt</a>
                                                            <ul>
                                                                <li><a href="#">Đương Đại Tranh Đông Hồ</a></li>
                                                            </ul>
                                                        </div>
                                                        <div className="header__item ">
                                                            <a href="#">Cộng đồng</a>
                                                            <ul>
                                                                <li><a href="#">Lớp Học Cho Em</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="header__item itemImg itemImgTinTuc col-3">
                                                        <div>
                                                            <a href="#">Tranh Đương Đại Hoá Đông Hồ</a>
                                                            <img src="/img/KV_Highlands_CSR_1.jpg" alt='a' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/">VỀ CHÚNG TÔI</Link>
                                        <div className="overlay_Nav">
                                            <div className="container">
                                                <div className="header__thucDon row">
                                                    <div className="col-9 d-flex">
                                                        <div className="header__item ">
                                                            <a href="#">Khởi Nguồn</a>
                                                        </div>
                                                        <div className="header__item ">
                                                            <a href="#">Dịch Vụ hàng tháng</a>
                                                        </div>
                                                        <div className="header__item ">
                                                            <a href="#">nghề nghiệp</a>
                                                        </div>
                                                    </div>
                                                    <div className="header__item itemImg itemImgTinTuc col-3">
                                                        <div>
                                                            <a href="#">Thương Hiệu Bắt Nguồn Từ Cà Phê Việt!</a>
                                                            <img src="/img/ABOUT-ORIGIN.png" alt='a' />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >

    );
}

export default Header;