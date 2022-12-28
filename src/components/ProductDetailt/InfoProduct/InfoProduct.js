import React, { useEffect } from 'react';
import './InfoProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSizeAction } from '../../../redux/action/SizeActione';

function InfoProduct({ productDetailt }) {
    const dispatch = useDispatch()
    const handleCreateOrder = () => {
        dispatch({
            type: 'ADD_TO_CART',
            product: productDetailt
        })
    }

    return (
        <section className="wrapper">
            <div className="container" style={{ paddingTop: "100px" }}>
                <h2 className="wrapper__title" style={{ color: '#a33e12' }}>{productDetailt?.product_name}</h2>
                <div className="row">
                    <div className="wrapper__img col-4">
                        <img src={productDetailt?.product_img} alt={productDetailt?.product_name} style={{ width: '90%' }} />
                    </div>
                    <div className="wrapper__text col-8">
                        <p>{productDetailt?.description}</p>
                        <div className="wrapper__size">
                            <span>Size:</span>

                            <span>
                                <a className="active" href="#">S</a>
                                <a href="#">M</a>
                                <a href="#">L</a>
                            </span>
                        </div>
                        <div className="wrapper__star">
                            <span>
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                                <i className="fa-solid fa-star" />
                            </span>
                        </div>
                        <div className="wrapper__price">
                            <p>Giá: <span>{Intl.NumberFormat().format(productDetailt?.price) + ' VNĐ'}</span></p>
                        </div>
                        <button onClick={() => handleCreateOrder()}>Đặt mua ngay</button>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default InfoProduct;