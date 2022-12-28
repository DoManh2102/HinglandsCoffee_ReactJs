import React, { useState } from 'react';
import './Cart.css'
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { addOrderAction } from '../../redux/action/CartAction';
import { InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


function Cart(props) {
    const { productCart } = useSelector(state => state.CartReducer)
    const { userLogin } = useSelector(state => state.UserLoginReducer)
    const [valueInput, setValueInput] = useState({
        address: '',
        phone: ''
    })
    // console.log(productCart);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleChange = (e) => {
        let copyValueInput = { ...valueInput }
        const { value, name } = e.target;
        setValueInput({
            ...copyValueInput,
            [name]: value
        })
    }

    const onChange = (quantity, product) => {
        dispatch({
            type: 'EDIT_CART_ITEM',
            product: { product, quantity }
        })
        if (quantity < 1) {   // nếu số lượng < 1 thì xoá sản phẩm khỏi giỏ hàng
            if (window.confirm("Bạn có muốn xoá sản phẩm khỏi giỏ hàng?") == true) {
                dispatch({
                    type: 'DELETE_CART_ITEM',
                    product: product
                })
            }
        }
    };

    const handleCheckout = async () => {
        if (productCart.length > 0 && valueInput.address !== '' && valueInput.phone !== '') {
            navigate("/login");
            if (userLogin.message === 'Đăng nhập thành công') {
                dispatch({
                    type: 'CHECK_OUT_PAYLOAD',
                    cart: {
                        user_name: userLogin.user.user_name,
                        address: valueInput.address,
                        phone: valueInput.phone,
                        productCart: productCart,
                        total: totalCart
                    }
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Sản phẩm đã được thêm vào giỏ hàng',
                    timer: 1500
                })
            }
        }
        else {
            alert('Vui lòng nhập thông tin nhận hàng')
        }

    }

    // tính tổng tiền
    let totalCart = null;
    productCart.map(product => totalCart += parseFloat(product.price * product.quantity))

    return (
        // nguồn: https://mdbootstrap.com/docs/standard/extended/shopping-carts/#section-basic-example
        <section className="h-100 h-custom" style={{ backgroundColor: '#757575', padd: '-80px', color: '#fff' }} >
            <div className="container py-5">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card" style={{ backgroundColor: '#4f4f4f' }}>
                            <div className="card-body p-4">
                                <div className="row">
                                    <div className="col-lg-7">
                                        <h5 className="mb-3" >
                                            <button className='btn btn-dark pb-2' onClick={() => navigate(-1)}  >
                                                <IoMdArrowRoundBack style={{ marginTop: '-1px' }} />
                                                <span className='ml-1'>Continue shopping</span>
                                            </button>
                                        </h5>
                                        <hr />
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <p className="mb-1">Shopping cart</p>
                                                <p className="mb-0">Bạn có {productCart.length} mặt hàng trong giỏ</p>
                                            </div>
                                            <div>
                                                <p className="mr-5">Price</p>
                                            </div>
                                        </div>
                                        {productCart?.map((product, index) => (
                                            <div key={index} className="card mb-3">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="d-flex flex-row align-items-center" style={{ width: '60%' }}>
                                                            <div>
                                                                <img src={product.product_img} alt="Shopping item" style={{ width: 65 }} />
                                                            </div>
                                                            <div className="ms-3">
                                                                <h5>{product.product_name} </h5>
                                                                <p className="small mb-0">Size: {product.size}</p>
                                                            </div>
                                                        </div>
                                                        <InputNumber disabled={false} style={{ height: '35px', marginTop: '17px' }} min={0} defaultValue={product.quantity} onChange={(quantity) => onChange(quantity, product)} />
                                                        <div className="d-flex flex-row align-items-center">
                                                            <div style={{ width: 80 }}>
                                                                {/* Intl.NumberFormat().format(tdData) */}
                                                                <h5 className="mb-0">{Intl.NumberFormat().format(product.price * product.quantity)}</h5>
                                                            </div>
                                                            <a href="#!" style={{ color: '#cecece' }}><i className="fas fa-trash-alt" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                    <div className="col-lg-5">
                                        <div className="card bg-primary text-white rounded-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-between align-items-center mb-4">
                                                    <h5 className="mb-0">Card details</h5>
                                                    <img src={userLogin.user?.avata} style={{ width: '50px', height: '60px', objectFit: 'cover' }} className="img-fluid rounded-3" alt={userLogin?.user_name} />
                                                </div>
                                                <form className="mt-4">
                                                    <div className="form-outline form-white mb-4">
                                                        <label className="form-label" htmlFor="typeName">Địa chỉ nhận hàng</label>
                                                        <input name="address" value={valueInput.address} onChange={(e) => handleChange(e)} type="text" id="typeName" className="form-control form-control-lg" size={14} placeholder="Address..." />
                                                    </div>
                                                    <div className="form-outline form-white mb-4">
                                                        <label className="form-label" htmlFor="typeText">Số điện thoại</label>
                                                        <input name="phone" value={valueInput.phone} onChange={(e) => handleChange(e)} type="text" id="typeText" className="form-control form-control-lg" size={14} placeholder="Phone..." />
                                                    </div>
                                                </form>
                                                <hr className="my-4" />
                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Tạm tính</p>
                                                    <p className="mb-2">
                                                        {Intl.NumberFormat().format(totalCart)}
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <p className="mb-2">Vận chuyển</p>
                                                    <p className="mb-2">{productCart.length >= 1 && Intl.NumberFormat().format(20000)}</p>
                                                </div>
                                                <div className="d-flex justify-content-between mb-4">
                                                    <p className="mb-2">Tổng tiền</p>
                                                    <p className="mb-2">{productCart.length >= 1 && Intl.NumberFormat().format(totalCart + 20000)}</p>
                                                </div>
                                                {/* onClick={() => handleCheckout()} */}
                                                <div onClick={() => handleCheckout()} to='/login' type="button" className="btn btn-info btn-block btn-lg">
                                                    <div className="d-flex justify-content-between">
                                                        <span >Thanh toán<i className="fas fa-long-arrow-alt-right ms-2" /></span>
                                                        <span>{productCart.length >= 1 && Intl.NumberFormat().format(totalCart + 20000)} vnđ</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Cart;