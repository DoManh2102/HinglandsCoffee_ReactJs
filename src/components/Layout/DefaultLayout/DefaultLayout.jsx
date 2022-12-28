import React from 'react';
// import Header from '../ClientLayout/Header/Header';
// import styled from "styled-components";


function DefaultLayout({ children }) {
    return (
        <div>
            {/* <HeaderStyle> */}
            {/* <Header /> */}
            {/* </HeaderStyle> */}
            {children}
        </div>
    );
}

// const HeaderStyle = styled.header`
//     height: 20vh;
//     background-image: none;
// `;

export default DefaultLayout;