import React from 'react';
import PropTypes from 'prop-types';
import Banner from '../Layout/ClientLayout/Banner/Banner';
import Introduce from './Introduce/Introduce';
import ProductList from './ProductList/ProductList';
import Testimonials from './Testimonials/Testimonials';

Home.propTypes = {

};

function Home(props) {
    return (
        <>
            <Banner />
            <Introduce />
            <ProductList />
            <Testimonials />
        </>
    );
}

export default Home;