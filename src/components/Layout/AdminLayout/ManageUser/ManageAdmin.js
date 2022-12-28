import React, { useState, useEffect } from 'react';
import TableBasic from '../../../comon/TableBasic/TableBasic';
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useFormik } from 'formik'
import { deleteAdminAction, getUserAdminAction } from '../../../../redux/action/UserAction';
import Swal from 'sweetalert2'


const headerList = [
    { fields: 'id', },
    { fields: 'email', },
    { fields: 'user_name', },
    { fields: 'type' },
    { fields: '', btnCreate: true, btnEdit: true, btnDelete: true, width: '170px' },
]

const { TextArea } = Input;

function ManageUser(props) {
    // lấy dữ liệu từ reducer
    const { userAdmin } = useSelector(state => state.UserReducer)

    // render img
    const [imgUrl, setImgUrl] = useState(null)

    // toger modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // dispatch
    const dispatch = useDispatch()

    useEffect(() => {
        const action = getUserAdminAction();
        dispatch(action)
    }, [])

    //formik data
    //formik data
    const formik = useFormik({
        initialValues: {
            product_name: '',
            product_img: {},
            price: '',
            description: '',
            category_id: ''
        },

        onSubmit: (values) => {
            let formData = new FormData()
            for (let key in values) {
                if (key !== 'product_img') {
                    formData.append(key, values[key])
                }
                else {
                    formData.append(key, values.product_img, values.product_img.name)
                }
            }
            // dispatch(addProductApi(formData))
            setShow(false); // đóng modal
            setImgUrl(null); // reset img
        }
    })

    //change file image
    const handleChangFile = (e) => {
        let file = e.target.files[0];

        // tạo đối tượng đọc file
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            setImgUrl(e.target.result)
        }
        // đem file gửi vào formik
        formik.setFieldValue('avata', file)
    }

    // button upload file image
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Bạn có muốn xoá?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteAdminAction(id))
                Swal.fire('Success', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
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
                    <TableBasic headerList={headerList} data={userAdmin} handleShow={handleShow} deleteRow={deleteUser} />
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

export default ManageUser;