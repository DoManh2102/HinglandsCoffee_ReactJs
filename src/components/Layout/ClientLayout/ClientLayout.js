import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import Footer from './Footer/Footer';


function ClientLayout({ children }) {
    return (
        <>
            <Header />
            <div className='content'>{children}</div>
            <Footer />
        </>
    );
}

export default ClientLayout;