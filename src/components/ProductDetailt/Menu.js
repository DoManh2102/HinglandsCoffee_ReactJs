import React from 'react';
import { useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";


function Menu(props) {
    let { productList } = useSelector(state => state.ProductReducer)
    let navigate = useNavigate();

    const productDetailt = productList.find(product => product.product_name === 'Thực đơn giao hàng')

    return (
        <section className="wrapper">
            <div className="container" style={{ padding: "50px 0", }}>
                <h2 className="wrapper__title" style={{ color: '#a33e12' }}>Thực đơn giao hàng</h2>
                <div className="row">
                    <div className="wrapper__img col-8">
                        <img src={productDetailt?.product_img} alt={productDetailt?.product_name} style={{ width: '100%' }} />
                    </div>
                    <div className="wrapper__text col-4">
                        <p style={{ width: '90%' }}>{productDetailt?.description}</p>
                        <button onClick={() => navigate(-1)}>Đặt mua ngay</button>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Menu;