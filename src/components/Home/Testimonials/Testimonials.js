import React from 'react';
import './Testimonials.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import './Testimonials.css'

function Testimonials(props) {
    return (
        <>
            <section className="testimonials section" style={{ marginTop: '-100px' }}>
                <h1 className="title">Testimonials</h1>
                <OwlCarousel items={1}
                    className="owl-theme listTestimonials"
                    loop={true}
                    nav={false}
                    autoplay={true}
                    autoplayTimeout={5000}>
                    <div className="item">
                        <div className="testimonials__avatar">
                            <img src="./img/avata2.jpg" alt="avata khách hàng 1" style={{ width: '100%' }} />
                        </div>
                        <div className="testimonials__body">
                            <div className="testimonials__comment">
                                <p>Ristretto cortado, acerbic filter, at coffee frappuccino beans filter. Mug medium rich
                                    foam froth siphon cinnamon aromatic lungo bar. Single origin, java, robusta, that, at,
                                    foam, java, arabica id single shot mug robusta. In organic, filter, aroma robusta lungo
                                    sit instant. Extraction cinnamon, lungo, cortado, robust medium cultivar, caramelization
                                    robust percolator coffee medium.</p>
                            </div>
                            <div className="testimonials__name">
                                <h4>Jeb Build</h4>
                            </div>
                            <div className="testimonials__position">Director</div>
                            <div className="testimonials__contact text-center">
                                <a href="#" /><BsFacebook />
                                <a href="#" /><BsInstagram />
                                <a href="#" /><BsTwitter />
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="testimonials__avatar">
                            <img src="./img/avata3.jpg" alt="avata khách hàng 1" style={{ width: '100%' }} />
                        </div>
                        <div className="testimonials__body">
                            <div className="testimonials__comment">
                                <p>Ristretto cortado, acerbic filter, at coffee frappuccino beans filter. Mug medium rich
                                    foam froth siphon cinnamon aromatic lungo bar. Single origin, java, robusta, that, at,
                                    foam, java, arabica id single shot mug robusta. In organic, filter, aroma robusta lungo
                                    sit instant. Extraction cinnamon, lungo, cortado, robust medium cultivar, caramelization
                                    robust percolator coffee medium.</p>
                            </div>
                            <div className="testimonials__name">
                                <h4>Jeb Build</h4>
                            </div>
                            <div className="testimonials__position">Director</div>
                            <div className="testimonials__contact text-center">
                                <a href="#" /><BsFacebook />
                                <a href="#" /><BsInstagram />
                                <a href="#" /><BsTwitter />
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="testimonials__avatar">
                            <img src="./img/avata1.jpg" alt="avata khách hàng 1" style={{ width: '100%' }} />
                        </div>
                        <div className="testimonials__body">
                            <div className="testimonials__comment">
                                <p>Ristretto cortado, acerbic filter, at coffee frappuccino beans filter. Mug medium rich
                                    foam froth siphon cinnamon aromatic lungo bar. Single origin, java, robusta, that, at,
                                    foam, java, arabica id single shot mug robusta. In organic, filter, aroma robusta lungo
                                    sit instant. Extraction cinnamon, lungo, cortado, robust medium cultivar, caramelization
                                    robust percolator coffee medium.</p>
                            </div>
                            <div className="testimonials__name">
                                <h4>Jeb Build</h4>
                            </div>
                            <div className="testimonials__position">Director</div>
                            <div className="testimonials__contact text-center">
                                <a href="#" /><BsFacebook />
                                <a href="#" /><BsInstagram />
                                <a href="#" /><BsTwitter />
                            </div>
                        </div>
                    </div>
                </OwlCarousel>
            </section>
            <hr style={{ background: '#504f4f', margin: '0' }} />
        </>
    );
}

export default Testimonials;