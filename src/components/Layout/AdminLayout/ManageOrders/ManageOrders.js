import React, { useState } from 'react';
import TableBasic from '../../../comon/TableBasic/TableBasic';
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal } from 'antd';

const headerList = [
    // { fields: 'id', },
    { fields: 'user_name', },
    { fields: 'address', },
    { fields: 'phone', },
    { fields: 'total', width: '10%' },
    { fields: 'Cart_Item', btnDetail: true, width: '10%' },
    { fields: '', btnDelete: true, width: '100px' },
]

const headerCartItem = [
    { fields: 'id', },
    { fields: 'product_name', },
    { fields: 'product_img', },
    { fields: 'quantity', },
    { fields: 'price', },
]

function ManageOrders(props) {
    const { cart } = useSelector(state => state.CartReducer)
    const { cartSearch } = useSelector(state => state.CartReducer)
    const [itemCart, setItemCart] = useState({})
    const [isModalOpen, setIsModalOpen] = useState(false, []);
    const dispatch = useDispatch()
    const [inputSearch, setInputSearch] = useState({
        keyword: ''
    })

    const handleToggleModal = (bollen) => {
        setIsModalOpen(bollen)
    }

    const deleteOrder = (order) => {
        console.log(order);
        if (window.confirm('Bạn có muốn xoá?')) {
            dispatch({
                type: 'DELETE_ORDER',
                order: order
            })
        }
    }

    const handleChangeInputSearch = (e) => {
        let copyInputSearch = { ...inputSearch }
        const { value, name } = e.target;
        setInputSearch({
            ...copyInputSearch,
            [name]: value
        })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch({
            type: 'CART_ITEM_SEARCH',
            name: inputSearch.keyword
        });
    }

    return (
        <div id="layoutSidenav_content" >
            <div style={{ display: 'none' }}>
                <Button type="primary" onClick={() => setIsModalOpen(true)}>
                    Open Modal
                </Button>
                <Modal style={{ width: '700px' }} title="Shopping Item" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => (setIsModalOpen(false))}>
                    <TableBasic headerList={headerCartItem} data={itemCart} />
                </Modal>
            </div>
            <div className="container-fluid px-4">
                <h1 className="text-info mt-4">Quản lý sản phẩm</h1>
                <div className="row d-flex justify-content-between mb-2">
                    <div className="col-md-3">
                        <form onSubmit={(e) => handleSearch(e)}>
                            <div className="input-group rounded">
                                <input type="search" name="keyword" value={inputSearch.keyword} onChange={(e) => handleChangeInputSearch(e)} className="form-control rounded" placeholder="Search" />
                                <button onClick={(e) => handleSearch(e)} type="submit" className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search" /> Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card mb-4">
                    <TableBasic headerList={headerList} data={cartSearch.length > 0 ? cartSearch : cart} toggleModal={handleToggleModal} deleteRow={deleteOrder} cartItem={setItemCart} />
                </div>
                <div className='paginate d-flex justify-content-center'>
                </div>
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright © Your Website 2021</div>
                        </div>
                    </div>
                </footer>
            </div >
        </div >
    );
}

export default ManageOrders;