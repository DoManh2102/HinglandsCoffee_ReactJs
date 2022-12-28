import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalBasic.css'
import { BsCartPlusFill } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { AiTwotoneHeart } from 'react-icons/ai';
import { AiOutlineCloseCircle } from 'react-icons/ai';


function ModalBasic({ toggleModal, handleToggleModal, producModal, handleCreateOrder }) {
    return (
        <Modal.Dialog style={{ display: toggleModal ? 'block' : 'none' }}>
            <Modal.Body>
                <button onClick={() => handleToggleModal(false)} className='btn btn_close'>
                    <AiOutlineCloseCircle />
                </button>
                <div className="row">
                    <div className="modal__left col-6">
                        <img src={producModal.product_img} alt={producModal.product_name} style={{ width: '100%' }} />
                    </div>
                    <div className="modal__right col-6">
                        <div className="modal__logo">
                            <img src="./img/pixlr-bg-result.png" alt="logo" style={{ height: '100%' }} />
                        </div>
                        <div className="modal__content">
                            <h3 className="modal__title">{producModal.product_name}</h3>
                            <p className="modal__text">{producModal.description}</p>
                            <div className="modal__star">
                                <AiFillStar />
                                <AiFillStar />
                                <AiFillStar />
                                <span>
                                    <AiFillStar />
                                    <AiFillStar />
                                </span>
                            </div>
                            <div className="modal__price d-flex">
                                {/* <span>{producModal.price}</span> */}
                                <p>{producModal.price}</p>
                            </div>
                            <div onClick={() => handleCreateOrder(producModal)} className="modal__btn d-flex">
                                <button type="submit">add to cart</button>
                                <div className="modal__cart">
                                    <BsCartPlusFill style={{ fontSize: '20px' }} />
                                </div>
                            </div>
                            <div className="modal__love">
                                <a href="#" style={{ textDecoration: 'none', fontSize: 16, color: '#fff' }}>
                                    <AiTwotoneHeart />
                                    <span style={{ marginLeft: '5px', display: "inline-block" }}>Add to wishlist</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal.Dialog >
    );
}

export default ModalBasic;