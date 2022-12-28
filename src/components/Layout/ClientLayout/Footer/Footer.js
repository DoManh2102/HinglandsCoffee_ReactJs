import React from 'react';
import './Footer.css'
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';


function Footer(props) {
    return (
        <footer className="section">
            <div className="container">
                <div className="footer__top">
                    <div className="row">
                        <div className="footer__page col">
                            <h3>PAGES</h3>
                            <ul className="p-0">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </div>
                        <div className="footer__page col">
                            <h3>Catalog</h3>
                            <ul className="p-0">
                                <li><a href="#">Coffee</a></li>
                                <li><a href="#">Machines</a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">Dishes</a></li>
                                <li><a href="#">Vending</a></li>
                                <li><a href="#">Tea</a></li>
                            </ul>
                        </div>
                        <div className="footer__page col">
                            <h3>Phone</h3>
                            <ul className="p-0">
                                <li><a href="tel: 0393451581">+84.393451581</a></li>
                                <li><a href="#">+84.982663694</a></li>
                            </ul>
                            <div className="testimonials__contact">
                                <a href="#" /><BsFacebook />
                                <a href="#" /><BsInstagram />
                                <a href="#" /><BsTwitter />
                            </div>
                        </div>
                        <div className="footer__page col">
                            <h3>Contact</h3>
                            <ul className="p-0">
                                <li><a href="#">Fifth Avenue 42</a></li>
                                <li><a href="#">New York 10018</a></li>
                                <li><a href="mailto: dovanmanh1333@gmail.com">dovanmanh1333@gmail.com</a></li>
                            </ul>
                        </div>
                        <div className="footer__page instagram col">
                            <h3>Instagramm</h3>
                            <ul className="p-0 row">
                                <li className="col-4">
                                    <a href="#"><img src="/img/imgfooter1.jpg" alt='' style={{ width: '100%' }} /></a>
                                </li>
                                <li className="col-4">
                                    <a href="#"><img src="/img/imgfooter2.jpg" alt='' style={{ width: '100%' }} /></a>
                                </li>
                                <li className="col-4">
                                    <a href="#"><img src="/img/imgfooter3.jpg" alt='' style={{ width: '100%' }} /></a>
                                </li>
                                <li className="col-4">
                                    <a href="#"><img src="/img/imgfooter4.jpg" alt='' style={{ width: '100%' }} /></a>
                                </li>
                                <li className="col-4">
                                    <a href="#"><img src="/img/imgfooter5.jpg" alt='' style={{ width: '100%' }} /></a>
                                </li>
                                <li className="col-4">
                                    <a href="#"><img src="/img/imgfooter6.jpg" alt='' style={{ width: '100%' }} /></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="footer__bottom">
                    <p>© 2022 Mocca Theme. All right reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;