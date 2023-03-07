import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfoProduct from './InfoProduct/InfoProduct';
import SimilarProduct from './SimilarProduct/SimilarProduct';
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from "react-helmet";


function ProductDetailt(props) {
    let { productList } = useSelector(state => state.ProductReducer)
    let { categorys } = useSelector(state => state.CategoryReducer)
    let { productDetailt } = useSelector(state => state.ProductReducer)
    // let { size } = useSelector(state => state.SizeReducer)
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(getAllSizeAction())
    // }, [])

    const productType = productList.filter(product => product.category_id === productDetailt.category_id)
    const categoryFound = categorys.filter(category => category.id === productDetailt.category_id)
    // const productSize = size.filter(item => item.product_id === productDetailt.id)
    return (
        <>
            {productDetailt.product_name ? <Helmet>
                <title>{productDetailt.product_name} | Highlands Coffee</title>
                <meta name="description" content={productDetailt.description} />
            </Helmet> : ''}

            <InfoProduct productDetailt={productDetailt} />
            <SimilarProduct productType={productType} categoryFound={categoryFound} />
        </>
    );
}

export default ProductDetailt;