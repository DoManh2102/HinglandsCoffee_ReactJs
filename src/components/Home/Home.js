import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Banner from '../Layout/ClientLayout/Banner/Banner';
import Introduce from './Introduce/Introduce';
import ProductList from './ProductList/ProductList';
import Testimonials from './Testimonials/Testimonials';
import { Helmet } from "react-helmet";
import LoadingSkeleton from './LoadingSkeleton/LoadingSkeleton';
import { getProductListApi } from '../../redux/action/ProductAction';
import { useSelector, useDispatch } from 'react-redux'


function Home(props) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const action = getProductListApi(handleToggleLoading);
        dispatch(action)
    }, [])

    const handleToggleLoading = (boollen) => {
        setIsLoading(boollen)
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Highlands Coffee</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            {isLoading ? <LoadingSkeleton /> :
                <>
                    <Banner />
                    <Introduce />
                    <ProductList />
                    <Testimonials />
                </>}
        </>
    );
}

export default Home;