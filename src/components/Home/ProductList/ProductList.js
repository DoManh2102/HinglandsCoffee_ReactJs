import React, { useState, useEffect } from 'react';
import ModalBasic from '../../comon/ModalBasic/ModalBasic';
import './ProductList.css'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux'


function ProductList(props) {
    let { productList } = useSelector(state => state.ProductReducer)
    let { categorys } = useSelector(state => state.CategoryReducer)
    const [productByCategory, setProductByCategory] = useState(productList)
    const [toggleModal, setToggleModal] = useState(false)
    const [producModal, setProductModal] = useState({})

    const handleToggleModal = (bollen, product) => {
        setToggleModal(bollen, product)
    }

    useEffect(() => {
        setProductByCategory(productList)
    }, [productList])

    const handleProductByCategory = (categoryId) => {
        const productByCategory = productList.filter(product => product.category_id === categoryId)
        setProductByCategory(productByCategory)
    }

    const dispatch = useDispatch()
    const handleCreateOrder = (product) => {
        dispatch({
            type: 'ADD_TO_CART',
            product: product
        })
    }

    return (
        <section className="products">
            <ModalBasic toggleModal={toggleModal} handleToggleModal={handleToggleModal} producModal={producModal} handleCreateOrder={handleCreateOrder} />
            <div className="container">
                <div className="products__title row d-flex">
                    <h3 className="col-7">Products</h3>
                    <div className="products__category col">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button onClick={() => setProductByCategory(productList)} className="nav-link active">All</button>
                                {categorys.map((category, index) =>
                                    <button key={index} onClick={() => handleProductByCategory(category.id)} className="nav-link">{category.category_name}</button>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="products__card tab-content" id="Highland_category">
                    <div className="tab-pane fade show active">
                        <div className="products__content">
                            <div className="row">
                                {productByCategory.slice(0, 8).map((product, index) => {
                                    return (
                                        <div key={index} className="products__item col-3">
                                            <div className="card">
                                                <div className="card__img">
                                                    <img src={product.product_img} className="card-img-top" alt={product.product_name} style={{ height: "250px" }} />
                                                    <div className="card__ovelay">
                                                        <div className="overlay__item">
                                                            <a href="#">
                                                                <AiOutlineHeart />
                                                            </a>
                                                            <a onClick={() => {
                                                                return (
                                                                    setProductModal(product),
                                                                    handleToggleModal(true, product)
                                                                )
                                                            }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                                <AiOutlineExpand />
                                                            </a>
                                                            <a onClick={() => handleCreateOrder(product)} href="#">
                                                                <BsCartPlus />
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="card__discount">
                                                        <span>-17%</span>
                                                    </div>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{product.product_name}</h5>
                                                    <div className="card__star">
                                                        <p>
                                                            <i className="fa-solid fa-star" />
                                                            <i className="fa-solid fa-star" />
                                                            <i className="fa-solid fa-star" />
                                                            <i className="fa-solid fa-star" />
                                                            <span>
                                                                <i className="fa-solid fa-star" />
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="card__price">
                                                        <p>{product.price + 13000}</p>
                                                        <span>{product.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    {/* ------ */}
                    <div className="tab-pane fade" id="coffee" role="tabpanel" aria-labelledby="nav-profile-tab">
                        coffe
                    </div>
                </div>
                {/* ------ */}
                <div className="tab-pane fade" id="freeze" role="tabpanel" aria-labelledby="nav-contact-tab">freeze</div>
                <div className="tab-pane fade" id="tra" role="tabpanel" aria-labelledby="nav-contact-tab">trà</div>
                <div className="tab-pane fade" id="khac" role="tabpanel" aria-labelledby="nav-contact-tab">khác</div>
            </div>
        </section >
    );
}

export default ProductList;