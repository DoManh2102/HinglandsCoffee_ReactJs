import React, { useState, useEffect } from 'react';
import TableBasic from '../../../comon/TableBasic/TableBasic';
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik'
import { getUserClientAction } from '../../../../redux/action/UserAction';


const headerList = [
    { fields: 'id', },
    { fields: 'email', },
    { fields: 'user_name', },
    { fields: 'type' },
    { fields: '', btnCreate: true, btnEdit: true, btnDelete: true, width: '170px' },
]

const { TextArea } = Input;

function ManageClient(props) {
    // lấy dữ liệu từ reducer
    const { userClient } = useSelector(state => state.UserReducer)


    // toger modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // dispatch
    const dispatch = useDispatch()

    useEffect(() => {
        const action = getUserClientAction();
        dispatch(action)
    }, [])

    //formik data
    const formik = useFormik({
        initialValues: {
            product_name: '',
            product_img: 'abccccc',
            price: '',
            description: '',
            category_id: ''
        },

        onSubmit: (values) => {
            // dispatch(addProductApi(values))
            setShow(false); // đóng modal
        }
    })

    //change file image
    const handleChangFile = (e) => {
        let file = e.fileList[0];
        // đem file gửi vào formik
        // formik.setFieldValue('product_img', file)
    }



    return (
        <div id="layoutSidenav_content" >
            <div className="container-fluid px-4">
                <h1 className="text-info mt-4">Quản lý User Admin</h1>
                <>
                    {/* <Button className='mb-2 btn-primary' onClick={handleShow}>
                        Thêm
                    </Button> */}
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"

                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Thêm Sản Phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ padding: '0 0 0 50px' }}>
                            <Form onSubmitCapture={formik.handleSubmit}
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                            >
                                <Form.Item label="Tên sản phẩm" className='mt-4'>
                                    <Input name="product_name" onChange={formik.handleChange} />
                                </Form.Item>
                                <Form.Item label="Hình ảnh" valuePropName="fileList">

                                </Form.Item>
                                <Form.Item label="Giá" className='mt-4'>
                                    <Input name='price' onChange={formik.handleChange} />
                                </Form.Item>
                                <Form.Item label="Mô tả">
                                    <TextArea rows={4} name='description' onChange={formik.handleChange} />
                                </Form.Item>
                                <Form.Item label="Loại sản phẩm">
                                    <select className='form-select' name='category_id' onChange={formik.handleChange}>
                                        <option value="">Open this select menu</option>
                                        <option value="1">Cà Phê</option>
                                        <option value="2">Freeze</option>
                                        <option value="3">Trà</option>
                                        <option value="4">Khác</option>
                                    </select>
                                </Form.Item>
                                <div style={{ marginBottom: '20px', textAlign: 'right', marginRight: '25%' }}>
                                    <button className='btn btn-dark' style={{ padding: '6px 10px' }} onClick={handleClose}>
                                        Close
                                    </button>
                                    <button type='submit' style={{ marginLeft: '10px', padding: '5px 12px' }} className='btn btn-primary'>Save</button>
                                </div>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
                <div className="row d-flex justify-content-between mb-2">
                    <div className="col-md-3">
                        <form>
                            <div className="input-group rounded">
                                <input type="search" ng-model="timkiem" name="keyword" id="keyword" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                <button type="submit" className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search" /> Search
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card mb-4">
                    <TableBasic headerList={headerList} data={userClient} handleShow={handleShow} />
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

export default ManageClient;