import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './InfoCategory.css'


function InfoCategory({ categoryDetailt, productType }) {
    return (
        <div className="category__wrapper container" >
            <h2 style={{ color: '#a33e12' }}>{categoryDetailt.category_name}</h2>
            <div className="category__banner row">
                <div className="banner__content col-8">
                    <img src={categoryDetailt.category_img} style={{ maxWidth: '100%', height: 'auto' }} />
                    <p className="mt-3">{categoryDetailt.description}</p>
                    <button>Xem Sản Phẩm</button>
                </div>
                <div className="banner__sanpham col-4 d-flex">
                    {productType.slice(0, 1).map((product, index) => {
                        return (
                            <Fragment key={index}>
                                <img src={product.product_img} alt={product.product_name} style={{ width: '60%', height: '40%' }} />
                                <div className="mt-3">
                                    <h4>{product.product_name}</h4>
                                    <p className='modal__text'>{product.description}</p>
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
            </div>
        </div >

    );
}

export default InfoCategory;