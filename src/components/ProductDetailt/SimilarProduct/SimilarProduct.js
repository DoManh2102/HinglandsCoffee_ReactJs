import React from 'react';
import Container from 'react-bootstrap/Container';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import './SimilarProduct.css'


function SimilarProduct(props) {
    return (
        <div className='SimilarProduct pb-5'>
            <Container>
                {props.categoryFound && props.categoryFound.map((category, index) => {
                    return (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <h4 style={{ color: '#a33e12' }}>{category.category_name.toUpperCase()} - Sản phẩm HOT</h4>
                            <p style={{ color: '#fff' }}>{category.description}</p>
                        </div>
                    )
                })}
                <div className="d-flex">
                    {props.productType && props.productType.map((product, index) => {
                        return (
                            <div key={index} className="item">
                                <div className="category__img">
                                    <img src={product.product_img} style={{ width: '250px', margin: '0 15px' }} alt={product.product_name} />
                                </div>
                                <div className="category__title">
                                    <h3>{product.product_name}</h3>
                                    <p className="category__price">Giá: {product.price} VNĐ</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Container >
        </div >
    );
}



export default SimilarProduct;