import React from 'react';
import PropTypes from 'prop-types';
import InfoCategory from './InfoCategory/InfoCategory';
import SimilarProduct from '../ProductDetailt/SimilarProduct/SimilarProduct';
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from "react-helmet";



function CategoryDetailt(props) {
    let { productList } = useSelector(state => state.ProductReducer)
    let { categorys } = useSelector(state => state.CategoryReducer)
    let { categoryDetailt } = useSelector(state => state.CategoryReducer)

    const categoryFound = categorys.filter(category => category.id === categoryDetailt.id)
    const productByCategory = productList.filter(product => product.category_id === categoryDetailt.id)

    return (
        <section className="category pt-3" style={{ backgroundColor: "#1b1b1b" }}>
            {categoryDetailt.category_name ? <Helmet>
                <title>{categoryDetailt.category_name} | Highlands Coffee</title>
                <meta name="description" content={categoryDetailt.description} />
            </Helmet> : ''}
            <InfoCategory categoryDetailt={categoryDetailt} productType={productByCategory} />
            <SimilarProduct productType={productByCategory} categoryFound={categoryFound} />
        </section>
    );
}

export default CategoryDetailt;