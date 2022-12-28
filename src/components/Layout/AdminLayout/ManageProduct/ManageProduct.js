import React, { useState, useEffect, useCallback } from 'react';
import TableBasic from '../../../comon/TableBasic/TableBasic';
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import { addProductApi, deleteProductApi, getManageProductSearch, getProductListApi, updateProductAction } from '../../../../redux/action/ProductAction';
import { getCategoryListAction } from '../../../../redux/action/CategoryAction';
import { Button, Form, Input } from 'antd';
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate';
import { addSizeAction } from '../../../../redux/action/SizeActione';

const { TextArea } = Input;

const headerList = [
    { fields: 'id', },
    { fields: 'product_name', },
    { fields: 'product_img', },
    { fields: 'price', },
    { fields: 'description', width: '50%' },
    { fields: '', btnCreate: true, btnEdit: true, btnDelete: true, width: '170px' },
]

function ManageProduct(props) {
    // lấy dữ liệu từ reducer
    let { productList } = useSelector(state => state.ProductReducer)
    let { categorys } = useSelector(state => state.CategoryReducer)
    const [inputSearch, setInputSearch] = useState({
        keyword: ''
    });

    const dispatch = useDispatch()
    // render product khi load trang
    useEffect(() => {
        dispatch(getProductListApi())
    }, [])

    //option category
    useEffect(() => {
        const action = getCategoryListAction();
        dispatch(action)
    }, [productList])

    // toger modal
    const [show, setShow] = useState(false);

    // render img
    const [imgUrl, setImgUrl] = useState(null)

    //button submit
    let [btnSubmit, setBtnSubmit] = useState({
        title: '',
        handle: ''
    })

    // value form
    let [valueInput, setValueInput] = useState({
        product_name: '',
        product_img: null,
        price: '',
        description: '',
        category_id: ''
    })

    const [displayData, setDisplayData] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(5)
    const [paginationInfo, setPaginationInfo] = useState({ currentItem: 1, pageCount: 0, itemOffset: 0 })

    useEffect(() => {
        const endOffset = paginationInfo.itemOffset + itemsPerPage;
        setDisplayData(productList.slice(paginationInfo.itemOffset, endOffset))
        setPaginationInfo((prev) => ({
            ...prev,
            pageCount: Math.ceil(productList.length / itemsPerPage)
        }))
    }, [productList, itemsPerPage, paginationInfo.itemOffset])

    const handleClick = (e) => {
        const newOffset = (e.selected * itemsPerPage) % productList.length;
        setPaginationInfo((prev) => (
            {
                ...prev,
                itemOffset: newOffset
            }
        ));
    }



    const handleChange = (e) => {
        let copyValueInput = { ...valueInput }
        const { value, name } = e.target;
        setValueInput({
            ...copyValueInput,
            [name]: value
        })
    }

    //change file image
    const handleChangFile = (e) => {
        let file = e.target.files[0];
        const { name } = e.target
        // tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgUrl(e.target.result)
        }
        // 
        setValueInput({
            ...valueInput,
            [name]: file
        })
    }

    const handleAddProduct = () => {
        let formData = new FormData()
        for (let key in valueInput) {
            if (key !== 'product_img') {
                formData.append(key, valueInput[key])
            }
            else {
                formData.append(key, valueInput.product_img, valueInput.product_img.name)
            }
        }
        dispatch(addProductApi(formData))
        setShow(false); // đóng modal
        setValueInput(''); // reset img
    }

    const handleToggleModalEdit = (news) => {
        setBtnSubmit({
            title: 'Save',
            handle: handleUpdateProduct
        })
        setShow(true)
        setValueInput(news)
        setImgUrl(news.news_img)
    }

    const handleUpdateProduct = () => {
        console.log('valueInput', valueInput);
        dispatch(updateProductAction(valueInput.id, valueInput))
        // for (let key in valueInput) {
        //     if (key !== 'product_img') {
        //         formData.append(key, valueInput[key])
        //     }
        //     else {
        //         formData.append(key, valueInput.product_img, valueInput.product_img.name)
        //     }
        // }
        // dispatch(updateProductAction(valueInput.id, formData))
        setShow(false); // đóng modal
        setImgUrl(null); // reset img
    }

    const deleteProduct = (product) => {
        Swal.fire({
            title: 'Bạn có muốn xoá?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProductApi(product.id))
                Swal.fire('Success', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
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
        e.preventDefault();
        dispatch(getManageProductSearch(inputSearch.keyword))
    }

    return (
        <div id="layoutSidenav_content" >
            <div className="container-fluid px-4">
                <h1 className="text-info mt-4">Quản lý sản phẩm</h1>
                <>
                    <Button className='mb-2 btn-primary' onClick={() => {
                        setBtnSubmit({
                            title: "Add product",
                            handle: handleAddProduct
                        })
                        setShow(true)
                    }}>
                        Thêm
                    </Button>
                    <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        backdrop="static"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm Sản Phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '0 0 0 50px' }}>
                            <Form
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                encType="multipart/form-data"
                            >
                                <Form.Item label="Tên sản phẩm" className='mt-4'>
                                    <Input name="product_name" value={valueInput.product_name} onChange={(e) => handleChange(e)} />
                                </Form.Item>
                                <Form.Item label="Hình ảnh" valuePropName="fileList">
                                    <input
                                        type="file"
                                        name="product_img"
                                        onChange={(e) => handleChangFile(e)}
                                    />
                                    <br />
                                    {imgUrl && <div>
                                        <img style={{ width: '200px' }} src={imgUrl} />
                                        <br />
                                        <button className='btn btn-danger' style={{ padding: '3px 5px' }} onClick={() => setImgUrl(null)}>Remove</button>
                                    </div>}
                                </Form.Item>

                                <Form.Item label="Giá" className='mt-4'>
                                    <Input name='price' value={valueInput.price} onChange={(e) => handleChange(e)} />
                                </Form.Item>
                                <Form.Item label="Mô tả">
                                    <TextArea rows={4} name='description' value={valueInput.description} onChange={(e) => handleChange(e)} />
                                </Form.Item>
                                <Form.Item label="Loại sản phẩm">
                                    <select className='form-select' name='category_id' value={valueInput.category_id} onChange={(e) => handleChange(e)}>
                                        <option value="">Open this select menu</option>
                                        {categorys.map(category => (
                                            <option key={category.id} value={category.id}>{category.category_name}</option>
                                        ))}
                                    </select>
                                </Form.Item>
                                <div style={{ marginBottom: '20px', textAlign: 'right', marginRight: '25%' }}>
                                    <button type="button" className='btn btn-dark' style={{ padding: '6px 10px' }} onClick={() => {
                                        setShow(false)
                                        setValueInput('')
                                    }}>
                                        Close
                                    </button>
                                    <button onClick={btnSubmit.title === 'Add product' ? handleAddProduct : handleUpdateProduct} type='submit' style={{ marginLeft: '10px', padding: '5px 12px' }} className='btn btn-primary'>Save</button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
                <div className="row d-flex justify-content-between mb-2">
                    <div className="col-md-3">
                        <form onSubmit={(e) => handleSearch(e)}>
                            <div className="input-group rounded">
                                <input name='keyword' value={inputSearch.keyword} onChange={(e) => handleChangeInputSearch(e)} type="search" className="form-control" placeholder="Search" />
                                <button onClick={(e) => handleSearch(e)} type="submit" className="input-group-text border-0">
                                    <i className="fas fa-search" /> Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card mb-4">
                    <TableBasic headerList={headerList} data={displayData} deleteRow={deleteProduct} toggleModal={handleToggleModalEdit} />
                    {/* <TableAnt headerList={headerList} dataProduct={productList} deleteRow={deleteProduct} handleUpdate={handleUpdate} /> */}
                </div>
                <div className='paginate d-flex justify-content-center'>
                    <ReactPaginate
                        {...paginationInfo}
                        onPageChange={handleClick}
                        nextLabel=">"
                        previousLabel="<"
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
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

export default ManageProduct;