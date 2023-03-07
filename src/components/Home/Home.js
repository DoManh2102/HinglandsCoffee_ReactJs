import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../Layout/ClientLayout/Banner/Banner';
import Introduce from './Introduce/Introduce';
import ProductList from './ProductList/ProductList';
import Testimonials from './Testimonials/Testimonials';
import { Helmet } from "react-helmet";

Home.propTypes = {

};

function Home(props) {

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Highlands Coffee</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Banner />
            <Introduce />
            <ProductList />
            <Testimonials />
        </>
    );
}

export default Home;