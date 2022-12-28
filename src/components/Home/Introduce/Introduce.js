import React from 'react';
import './Introduce.css'

function Introduce(props) {
    return (
        <section className="introduce section">
            <div className="container">
                <h1 className="title">Highlands Coffee</h1>
                <div className="introduce__content">
                    <div className="row">
                        <div className="introduce__item col-3">
                            <img src="./img/latte.svg" alt='a' />
                            <h3>100% Natural Coffee</h3>
                            <p>That, lungo as coffee viennese extraction beans Acerbic coffee medium arabica.</p>
                        </div>
                        <div className="introduce__item col-3">
                            <img src="./img/delivery.svg" alt='a' />
                            <h3>Fust &amp; Free Shipping</h3>
                            <p>That, lungo as coffee viennese extraction beans Acerbic coffee medium arabica.</p>
                        </div>
                        <div className="introduce__item col-3">
                            <img src="./img/save-mone.svg" alt='a' />
                            <h3>Money Cash Back</h3>
                            <p>That, lungo as coffee viennese extraction beans Acerbic coffee medium arabica.</p>
                        </div>
                        <div className="introduce__item col-3">
                            <img src="./img/distanc.svg" alt='a' />
                            <h3>Non-Contact Delivery</h3>
                            <p>That, lungo as coffee viennese extraction beans Acerbic coffee medium arabica.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Introduce;